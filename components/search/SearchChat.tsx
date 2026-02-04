"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isStatusUpdate?: boolean;  // New: for workflow status messages
  clarification?: {
    missing_fields: string[];
    suggestions?: string[];
  };
  workflowStatus?: {
    current_step: string;
    step_progress: number;
    step_message: string;
  };
}

interface SearchChatProps {
  onSearch: (prompt: string, deepResearch: boolean) => Promise<void>;
  onClarificationResponse: (response: string) => void;
  isSearching: boolean;
  clarificationData?: {
    missing_fields: string[];
    clarification_prompt: string;
  } | null;
  workflowStatus?: {
    current_step: string;
    step_progress: number;
    step_message: string;
  } | null;
}

export default function SearchChat({
  onSearch,
  onClarificationResponse,
  isSearching,
  clarificationData,
  workflowStatus,
}: SearchChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Tell me who you're looking to hire. For example:\n\n\"I need a senior Python developer in Nigeria with 5+ years experience\"\n\nor\n\n\"Find me a marketing manager for our fintech startup in Kenya\"",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [deepResearch, setDeepResearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle clarification data from parent
  useEffect(() => {
    if (clarificationData) {
      const clarificationMessage: Message = {
        id: `clarify-${Date.now()}`,
        role: "assistant",
        content: clarificationData.clarification_prompt || "I need a bit more info to find the best matches:",
        timestamp: new Date(),
        clarification: {
          missing_fields: clarificationData.missing_fields,
          suggestions: getMissingSuggestions(clarificationData.missing_fields),
        },
      };
      setMessages((prev) => [...prev, clarificationMessage]);
    }
  }, [clarificationData]);

  // Handle workflow status updates from parent
  useEffect(() => {
    if (workflowStatus && workflowStatus.current_step !== "idle" && workflowStatus.current_step !== "complete") {
      const statusMessage: Message = {
        id: `status-${Date.now()}`,
        role: "assistant",
        content: workflowStatus.step_message,
        timestamp: new Date(),
        isStatusUpdate: true,
        workflowStatus: {
          current_step: workflowStatus.current_step,
          step_progress: workflowStatus.step_progress,
          step_message: workflowStatus.step_message,
        },
      };
      
      setMessages((prev) => {
        // Remove previous status messages to avoid duplicates
        const filtered = prev.filter(msg => !msg.isStatusUpdate);
        return [...filtered, statusMessage];
      });
    }
  }, [workflowStatus]);

  const getMissingSuggestions = (fields: string[]): string[] => {
    const suggestions: string[] = [];
    if (fields.includes("location")) {
      suggestions.push("Where should they be located? (e.g., Nigeria, Kenya, remote)");
    }
    if (fields.includes("job_title")) {
      suggestions.push("What role are you hiring for? (e.g., software engineer, product manager)");
    }
    if (fields.includes("experience")) {
      suggestions.push("How much experience do they need? (e.g., 3+ years, senior level)");
    }
    return suggestions;
  };

  const handleSend = async () => {
    if (!input.trim() || isSearching) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Check if this is a response to clarification
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.clarification) {
      onClarificationResponse(currentInput);
    } else {
      // Add typing indicator
      const typingMessage: Message = {
        id: "typing",
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, typingMessage]);

      // Trigger search
      await onSearch(currentInput, deepResearch);

      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.id !== "typing"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">AI Search</h3>
              <p className="text-xs text-slate-500">Describe who you need</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="deep-research" className="text-xs text-slate-600">
              Deep Research
            </Label>
            <Switch
              id="deep-research"
              checked={deepResearch}
              onCheckedChange={setDeepResearch}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-orange-100"
                  : "bg-gradient-to-br from-orange-500 to-teal-500"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-orange-600" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-orange-500 text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-800 rounded-bl-sm"
              }`}
            >
              {message.isTyping ? (
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Searching...</span>
                </div>
              ) : message.isStatusUpdate ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-sm text-blue-600 font-medium">{message.content}</span>
                  {message.workflowStatus && (
                    <div className="ml-auto text-xs text-slate-400">
                      {Math.round(message.workflowStatus.step_progress * 100)}%
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Clarification suggestions */}
                  {message.clarification && (
                    <div className="mt-3 space-y-2">
                      {message.clarification.missing_fields.length > 0 && (
                        <div className="text-xs opacity-80">
                          Missing: {message.clarification.missing_fields.join(", ")}
                        </div>
                      )}
                      {message.clarification.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.clarification.suggestions.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickSuggestion(s)}
                              className="text-xs bg-white/80 text-slate-700 px-2 py-1 rounded-lg hover:bg-white transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions for new users */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-slate-500 mb-2">Try these:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Senior Python developer in Lagos",
              "Marketing manager, Kenya, 5+ years",
              "React engineer, remote, fintech experience",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe who you're looking for..."
            className="resize-none min-h-[44px] max-h-[120px] bg-white border-slate-200 focus:border-orange-300 focus:ring-orange-200"
            rows={1}
            disabled={isSearching}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isSearching}
            className="bg-orange-500 hover:bg-orange-600 h-[44px] px-4"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
