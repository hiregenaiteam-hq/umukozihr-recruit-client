import { NextRequest, NextResponse } from "next/server";
import baseUrl from "@/lib/config";

// Longer timeout for live search mode which uses real-time scraping
const TIMEOUT_MS = {
  database: 30000,  // 30s for database
  live: 120000,     // 2min for live scraping
  hybrid: 90000,    // 1.5min for hybrid
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const searchMode = body.search_mode || "database";
    const timeoutMs = TIMEOUT_MS[searchMode as keyof typeof TIMEOUT_MS] || TIMEOUT_MS.database;

    // Check if we should use hardcoded response (for testing/development)
    // const useHardcodedResponse =
    //   process.env.USE_HARDCODED_RESPONSE === "true" ||
    //   body.use_hardcoded_response === true;

    // if (useHardcodedResponse) {
    //   console.log("Using hardcoded response for search:", body);

    //   // Simulate a small delay to make it feel more realistic
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   return NextResponse.json(responseSamples);
    // }

    // Original API code - keep your existing implementation
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

    const response = await fetch(
      `${baseUrl}/api/v1/search/search`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    );

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
    console.log("Search API success, results:", data?.results?.length || 0);
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
