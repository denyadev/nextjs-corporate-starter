import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Perform the i18n routing first
  const response = i18nRouter(request, i18nConfig);

  // Extract the URL pathname
  const { pathname } = request.nextUrl;

  // Check if the pathname matches the pattern /[slug]
  const slugPattern = /^\/([^\/]+)$/;
  if (slugPattern.test(pathname)) {
    // Redirect to /[slug]/agenda
    const slug = pathname.match(slugPattern)[1];
    return NextResponse.redirect(new URL(`/${slug}/agenda`, request.url));
  }

  // Return the i18n response if no redirection is needed
  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
