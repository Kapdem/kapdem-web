import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://16.171.56.33:3000";

// Anlık (as-you-type) öneri proxy'si -> backend /posts/search/suggest
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const lang = searchParams.get("lang") || "tr";
    const limit = searchParams.get("limit") || "8";

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ query: query || "", suggestions: [] });
    }

    const cookieStorage = await cookies();
    const authCookie = cookieStorage.get("Authentication");
    const languageCookie = cookieStorage.get("NEXT_LOCALE");

    const backendUrl = `${BACKEND_URL}/posts/search/suggest?q=${encodeURIComponent(
      query
    )}&lang=${lang}&limit=${encodeURIComponent(limit)}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (authCookie) headers["Authorization"] = `Bearer ${authCookie.value}`;
    if (languageCookie) headers["Accept-Language"] = languageCookie.value;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Backend suggest error:", errorData);
      return NextResponse.json(
        { query: query || "", suggestions: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Suggest proxy error:", error);
    return NextResponse.json(
      { query: "", suggestions: [] },
      { status: 500 }
    );
  }
}
