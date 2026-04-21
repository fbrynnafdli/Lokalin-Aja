import React from "react";
import { Wallet, ShoppingBagOpen, CheckCircle } from "@phosphor-icons/react/dist/ssr"; // Pakai /dist/ssr buat server component

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hai, Sore Space 👋</h1>
        <p className="text-gray-500">Ringkasan aktivitas tempat kamu hari ini</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Pendapatan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Wallet size={24} weight="fill" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pendapatan Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-800">Rp 1.500.000</h3>
          </div>
        </div>

        {/* Card 2: Pesanan Masuk */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBagOpen size={24} weight="fill" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pesanan Masuk</p>
            <h3 className="text-2xl font-bold text-gray-800">10</h3>
          </div>
        </div>

        {/* Card 3: Pesanan Selesai */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <CheckCircle size={24} weight="fill" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pesanan Selesai</p>
            <h3 className="text-2xl font-bold text-gray-800">5</h3>
          </div>
        </div>

      </div>

      {/* Placeholder Tabel Pesanan Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pesanan Terbaru</h3>
        <div className="h-40 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          Belum ada data real, nanti kita ambil dari database
        </div>
      </div>

    </div>
  );
}