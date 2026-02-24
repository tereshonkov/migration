import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const supportedLocales = new Set(['uk', 'ru', 'en']);
const i18nMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // ========== ЧАСТЬ 1: i18n ==========
  const i18nResponse = i18nMiddleware(request);
  
  // ========== ЧАСТЬ 2: Аутентификация ==========
  // Используем getToken вместо auth() - работает в Edge Runtime
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  
  const isLoggedIn = !!token;
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  
  // Проверка локали (общая логика)
  const maybeLocale = segments[0];
  const hasLocalePrefix = supportedLocales.has(maybeLocale);
  const locale = hasLocalePrefix ? maybeLocale : null;
  const offset = hasLocalePrefix ? 1 : 0;
  const section = segments[offset];
  const id = segments[offset + 1];
  
  // 1. ЗАЩИТА АДМИНКИ (Строго /admin)
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Если залогинен — пропускаем в админку, i18n тут не нужен
    return NextResponse.next();
  }
  
  // 2. ИСКЛЮЧЕНИЕ ДЛЯ ЛОГИНА
  if (pathname === '/login') {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }
  
  // 3. Legacy product -> service redirect
  if (section === 'product' && id) {
    const targetPath = locale && locale !== 'uk'
      ? `/${locale}/service/${id}`
      : `/service/${id}`;
    const targetUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(targetUrl, 301);
  }
  
  // 4. Legacy blog -> homepage redirect
  if (section === 'blog') {
    const targetPath = locale && locale !== 'uk'
      ? `/${locale}`
      : `/`;
    const targetUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(targetUrl, 301);
  }
  
  // ========== ЧАСТЬ 5: Возвращаем результат ==========
  // Если ничего не сработало, возвращаем i18n ответ
  return i18nResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};