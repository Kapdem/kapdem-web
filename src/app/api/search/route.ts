import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://16.171.56.33:3000";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const lang = searchParams.get("lang") || "tr";
    const sort = searchParams.get("sort") || "relevance";
    const category = searchParams.get("category");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        totalCount: 0,
        posts: [],
        authors: [],
        teamMembers: [],
        query: query || "",
      });
    }

    // Cookie'leri al
    const cookieStorage = await cookies();
    const authCookie = cookieStorage.get("Authentication");
    const languageCookie = cookieStorage.get("NEXT_LOCALE");

    // Backend'e isteği ilet
    let backendUrl = `${BACKEND_URL}/posts/global-search?q=${encodeURIComponent(
      query
    )}&lang=${lang}&sort=${sort}`;

    if (category) {
      backendUrl += `&category=${encodeURIComponent(category)}`;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Auth cookie varsa ekle
    if (authCookie) {
      headers["Authorization"] = `Bearer ${authCookie.value}`;
    }

    // Language cookie varsa ekle
    if (languageCookie) {
      headers["Accept-Language"] = languageCookie.value;
    }

    const response = await fetch(backendUrl, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Backend search error:", errorData);
      return NextResponse.json(
        {
          totalCount: 0,
          posts: [],
          authors: [],
          teamMembers: [],
          query: query || "",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Search proxy error:", error);
    return NextResponse.json(
      {
        totalCount: 0,
        posts: [],
        authors: [],
        teamMembers: [],
        query: "",
      },
      { status: 500 }
    );
  }
}
