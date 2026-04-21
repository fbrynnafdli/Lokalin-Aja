'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CaretDown, UserCircle, SignOut, SquaresFour } from "@phosphor-icons/react"; // Tambah SquaresFour
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <nav className="bg-white border-b backdrop-blur-md border-gray-100 w-full sticky top-0 z-50">
        
        <div className="flex items-center justify-between py-[25px] pl-[80px] pr-[80px]">

          {/* LOGO */}
          <Link href="/" className="text-[20px] font-bold text-[#00BFA5]">
            Lokalin Aja
          </Link>

          {/* MENU */}
          <div className="flex items-center gap-10 font-medium text-gray-600 text-[16px]">
            
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#00BFA5] transition-colors group">
              Cari apa? 
              <CaretDown size={16} weight="fill" className="group-hover:text-[#00BFA5] transition-colors" />
            </Link>
            
            <Link href="/about" className="hover:text-[#00BFA5] transition-colors">
              Tentang
            </Link>
            <Link href="/contact" className="hover:text-[#00BFA5] transition-colors">
              Kontak
            </Link>
            
            {/* === LOGIC LOGIN === */}
            {status === "authenticated" ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
                
                {/* Info User */}
                <div className="text-right hidden lg:block leading-tight">
                    <p className="text-sm font-bold text-gray-700">{session?.user?.name}</p>
                    <p className="text-[10px] uppercase font-bold text-[#00BFA5]">{session?.user?.role}</p>
                </div>

                {/* Avatar & Dropdown */}
                <div className="relative group">
                   <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00BFA5] transition-all">
                      {session?.user?.image ? (
                        <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle size={40} className="text-gray-400" weight="light" />
                      )}
                   </div>

                   {/* === DROPDOWN MENU === */}
                   <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 flex flex-col gap-1 transform origin-top-right">
                      
                      {/* 1. LINK KE DASHBOARD (Hanya muncul kalau login) */}
                      <Link 
                        href="/dashboard" 
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00BFA5] rounded-lg flex items-center gap-3 font-medium transition-colors"
                      >
                        <SquaresFour size={20} /> Dashboard Mitra
                      </Link>
                      
                      {/* Garis Pemisah */}
                      <div className="h-[1px] bg-gray-100 my-1"></div>

                      {/* 2. TOMBOL KELUAR */}
                      <button 
                        onClick={() => signOut()} 
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-3 font-medium transition-colors"
                      >
                        <SignOut size={20} /> Keluar
                      </button>

                   </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="ml-2 border border-[#00BFA5] text-[#00BFA5] px-8 py-2 rounded-md font-semibold hover:bg-[#00BFA5] hover:text-white transition-all duration-300"
              >
                Masuk
              </button>
            )}

          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;