import { ROLE } from '@/constants';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        // send auth request
        console.log(payload);

        return {
          id: 'key',
          name: 'Peter',
          email: 'Peter@gmail.com',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmuaMi2wKWYcKVIIxM1S5mdLX-i7TveCDmVZjBy2qyKw&s',
          role: ROLE.ADMIN,
          accessToken: 'Token From Be',
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      if (!provider) return false;

      if (['google', 'github'].includes(provider)) {
        const email = user.email;

        if (!email) return false;

        // send BE to login/register with secret key => get role, access token

        user.role = ROLE.USER;
        user.accessToken = 'Token From Be';
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token && session.user) {
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
