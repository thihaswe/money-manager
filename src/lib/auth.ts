import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { userAgent } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    credentials({
      name: "credentials",
      //@ts-ignore
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!password) throw new Error("invalid credentilas");

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error("User not found");

        if (user.password !== password) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("sign IN", user);
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              avatar: user.image,
            },
          });
          user.id = String(newUser.id);
          // Convert number to string
        } else {
          user.id = String(existingUser.id); // Convert number to string
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        (token.image = user.avatar ? user.avatar : user.image),
          (token.id = String(user.id));
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.id);
        session.user.image = String(token.image);
      }
      return session;
    },
  },
});
