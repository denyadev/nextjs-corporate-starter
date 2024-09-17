import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Perform the i18n routing first
  const response = i18nRouter(request, i18nConfig);

  // Extract the URL pathname
  const { pathname } = request.nextUrl;

  // Custom redirect for /yourname*
  if (pathname.startsWith("/yourname")) {
    return NextResponse.redirect("https://www.dotsvote.com/dots/demo");
  }

  // Check if the pathname matches the pattern /[slug] or /fr/[slug]
  const slugPattern = /^\/(fr\/)?([^\/]+)$/;
  const match = pathname.match(slugPattern);

  if (match) {
    // Redirect to /[slug]/agenda or /fr/[slug]/agenda
    const prefix = match[1] || "";
    const slug = match[2];
    return NextResponse.redirect(
      new URL(`/${prefix}${slug}/agenda`, request.url)
    );
  }

  // Return the i18n response if no redirection is needed
  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
