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
  // fix build dynamic error
  unstable_allowDynamic: [
    '/node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/regenerator/index.js',
    '/node_modules/.pnpm/next-auth@4.24.5_next@14.0.4_react-dom@18.2.0_react@18.2.0/node_modules/next-auth/react/index.js',
    '/src/lib/custom-fetch.ts',
    '/src/lib/index.ts',
    '/src/middlewares/intl.ts',
    '/src/middlewares/index.ts', // use a glob to allow anything in the function-bind 3rd party module
  ],
};
