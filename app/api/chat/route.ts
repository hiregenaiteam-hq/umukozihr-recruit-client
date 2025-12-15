import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, session_id, temperature, candidate_context } = body;

    // Get authorization header and cookies from the incoming request
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader,
    };

    // Add cookie header if present (required for session-based auth)
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }

    // Build query parameters - chat endpoint expects query params, not body
    const params = new URLSearchParams();
    params.append("message", message);
    if (session_id) params.append("session_id", session_id);
    if (temperature) params.append("temperature", temperature.toString());

    console.log("Making request to external API:", {
      url: `https://agent-architecture.onrender.com/api/v1/chat/chat?${params.toString()}`,
      headers,
      message,
      session_id,
      temperature,
    });

    const response = await fetch(
      `https://agent-architecture.onrender.com/api/v1/chat/chat?${params.toString()}`,
      {
        method: "POST",
        headers,
        // No body - chat endpoint uses query parameters only
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: `https://agent-architecture.onrender.com/api/v1/chat/chat?${params.toString()}`,
        headers: Object.fromEntries(response.headers.entries()),
      });
      return NextResponse.json(
        { error: `External API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
