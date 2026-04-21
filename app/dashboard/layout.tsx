import Sidebar from "@/components/sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Cek User: Udah login belum?
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // Kalau belum login, tendang ke Home
  }

  // 2. Cek Role: Apakah dia MITRA? (Opsional: Nanti Admin juga bisa masuk sini kalau mau disatuin)
  // if (session.user.role !== "MITRA" && session.user.role !== "ADMIN") {
  //   redirect("/"); // Kalau Member biasa, gak boleh masuk dashboard
  // }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Sidebar Fixed di Kiri */}
      <Sidebar />

      {/* Konten Dashboard di Kanan */}
      <main className="ml-[280px] p-8 md:p-10">
        {children}
      </main>
    </div>
  );
}