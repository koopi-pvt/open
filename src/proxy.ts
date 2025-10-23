import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Handle root path redirection based on user's preferred language
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Redirect root path based on user's stored language preference
  if (pathname === '/') {
    // Check for stored language preference in cookie
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    let preferredLocale = 'en'; // default to English
    
    // If user has previously selected a language, use that
    if (localeCookie && locales.includes(localeCookie.value as any)) {
      preferredLocale = localeCookie.value;
    }
    
    // Create the redirect URL with the preferred locale
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}/`;
    return NextResponse.redirect(url);
  }
  
  // Continue with next-intl middleware for other paths
  return createMiddleware({
    locales,
    defaultLocale: 'en',
    localePrefix: 'always',
  })(request);
}

export const config = {
  matcher: ['/', '/(en|si)/:path*'],
};