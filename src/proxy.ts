import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Handle root path redirection based on user's preferred language
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Redirect root path based on user's preferred language
  if (pathname === '/') {
    // Get user's preferred language from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    let preferredLocale = 'en'; // default to English
    
    if (acceptLanguage) {
      // Parse the Accept-Language header to find the best matching locale
      const languages = acceptLanguage.split(',').map(lang => {
        const [locale] = lang.split(';');
        return locale.trim().toLowerCase();
      });
      
      // Check for Sinhala language codes (si, si-LK)
      if (languages.some(lang => lang.startsWith('si'))) {
        preferredLocale = 'si';
      }
      // Check for English language codes (en, en-US, en-GB, etc.)
      else if (languages.some(lang => lang.startsWith('en'))) {
        preferredLocale = 'en';
      }
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