"use client";

import React, { useState } from "react";
import { Coffee, PencilSimple, Trash, X, UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface ProductProps {
  item: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string | null;
    isAvailable: boolean;
  };
}

const ProductCard = ({ item }: ProductProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image || "",
    isAvailable: item.isAvailable,
  });

  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus menu ini?")) return;
    
    setIsLoading(true);
    try {
      await fetch(`/api/products?id=${item.id}`, { method: "DELETE" });
      router.refresh();
    } catch (e) {
      alert("Gagal hapus");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    const newState = !editData.isAvailable;
    setEditData({ ...editData, isAvailable: newState });

    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          ...editData,
          isAvailable: newState,
        }),
      });
      router.refresh();
    } catch (e) {
      alert("Gagal update status");
      setEditData({ ...editData, isAvailable: !newState });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, ...editData }),
      });
      setIsEditing(false);
      router.refresh();
    } catch (e) {
      alert("Gagal update menu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 1000000) {
        const reader = new FileReader();
        reader.onloadend = () => setEditData({...editData, image: reader.result as string});
        reader.readAsDataURL(file);
    }
  };

  const priceFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(item.price);

  return (
    <>
      <div className={`bg-white rounded-xl border transition-all overflow-hidden group relative ${!editData.isAvailable ? 'opacity-75 grayscale-[0.5]' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>

        <div className="h-40 bg-gray-100 relative overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Coffee size={48} />
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIsEditing(true)} className="p-2 bg-white text-gray-700 rounded-lg hover:text-[#00BFA5] transition-colors">
              <PencilSimple size={20} weight="bold" />
            </button>
            <button onClick={handleDelete} disabled={isLoading} className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors">
              <Trash size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-bold text-gray-800 text-lg truncate">{item.name}</h4>
          <p className="text-[#00BFA5] font-bold mt-1">{priceFormatted}</p>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>{editData.isAvailable ? "Tersedia" : "Habis"}</span>
            <div 
                onClick={handleToggle}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${editData.isAvailable ? 'bg-[#00BFA5]' : 'bg-gray-300'}`}
            >
              <div className={`w-3 h-3 bg-white rounded-full absolute top-1 shadow-sm transition-all ${editData.isAvailable ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-[400px] rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-lg">Edit Menu</h3>
                    <button onClick={() => setIsEditing(false)}><X size={24}/></button>
                </div>
                
                <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                    <input 
                        value={editData.name} 
                        onChange={e => setEditData({...editData, name: e.target.value})}
                        className="p-2 border rounded-lg" placeholder="Nama Menu" required
                    />
                    <div className="flex gap-2">
                        <input 
                            type="number" value={editData.price} 
                            onChange={e => setEditData({...editData, price: Number(e.target.value)})}
                            className="p-2 border rounded-lg w-full" placeholder="Harga" required
                        />
                         <select 
                            value={editData.category}
                            onChange={e => setEditData({...editData, category: e.target.value})}
                            className="p-2 border rounded-lg bg-white"
                        >
                            <option value="FOOD">Makanan</option>
                            <option value="DRINK">Minuman</option>
                        </select>
                    </div>

                    <div className="border p-2 rounded-lg flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            {editData.image && <img src={editData.image} className="w-full h-full object-cover"/>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm w-full"/>
                    </div>

                    <button type="submit" disabled={isLoading} className="bg-[#00BFA5] text-white py-2 rounded-lg font-bold">
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </form>
            </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;