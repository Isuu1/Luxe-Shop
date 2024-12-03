import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        //If user exists return it with all properties
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log("Sign In Callback user:", user);
      console.log("Sign In Callback account:", account, profile);
      console.log("Sign In Callback profile:", profile);
      //Find user in database
      const u = await prisma.user.findUnique({
        where: {
          email: user.user.email,
        },
      });

      if (!u) {
        await prisma.user.create({
          data: {
            email: user.user.email,
            name: user.user.name,
            image: user.user.image,
            password: "test",
            provider: user.account.provider,
          },
        });
      }
      return true;
    },
    session: async ({ token, session }) => {
      // console.log("Session Callback:", { token, session });
      const u = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        cacheStrategy: { ttl: 60 },
      });
      // console.log("Session Callback user in db:", u);
      return {
        ...session,
        user: {
          ...session.user,
          id: u.id,
          image: token.image,
        },
      };
    },
    jwt: ({ token, user, trigger, session }) => {
      console.log("JWT Callback:", { trigger, session });
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
          image: u.image,
        };
      }
      //When session update is triggered in action refresh session
      if (trigger === "update") {
        console.log("Trigger is update");
        return { ...token, ...session.user };
      }
      return token;
    },
  },
});
