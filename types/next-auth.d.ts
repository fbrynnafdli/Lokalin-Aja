// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  // 1. Update tipe User biar punya Role
  interface User {
    role: string
  }

  // 2. Update tipe Session biar User di dalamnya punya Role juga
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
}