import { findRolesForPath } from '@/lib';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { intlMiddleware } from '.';

export const authenticationMiddleware = async (req: NextRequestWithAuth) => {
  const pathName = req.nextUrl.pathname;

  const [, locale] = pathName.split('/');
  console.log(locale, pathName);
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const isAuthPage = pathName.startsWith(`/${locale}/login`) || pathName.startsWith(`${locale}/register`);
  const roles = findRolesForPath(pathName);
  console.log(roles);

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    return NextResponse.next();
  }

  if (!roles) return NextResponse.redirect(new URL('/not-found', req.url));

  // route with no require role ~ public
  if (roles.length === 0) return intlMiddleware(req);

  // no public, require authenticated
  if (!token) {
    let from = pathName;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    if (from !== `/${locale}` || from !== '/') {
      return NextResponse.redirect(new URL(`/${locale}/login?from=${encodeURIComponent(from)}`, req.url));
    } else return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (!roles.includes(token.role)) return NextResponse.redirect(new URL('/not-found', req.url));

  return intlMiddleware(req);
};
