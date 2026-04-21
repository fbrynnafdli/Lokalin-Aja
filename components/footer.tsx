"use client";

import React from "react";
import Link from "next/link";
import { InstagramLogo, TwitterLogo, FacebookLogo, XLogo } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }
  
  return (
    // CONTAINER UTAMA
    // bg-[#1E293B] (Dark Slate) sesuai inspect code
    // Text color silver (#BDBDBD)
    <footer className="w-full bg-[#1E293B] text-[#BDBDBD] font-sans">
      
      {/* WRAPPER CONTENT */}
      {/* px-6 md:px-10 lg:px-[80px] -> Padding konsisten sama section lain biar rapi */}
      {/* py-12 -> Jarak atas bawah yang lega */}
      <div className="w-full py-12 px-6 md:px-10 lg:px-[80px]">
        
        {/* FLEXBOX LAYOUT */}
        {/* Mobile: Tumpuk ke bawah (flex-col) */}
        {/* Laptop/Desktop: Sejajar ke samping (lg:flex-row) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-0">
          
          {/* === BAGIAN 1: BRAND (Kiri) === */}
          <div className="flex flex-col gap-4 max-w-[302px]">
             {/* Logo */}
             <h2 className="text-[#00BFA5] font-bold text-[24px] leading-[150%]">
               Lokalin Aja
             </h2>
             {/* Deskripsi */}
             <p className="text-[14px] leading-[150%] font-medium text-[#BDBDBD]">
               Dengan Lokalin Aja, temukan tempat asik lewat cerita jujur komunitas, bukan hanya sekadar angka rating.
             </p>
          </div>

          {/* === BAGIAN 2: NAVIGASI (Tengah) === */}
          {/* Gap dinamis: Laptop kecil gap-6, Layar gede gap-10 */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-[40px] text-[16px] font-semibold text-[#BDBDBD]">
            <Link href="#" className="hover:text-[#00BFA5] transition-colors">Beranda</Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors">Promo</Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors">Ngops</Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors">Tentang Kami</Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors">Kontak</Link>
          </div>

          {/* === BAGIAN 3: SOSMED (Kanan) === */}
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#00BFA5] transition-colors hover:scale-110 duration-200">
               <InstagramLogo size={24} color="#BDBDBD" weight="bold" />
            </Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors hover:scale-110 duration-200">
               <XLogo size={24} color="#BDBDBD" weight="bold" />
            </Link>
            <Link href="#" className="hover:text-[#00BFA5] transition-colors hover:scale-110 duration-200">
               <FacebookLogo size={24} color="#BDBDBD" weight="bold" />
            </Link>
          </div>

        </div>

        {/* GARIS PEMBATAS (Opsional, pemanis di bawah) */}
        <div className="w-full h-[1px] bg-gray-700 mt-10 mb-6 opacity-30"></div>
        <div className="text-center text-xs text-gray-500">
          &copy; 2026 Lokalin Aja. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;