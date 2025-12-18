import { NextRequest, NextResponse } from "next/server";
import baseUrl from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const response = await fetch(
      `${baseUrl}/api/v1/search/search`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
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
        error: "Failed to search candidates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
