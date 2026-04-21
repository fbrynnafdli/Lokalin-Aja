import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PrismaClient } from "@prisma/client";
import MenuOrder from "@/components/menuOrder";
import PlaceImageGallery from "@/components/placeImageGallery"; 
import PlaceHeader from "@/components/placeHeader"; 

const prisma = new PrismaClient();

async function getPlaceDetail(id: string) {
  const place = await prisma.place.findUnique({
    where: { id },
    include: {
      products: true,
      reviews: { include: { user: true } },
    },
  });
  return place;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const place = await getPlaceDetail(id);

  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-2">Tempat tidak ditemukan 😭</h1>
            <p className="text-gray-500">Mungkin ID-nya salah atau tempat sudah tutup.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const foods = place.products.filter(
    (p) => p.category === "FOOD" && p.isAvailable
  );
  const drinks = place.products.filter(
    (p) => p.category === "DRINK" && p.isAvailable
  );

  return (
  <main className="bg-white min-h-screen font-sans">
    <Navbar />

    <div className="w-full px-6 md:px-[80px] py-8">
      
      {/* 1. Galeri Foto */}
      <PlaceImageGallery images={place.images} />

      {/* 2. Judul, Alamat & Info */}
      <placeHeader />
         name={place.name} 
         rating={4.5} 
         address={place.address}  
         category={place.category} 
      
      {/* 3. Menu & Order */}
      <div className="mt-6">
        <MenuOrder placeId={place.id} foods={foods} drinks={drinks} />
      </div>
    </div>
  </main>
);
}