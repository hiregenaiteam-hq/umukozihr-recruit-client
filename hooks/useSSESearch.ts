"use client";

import { useState, useCallback, useRef } from "react";
import { ensureValidToken, clearAuthAndRedirect, normalizeError } from "@/lib/api";

interface WorkflowStatus {
  current_step: string;
  step_progress: number;
  step_message: string;
}

interface SSESearchResult {
  candidates: unknown[];
  total_results: number;
  warnings?: string[];
  search_id?: string;
}

interface ClarificationData {
  missing_fields: string[];
  clarification_prompt: string;
}

interface UseSSESearchOptions {
  onProgress?: (status: WorkflowStatus) => void;
  onClarification?: (data: ClarificationData) => void;
  onComplete?: (result: SSESearchResult) => void;
  onError?: (message: string) => void;
}

export function useSSESearch(options: UseSSESearchOptions = {}) {
  const [isSearching, setIsSearching] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(async (prompt: string, deepResearch: boolean = false) => {
    // Abort any existing search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsSearching(true);
    setWorkflowStatus({ current_step: "analyzing", step_progress: 0.1, step_message: "Starting search..." });

    try {
      const token = await ensureValidToken();
      
      if (!token) {
        options.onError?.("Your session has expired. Please sign in again.");
        clearAuthAndRedirect();
        return null;
      }

      const payload = {
        search_type: "prompt",
        prompt: prompt,
        use_deep_research: deepResearch,
      };

      console.log("[SSE Search] Starting:", payload);

      const response = await fetch("/api/search/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
        credentials: "include",
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      // Read SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log("[SSE Search] Stream ended");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete SSE events from buffer
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            if (!jsonStr) continue;
            
            try {
              const event = JSON.parse(jsonStr);
              console.log("[SSE Search] Event:", event.type);
              
              if (event.type === "progress") {
                const status = {
                  current_step: event.step,
                  step_progress: event.progress,
                  step_message: event.message
                };
                setWorkflowStatus(status);
                options.onProgress?.(status);
              } 
              else if (event.type === "clarification") {
                console.log("[SSE Search] Clarification needed");
                setIsSearching(false);
                setWorkflowStatus(null);
                options.onClarification?.(event.clarification);
                return { type: "clarification" as const, data: event.clarification };
              }
              else if (event.type === "complete") {
                console.log("[SSE Search] Complete:", event.candidates?.length, "candidates");
                setIsSearching(false);
                setWorkflowStatus(null);
                
                const result: SSESearchResult = {
                  candidates: event.candidates || [],
                  total_results: event.total_results || event.candidates?.length || 0,
                  warnings: event.warnings,
                  search_id: event.search_id,
                };
                options.onComplete?.(result);
                return { type: "complete" as const, data: result };
              }
              else if (event.type === "error") {
                console.error("[SSE Search] Error:", event.message);
                setIsSearching(false);
                setWorkflowStatus(null);
                options.onError?.(event.message);
                return { type: "error" as const, message: event.message };
              }
            } catch (parseErr) {
              console.warn("[SSE Search] Parse error:", jsonStr, parseErr);
            }
          }
        }
      }

      return null;

    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("[SSE Search] Aborted");
        return null;
      }
      
      const norm = normalizeError(err);
      const errorMsg = `${norm.title}: ${norm.description}`;
      setIsSearching(false);
      setWorkflowStatus(null);
      options.onError?.(errorMsg);
      return { type: "error" as const, message: errorMsg };
    }
  }, [options]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSearching(false);
    setWorkflowStatus(null);
  }, []);

  return {
    search,
    abort,
    isSearching,
    workflowStatus,
    setWorkflowStatus,
  };
}
