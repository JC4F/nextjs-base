import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
    // signOut: "/singOut",
  },
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
      async authorize(credentials, _req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        console.log(payload);

        return {
          id: 'key',
          name: 'Peter',
          email: 'Peter@gmail.com',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmuaMi2wKWYcKVIIxM1S5mdLX-i7TveCDmVZjBy2qyKw&s',
        };

        // const res = await fetch('https://cloudcoders.azurewebsites.net/api/tokens', {
        //   method: 'POST',
        //   body: JSON.stringify(payload),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const user = await res.json();
        // if (!res.ok) {
        //   throw new Error(user.message);
        // }
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }

        // // Return null if user data could not be retrieved
        // return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      return baseUrl;
    },
    // async jwt({ token, user }) {
    //   // fetch api to be with token return from sign in to update jwt
    //   return {
    //     id: '',
    //     name: '',
    //     email: '',
    //     picture: '',
    //   };
    // },
    // async session({ token, session }) {
    //   if (token) {
    //     // @ts-ignore
    //     session.user.id = token.id;
    //     // @ts-ignore
    //     session.user.name = token.name;
    //     // @ts-ignore
    //     session.user.email = token.email;
    //     // @ts-ignore
    //     session.user.image = token.picture;
    //   }
    //   return session;
    // },
  },
};
