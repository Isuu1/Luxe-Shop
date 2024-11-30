import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          userImage: user.userImage,
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
    session: ({ token, session }) => {
      session.user.id = token.id;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userImage: token.userImage,
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
          userImage: u.userImage,
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
