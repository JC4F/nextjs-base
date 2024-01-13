import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { authenticationMiddleware, i18nMiddleware } from './middlewares';

export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname;

    await authenticationMiddleware({ req, pathName });
    await i18nMiddleware({ req, pathName });

    return NextResponse.next();
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
