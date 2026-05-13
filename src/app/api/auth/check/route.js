import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("Authentication");

    if (authCookie && authCookie.value) {
      return NextResponse.json({
        authenticated: true,
        token: authCookie.value,
      });
    }

    return NextResponse.json({
      authenticated: false,
      token: null,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      {
        authenticated: false,
        token: null,
      },
      { status: 500 }
    );
  }
}
