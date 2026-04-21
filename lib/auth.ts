import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // Kalau gagal login/belum login, lempar ke Home
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan Password wajib diisi");
        }

        // 1. Cari User di Database berdasarkan Email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 2. Kalau user gak ada
        if (!user) {
          throw new Error("Email tidak terdaftar");
        }

        // 3. Cek Password
        // Logic ini support 2 jenis password:
        // - Password Hash (Buat register user baru nanti)
        // - Password Polos (Buat data dummy/seed yang tadi kita bikin)
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password || "") 
          || credentials.password === user.password; 

        if (!isPasswordValid) {
          throw new Error("Password salah");
        }

        // 4. Sukses! Kembalikan data user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Penting: Kita bawa Role-nya (MEMBER/MITRA/ADMIN)
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    // Biar Role (Member/Mitra) kebawa ke sesi frontend
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};