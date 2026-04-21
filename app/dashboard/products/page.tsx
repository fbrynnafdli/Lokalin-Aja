import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Coffee, Cookie } from "@phosphor-icons/react/dist/ssr";
import AddProductButton from "@/components/addProductButton";
import ProductCard from "@/components/productCard"; // <--- 1. IMPORT KOMPONEN BARU

const prisma = new PrismaClient();

async function getProducts(userId: string) {
  const place = await prisma.place.findFirst({
    where: { ownerId: userId },
    include: { products: { orderBy: { name: 'asc' } } }, // Urutkan biar rapi
  });
  return place;
}

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const place = await getProducts(session.user.id);

  if (!place) {
    return <div className="p-10 text-center">Kamu belum punya tempat usaha.</div>;
  }

  const drinks = place.products.filter((p) => p.category === 'DRINK');
  const foods = place.products.filter((p) => p.category === 'FOOD');

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Layanan</h1>
          <p className="text-gray-500 text-sm">Atur menu makanan & minuman untuk pelangganmu</p>
        </div>
        <AddProductButton />
      </div>

      {/* SECTION MINUMAN */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Coffee size={24} weight="fill" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Minuman</h3>
        </div>
        {drinks.length === 0 ? (
            <p className="text-gray-400 italic">Belum ada menu minuman.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {drinks.map((item) => (
                    // 2. PAKAI KOMPONEN PRODUCTCARD (Wajib passing semua props)
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        )}
      </div>

      {/* SECTION MAKANAN */}
      <div>
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <Cookie size={24} weight="fill" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Makanan</h3>
        </div>
        {foods.length === 0 ? (
            <p className="text-gray-400 italic">Belum ada menu makanan.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {foods.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
}

// HAPUS function ProductCard lama yang ada di paling bawah file ini!
// Karena sekarang udah kita pindahin ke components/ProductCard.tsx