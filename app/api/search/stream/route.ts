import { NextRequest } from "next/server";
import baseUrl from "@/lib/config";

/**
 * SSE Streaming proxy for search progress updates.
 * 
 * This endpoint proxies the backend SSE stream to the frontend,
 * enabling real-time progress updates during search workflow.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: authHeader,
    };

    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }

    console.log(`[SSE Proxy] Starting streaming search...`);

    // Make request to backend streaming endpoint
    const response = await fetch(`${baseUrl}/api/v1/search/search/prompt/stream`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[SSE Proxy] Backend error: ${response.status}`, errorText);
      return new Response(
        JSON.stringify({ error: `Backend error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if we got a stream
    if (!response.body) {
      return new Response(
        JSON.stringify({ error: "No response body from backend" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a transform stream to proxy SSE events
    const { readable, writable } = new TransformStream();
    
    // Pipe the backend response to our response
    const writer = writable.getWriter();
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // Process the stream in background
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log(`[SSE Proxy] Stream complete`);
            await writer.close();
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          console.log(`[SSE Proxy] Chunk: ${chunk.substring(0, 100)}...`);
          await writer.write(new TextEncoder().encode(chunk));
        }
      } catch (error) {
        console.error(`[SSE Proxy] Stream error:`, error);
        try {
          await writer.abort(error);
        } catch {
          // Ignore abort errors
        }
      }
    })();

    // Return the readable stream as SSE
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });

  } catch (error) {
    console.error(`[SSE Proxy] Error:`, error);
    return new Response(
      JSON.stringify({
        error: "Failed to start streaming search",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
