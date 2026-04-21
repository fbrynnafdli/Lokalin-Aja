"use client";

import React, { useState } from "react";
import { Storefront, MapPin, Tag, Article } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

// Tipe data props
interface ProfileFormProps {
  initialData: {
    name: string;
    description: string;
    address: string;
    category: string;
  };
}

const profileForm = ({ initialData }: ProfileFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData.name,
    description: initialData.description,
    address: initialData.address,
    category: initialData.category,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/place", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profil berhasil disimpan! 🎉");
        router.refresh();
      } else {
        alert("Gagal menyimpan profil.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      {/* Nama Tempat */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Storefront size={18} className="text-[#00BFA5]" /> Nama Tempat
        </label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00BFA5] outline-none transition-all"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Tag size={18} className="text-[#00BFA5]" /> Kategori
        </label>
        <select 
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00BFA5] outline-none bg-white"
        >
          <option value="Ngops">Ngopi (Coffee Shop)</option>
          <option value="Makan">Restoran / Makan Berat</option>
          <option value="Jajanan">Jajanan / Snack</option>
        </select>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Article size={18} className="text-[#00BFA5]" /> Deskripsi Singkat
        </label>
        <textarea 
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00BFA5] outline-none transition-all resize-none"
          placeholder="Ceritakan sedikit tentang tempatmu..."
        />
      </div>

      {/* Alamat */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <MapPin size={18} className="text-[#00BFA5]" /> Alamat Lengkap
        </label>
        <textarea 
          rows={2}
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00BFA5] outline-none transition-all resize-none"
        />
      </div>

      {/* Tombol Simpan */}
      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-8 py-3 bg-[#00BFA5] text-white font-bold rounded-xl hover:bg-[#00a38d] transition-all disabled:opacity-50 shadow-lg shadow-[#00BFA5]/20"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

    </form>
  );
};

export default profileForm;