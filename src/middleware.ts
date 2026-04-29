import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const supportedLocales = new Set(["uk", "ru", "en"]);

const i18nMiddleware = createMiddleware(routing);

export default async function middleware(
  req: NextRequest,
): Promise<Response | NextResponse> {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  const maybeLocale = segments[0];
  const hasLocalePrefix = supportedLocales.has(maybeLocale);
  const locale = hasLocalePrefix ? maybeLocale : null;
  const offset = hasLocalePrefix ? 1 : 0;

  const section = segments[offset];
  const id = segments[offset + 1];

  // Legacy product -> service redirect
  if (section === "product" && id) {
    const targetPath =
      locale && locale !== "uk" ? `/${locale}/service/${id}` : `/service/${id}`;
    const targetUrl = new URL(targetPath, req.url);
    return NextResponse.redirect(targetUrl, 301);
  }

  // Legacy blog -> homepage redirect
  if (section === "blog") {
    const targetPath = locale && locale !== "uk" ? `/${locale}` : `/`;
    const targetUrl = new URL(targetPath, req.url);
    return NextResponse.redirect(targetUrl, 301);
  }

  return i18nMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*|signin).*)",
};
