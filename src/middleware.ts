import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { i18nRouter } from "next-i18n-router";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    [
      "/favicon.ico",
      "/next.svg",
      "/vercel.svg",
      "/sitemap.xml",
      "/robots.txt",
    ].includes(pathname)
  ) {
    return NextResponse.next();
  }

  return i18nRouter(request, i18n);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|sitemap.xml|robots.txt).*)",
  ],
};
