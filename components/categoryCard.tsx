"use client";

import React from "react";
import Image from "next/image";

interface CategoryCardProps {
  name: string; // Contoh: "Ngops"
  image: string; // URL Gambar Background
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => {
  return (
    // CONTAINER UTAMA
    // h-[184px] rounded-xl overflow-hidden: Biar gambar gak keluar dari kotak
    // group: Biar kita bisa bikin animasi pas di-hover
    <div className="relative w-full h-[184px] rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300">
      
      {/* 1. BACKGROUND IMAGE */}
      {/* fill: Biar gambar ngisi penuh kotak otomatis */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />

      {/* 2. OVERLAY GELAP (Opsional) */}
      {/* Biar teks putihnya tetep kebaca walau gambarnya terang */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

      {/* 3. TEKS DI TENGAH */}
      {/* Flexbox centering menggantikan padding px-[122px] py-[78px] biar responsif */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-[18px] font-reguler font-sans tracking-wide [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
          {name}
        </h3>
      </div>

    </div>
  );
};

export default CategoryCard;