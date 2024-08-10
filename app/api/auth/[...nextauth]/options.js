import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import { compare } from "bcrypt";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password:",
          type: "text",
          placeholder: "password",
        },
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

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
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
    signIn: "/signin",
  },
  callbacks: {
    session: ({ token, session }) => {
      session.user.id = token.id;
      // console.log("Session Callback: ", token, session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userImage: token.userImage,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
          userImage: u.userImage,
        };
      }
      // console.log("JWT Callback: ", token, "User: ", user);
      return token;
    },
  },
};
