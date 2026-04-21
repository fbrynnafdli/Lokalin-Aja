"use client";

import React, { useState } from "react";
import { Plus, X, UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddProductButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "FOOD",
    image: "", // Nanti ini isinya kode Base64 yang puanjang banget
  });

  // Fungsi Ajaib: Ubah File Gambar jadi Kode Teks (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cek ukuran file (Maks 1MB biar database gak meledak)
      if (file.size > 1000000) {
        alert("Ukuran foto terlalu besar! Maksimal 1MB ya.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsOpen(false);
        setFormData({ name: "", price: "", category: "FOOD", image: "" });
        router.refresh();
      } else {
        alert("Gagal menambah menu. Coba foto yang lebih kecil.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#00BFA5] text-white font-bold rounded-xl hover:bg-[#00a38d] transition-all shadow-lg shadow-[#00BFA5]/20"
      >
        <Plus size={20} weight="bold" />
        Tambah Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[500px] rounded-2xl p-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tambah Menu Baru</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500">
                <X size={24} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Nama Menu */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Menu</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Kopi Susu Gula Aren"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Harga & Kategori */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Harga (Rp)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="15000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] outline-none bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="FOOD">Makanan</option>
                    <option value="DRINK">Minuman</option>
                  </select>
                </div>
              </div>

              {/* UPLOAD GAMBAR (Baru) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Menu</label>
                
                <div className="flex items-center gap-4">
                  {/* Preview Gambar */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <UploadSimple size={24} className="text-gray-400" />
                    )}
                  </div>

                  {/* Input File */}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#00BFA5]/10 file:text-[#00BFA5]
                        hover:file:bg-[#00BFA5]/20
                        cursor-pointer
                      "
                    />
                    <p className="text-xs text-gray-400 mt-1">Format: JPG/PNG. Maks 1MB.</p>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-6 py-2 bg-[#00BFA5] text-white font-bold rounded-lg hover:bg-[#00a38d] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Menu"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductButton;