import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import ProfileForm from "@/components/profileForm"; // Kita pisah form-nya biar rapi

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  // Ambil data tempat milik user
  const place = await prisma.place.findFirst({
    where: { ownerId: session?.user?.id },
  });

  if (!place) return <div>Kamu belum punya tempat usaha.</div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Profil Tempat</h1>
        <p className="text-gray-500 text-sm">Kelola informasi toko yang tampil di aplikasi</p>
      </div>

      {/* Kita oper data 'place' ke komponen Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <ProfileForm initialData={place} />
      </div>
    </div>
  );
}