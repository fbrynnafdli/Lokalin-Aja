"use client";

import React from "react";
import Image from "next/image";
import { 
  MagnifyingGlass, 
  Coffee, 
  Laptop, 
  Money, 
  Clock, 
  BowlFood, 
  SketchLogo 
} from "@phosphor-icons/react";

const Hero: React.FC<{ searchHeight?: number }> = ({ searchHeight = 60 }) => {
  return (

    <section className="w-full bg-white pt-8 pb-8 px-6 md:pl-[80px] md:pr-[80px]">
      
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:justify-between">
        
        <div className="flex-1 w-full min-w-0 md:mt-2">
          
          {/* Headline */}
          <h1 className="md:text-[36px] font-semibold text-gray-900 leading-tight mb-4 md:whitespace-nowrap">
            Jelajahi Sudut Kota Lewat Cerita Kita.
          </h1>

          {/* Subheadline */}
          <p className="text-gray-900 text-[24px] mb-8 leading-relaxed">
            Temukan rekomendasi tempat asik dari pengalaman nyata,{" "}
            <span className="text-[#00BFA5] font-bold">bukan cuma katanya.</span>
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[12px] mb-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MagnifyingGlass size={24} weight="bold" />
            </div>
            <input 
              type="text" 
              placeholder="Mau cari tempat nugas, ngopi, atau makan murah?" 
              style={{ height: `${searchHeight}px` }}
              className="w-full pl-12 pr-32 rounded-[12px] border border-gray-100 focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all placeholder:text-[16px] placeholder:text-gray-400 text-[16px] text-gray-700"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00BFA5] hover:bg-[#009688] text-white px-8 rounded-[8px] font-semibold transition-colors"
              style={{ height: `${Math.max(searchHeight - 12, 36)}px` }}
            >
              Cari
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Ngops", icon: <Coffee size={22} weight="fill" /> },
              { label: "Spot Nugas", icon: <Laptop size={22} weight="fill" /> },
              { label: "Harga Mahasiswa", icon: <Money size={22} weight="fill" /> },
              { label: "Buka 24 Jam", icon: <Clock size={22} weight="fill" /> },
              { label: "Kuliner Berat", icon: <BowlFood size={22} weight="fill" /> },
              { label: "Hidden Gem", icon: <SketchLogo size={22} weight="fill" /> },
            ].map((tag, index) => (
              <button 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-[#E0F7F4] text-[#00897B] rounded-full text-sm font-medium hover:bg-[#B2DFDB] transition-colors"
              >
                {tag.icon}
                {tag.label}
              </button>
            ))}
          </div>

        </div>

        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
          <div className="relative w-full h-auto md:w-[432px] md:h-[309px]">
             <Image 
              src="/images/hero-image.png" 
              alt="Ilustrasi Jelajah Kota"
              width={432}
              height={309}
              className="w-full h-auto object-contain object-right"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;