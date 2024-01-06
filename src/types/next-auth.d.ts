import { ROLE } from '@/constants';
import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    role: ROLE;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: ROLE;
    // accessToken: string;
  }
}
