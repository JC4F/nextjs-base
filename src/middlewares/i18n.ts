import { i18n } from '@/i18n-config';
import { getLocale } from '@/lib';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type I18nMiddlewareParams = { req: NextRequestWithAuth; pathName: string };

export const i18nMiddleware = async ({ req, pathName }: I18nMiddlewareParams) => {
  // Check if there is any supported locale in the pathname
  const pathNameIsMissingLocale = i18n.locales.every(
    (locale) => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathNameIsMissingLocale) {
    const locale = getLocale(req);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`, req.url));
  }
};
