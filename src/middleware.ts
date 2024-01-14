import { withAuth } from 'next-auth/middleware';
import { authenticationMiddleware } from './middlewares';

export default withAuth(
  async function middleware(req) {
    return await authenticationMiddleware(req);
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
