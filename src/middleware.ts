import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { ROLE, RouteWithRoles } from './constants';

const findRolesForPath = (inputPath: string): ROLE[] | null => {
  const route = RouteWithRoles.find((route) => {
    const regex = new RegExp(`^${route.path}$`);
    return regex.test(inputPath);
  });

  return route ? route.roles : null;
};

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const pathName = req.nextUrl.pathname;
    const isAuthPage = pathName.startsWith('/login') || pathName.startsWith('/register');
    const roles = findRolesForPath(pathName);

    if (isAuthPage) {
      if (token) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return null;
    }

    if (!roles) return NextResponse.redirect(new URL('/not-found', req.url));

    if (roles.length === 0) return null;

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

    return null;
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

// https://github.com/vercel/next.js/discussions/36308
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
