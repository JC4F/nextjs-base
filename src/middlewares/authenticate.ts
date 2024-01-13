import { findRolesForPath } from '@/lib';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type AuthenticationMiddlewareParams = { req: NextRequestWithAuth; pathName: string };

export const authenticationMiddleware = async ({ req, pathName }: AuthenticationMiddlewareParams) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const isAuthPage = pathName.startsWith('/login') || pathName.startsWith('/register');
  const roles = findRolesForPath(pathName);

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }

  if (!roles) return NextResponse.redirect(new URL('/not-found', req.url));

  // route with no require role ~ public
  if (roles.length === 0) return NextResponse.next();

  // no public, require authenticated
  if (!token) {
    let from = pathName;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    if (from !== '/') {
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    } else return NextResponse.redirect(new URL(`/login`, req.url));
  }

  if (!roles.includes(token.role)) return NextResponse.redirect(new URL('/not-found', req.url));
};
