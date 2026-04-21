"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react";

const AboutSection = () => {
  const features = [
    {
      title: "Rekomendasi Jujur:",
      desc: "Ulasan tempat bukan hanya berdasarkan rating bintang, tetapi dari cerita, suasana, dan kesan pengguna lain."
    },
    {
      title: "Solusi Mahasiswa:",
      desc: "Membantu mahasiswa & pendatang baru menemukan tempat kuliner, nongkrong, dan belajar yang pas."
    },
    {
      title: "Dukung Lokal:",
      desc: "Wadah promosi gratis bagi UMKM lokal untuk memperluas jangkauan tanpa biaya iklan."
    }
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-[60px]">
        <div className="relative w-full md:w-[45%] lg:w-[503px] flex-shrink-0 transition-all duration-300">
          <Image 
            src="/images/tentang.png" 
            alt="Tentang Kami"
            width={503}
            height={450}
            className="w-full h-auto object-cover drop-shadow-lg"
            priority 
          />
        </div>

        <div className="flex flex-col items-start gap-[10px] w-full flex-1">
          <div className="flex flex-col items-start gap-1 w-full">
            <span className="text-[#00BFA5] font-bold text-[20px] md:text-[24px] leading-[150%] uppercase tracking-wide">
              Tentang Kami
            </span>
            <h2 className="text-[#212121] text-[28px] lg:text-[32px] font-semibold leading-[150%]">
              Platform Rekomendasi Tempat & UMKM Berbasis Komunitas.
            </h2>
          </div>

          <div className="text-[#212121] text-[16px] lg:text-[20px] leading-[150%] font-normal text-left">
            <span className="font-bold text-[#00BFA5]">Lokalin Aja</span> adalah sebuah platform web kolaboratif yang menyediakan rekomendasi tempat dan layanan lokal berdasarkan pengalaman serta cerita singkat pengguna.
          </div>

          <div className="flex flex-col items-start gap-4 mt-2 w-full text-base md:text-lg text-[#212121]">
            
            <div className="text-[16px] lg:text-[18px] leading-[150%] mb-0">
              <span className="font-semibold">Fitur yang kamu dapatkan di </span>
              <span className="text-[#00BFA5] font-bold">Lokalin Aja</span>
            </div>

            <div className="flex flex-col gap-3 w-full mt-0">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 text-[#00BFA5]">
                      <CheckCircle size={24} weight="fill" />
                  </div>
                  <p className="font-medium leading-[150%] text-gray-700 text-[14px] lg:text-[16px]">
                    <span className="font-bold text-[#212121]">{item.title}</span> {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;