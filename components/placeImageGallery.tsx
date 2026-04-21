"use client";

import React, { useState, useEffect } from "react";

const PlaceImageGallery = ({ images }: { images: string[] }) => {
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  useEffect(() => {
    const initialImages = [
      images[0] || "https://placehold.co/800x600?text=No+Image",
      images[1] || "https://placehold.co/400x300?text=No+Image+2",
      images[2] || "https://placehold.co/400x300?text=No+Image+3",
    ];
    setDisplayImages(initialImages);
  }, [images]);

  const handleImageClick = (clickedIndex: number) => {
    if (clickedIndex === 0) return;

    setDisplayImages((prevImages) => {
      const newImages = [...prevImages];
      const temp = newImages[0];
      newImages[0] = newImages[clickedIndex];
      newImages[clickedIndex] = temp;
      return newImages;
    });
  };

  if (displayImages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* KIRI: Gambar Utama (Penentu Tinggi) */}
      {/* aspect-[16/9] akan mengunci tinggi baris ini */}
      <div className="md:col-span-2 relative rounded-3xl overflow-hidden group aspect-[4/3] md:aspect-[16/9]">
        <img
          src={displayImages[0]}
          alt="Main Place"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* KANAN: 2 Gambar Kecil */}
      {/* Pakai Flex + h-full biar tingginya maksa sama kayak kiri */}
      <div className="hidden md:flex flex-col gap-4 h-full">
        
        {/* Gambar Kanan Atas */}
        {/* flex-1: Ambil sisa ruang yang ada (50%) */}
        {/* relative: Biar anak di dalemnya (img absolute) posisinya bener */}
        <div 
          className="relative flex-1 rounded-3xl overflow-hidden group w-full cursor-pointer"
          onClick={() => handleImageClick(1)}
        >
           {/* absolute inset-0: Paksa gambar menuhin kotak tanpa ngubah ukuran kotak */}
           <img
            src={displayImages[1]}
            alt="Side Top"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Gambar Kanan Bawah */}
        <div 
          className="relative flex-1 rounded-3xl overflow-hidden group w-full cursor-pointer"
          onClick={() => handleImageClick(2)}
        >
           <img
            src={displayImages[2]}
            alt="Side Bottom"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

      </div>

      {/* MOBILE ONLY (Tampilan HP) */}
      <div className="md:hidden grid grid-cols-2 gap-4">
         <div className="aspect-[4/3] rounded-3xl overflow-hidden" onClick={() => handleImageClick(1)}>
            <img src={displayImages[1]} className="w-full h-full object-cover"/>
         </div>
         <div className="aspect-[4/3] rounded-3xl overflow-hidden" onClick={() => handleImageClick(2)}>
            <img src={displayImages[2]} className="w-full h-full object-cover"/>
         </div>
      </div>

    </div>
  );
};

export default PlaceImageGallery;