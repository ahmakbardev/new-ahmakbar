import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Daftar slug project yang valid
const validSlugs = ["edutorium", "statprove"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname; // contoh: /id/projects/edutorium

  // Cek apakah masuk ke route /[locale]/projects/[slug]
  const match = pathname.match(/^\/(id|en)\/projects\/([^/]+)/);
  const slug = match?.[2]; // ambil [slug] dari URL

  if (slug && !validSlugs.includes(slug)) {
    // Redirect ke beranda kalau slug ngga valid
    const locale = match?.[1] || "id";
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Biarkan next-intl handle sisanya
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
