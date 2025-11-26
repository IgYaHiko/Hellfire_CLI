import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";

const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  basePath: "/api/auth",

  trustedOrigins: isProd
    ? [
        "https://hellfire-cli.vercel.app",
        "https://hellfire-cli.onrender.com" // backend must be allowed
      ]
    : ["http://localhost:3002", "http://localhost:3005"],

  cors: {
    origin: isProd
      ? ["https://hellfire-cli.vercel.app"]
      : ["http://localhost:3002"],
    credentials: true,
  },

  cookies: {
    secure: isProd,
    sameSite: "none",
  },

  plugins: [
    deviceAuthorization({
      verificationUri: "/device",
    }),
  ],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  logger: {
    level: "debug",
  },
});
