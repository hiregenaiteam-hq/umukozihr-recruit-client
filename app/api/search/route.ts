import { NextRequest, NextResponse } from "next/server";
import baseUrl from "@/lib/config";

// Longer timeout for live search mode which uses real-time scraping
// Deep research can take up to 240s for Exa Research API polling (increased for global searches)
const TIMEOUT_MS = {
  database: 30000,  // 30s for database
  live: 120000,     // 2min for live scraping
  hybrid: 90000,    // 1.5min for hybrid
  prompt: 120000,   // 2min for AI prompt search (standard)
  deep_research: 260000, // ~4.5min for deep research (increased from 3.5min for global coverage)
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const searchType = body.search_type || "manual"; // "prompt" or "manual"
    const searchMode = body.search_mode || "database";
    
    // Determine timeout based on search type and deep research
    const useDeepResearch = body.use_deep_research === true;
    let timeoutMs = TIMEOUT_MS.database;
    
    if (searchType === "prompt") {
      timeoutMs = useDeepResearch ? TIMEOUT_MS.deep_research : TIMEOUT_MS.prompt;
    } else {
      timeoutMs = TIMEOUT_MS[searchMode as keyof typeof TIMEOUT_MS] || TIMEOUT_MS.database;
    }

    // Get the authorization header and cookies from the incoming request
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

    // Use AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Determine which endpoint to use
    const endpoint = searchType === "prompt" 
      ? `${baseUrl}/api/v1/search/search/prompt`
      : `${baseUrl}/api/v1/search/search`;
    
    console.log(`Search request: type=${searchType}, mode=${searchMode}, endpoint=${endpoint}`);

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Search API error: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `External API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Search API success, type=${searchType}, results:`, 
      searchType === "prompt" ? data?.candidates?.length || 0 : data?.results?.length || 0);
    return NextResponse.json(data);
  } catch (error) {
    // Handle timeout specifically
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Search timed out. Please try a more specific search or use database mode." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      {
        error: "Failed to search candidates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
