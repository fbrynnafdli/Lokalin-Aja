"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { X, GoogleLogo, FacebookLogo } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Kalau modal gak open, jangan render apa-apa
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Panggil NextAuth buat login
      const res = await signIn("credentials", {
        redirect: false, // Jangan redirect otomatis biar kita handle sendiri
        email,
        password,
      });

      if (res?.error) {
        setError("Email atau password salah!");
      } else {
        // Login Sukses!
        onClose(); // Tutup modal
        router.refresh(); // Refresh halaman biar navbar berubah
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Overlay Hitam Transparan
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* Kotak Modal Putih */}
      <div className="bg-white w-full max-w-[400px] rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Tombol Close (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} weight="bold" />
        </button>

        {/* Judul */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#212121]">Masuk ke Lokalin Aja</h2>
          <p className="text-gray-500 text-sm mt-1">Temukan rekomendasi tempat asik</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent outline-none transition-all"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#00BFA5] hover:bg-[#00a38d] text-white font-bold py-3 rounded-lg transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
          </div>
        </div>

        {/* Social Login Buttons (Dummy Dulu) */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 text-sm">
            <GoogleLogo size={20} weight="bold" className="text-red-500" />
            Google
          </button>
        </div>

        {/* Link Daftar */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun? <span className="text-[#00BFA5] font-bold cursor-pointer hover:underline">Daftar Sekarang</span>
        </p>

      </div>
    </div>
  );
};

export default AuthModal;