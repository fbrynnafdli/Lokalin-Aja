"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  CalendarBlank, 
  Clock, 
  Users, 
  NotePencil, 
  Trash 
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string | null;
  isAvailable: boolean;
}

interface MenuOrderProps {
  placeId: string;
  foods: Product[];
  drinks: Product[];
}

const MenuOrder = ({ placeId, foods, drinks }: MenuOrderProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [cart, setCart] = useState<{ id: string; qty: number; price: number; name: string }[]>([]);
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [notes, setNotes] = useState("");
  const [isReservation, setIsReservation] = useState(false);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, qty: 1, price: product.price, name: product.name }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!session) {
      setAuthModalOpen(true);
      return;
    }

    if (cart.length === 0 && !isReservation) {
      alert("Pilih menu dulu atau centang Reservasi Meja!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          items: cart,
          totalPrice,
          bookingDate: date,
          bookingTime: time,
          guestCount: people,
          notes: notes,
          isReservation
        }),
      });

      if (res.ok) {
        alert("Pesanan Berhasil! 🎉");
        setCart([]);
        setDate("");
        setTime("");
        router.push("/orders");
      } else {
        const data = await res.json();
        alert(data.error || "Gagal memesan");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 relative items-start">

      <div className="flex-1 w-full">
        
        {/* Section Makanan */}
        {foods.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🍽️ Makanan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {foods.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
              ))}
            </div>
          </div>
        )}

        {/* Section Minuman */}
        {drinks.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🥤 Minuman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {drinks.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FORMULIR PEMESANAN */}
      <div className="w-full lg:w-[380px] sticky top-24">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6">
          
          <h3 className="font-bold text-lg text-gray-900 mb-1">Mau Nongkrong di sini?</h3>
          <p className="text-sm text-gray-500 mb-6">Amankan Mejamu Sekarang!</p>

          {/* Form Input Group */}
          <div className="space-y-4">
            
            {/* Input Tanggal */}
            <div className="relative">
              <div className="absolute left-4 top-3 text-gray-400">
                <CalendarBlank size={20} />
              </div>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all"
                placeholder="Pilih Tanggal"
              />
            </div>

            {/* Input Jam */}
            <div className="relative">
              <div className="absolute left-4 top-3 text-gray-400">
                <Clock size={20} />
              </div>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all"
              />
            </div>

            {/* Input Jumlah Orang */}
            <div className="relative">
              <div className="absolute left-4 top-3 text-gray-400">
                <Users size={20} />
              </div>
              <input 
                type="number" 
                min="1"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all"
                placeholder="Jumlah Orang"
              />
            </div>

            {/* Input Catatan */}
            <div className="relative">
              <div className="absolute left-4 top-3 text-gray-400">
                <NotePencil size={20} />
              </div>
              <textarea 
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all resize-none"
                placeholder="Catatan (Opsional)"
              />
            </div>

            {/* Toggle Reservasi Meja */}
            <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input 
                type="checkbox" 
                checked={isReservation}
                onChange={(e) => setIsReservation(e.target.checked)}
                className="w-5 h-5 text-[#00BFA5] rounded focus:ring-[#00BFA5] border-gray-300" 
              />
              <span className="text-sm font-medium text-gray-700">Reservasi Meja Saja</span>
            </label>

          </div>

          {/* === RINGKASAN MENU YANG DIPILIH (CART) === */}
          {cart.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Menu Dipilih:</h4>
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                       <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Minus size={14}/></button>
                       <span className="font-bold text-[#00BFA5]">{item.qty}x</span>
                       <span className="text-gray-600 truncate max-w-[120px]">{item.name}</span>
                       <button onClick={() => addToCart({ ...item, isAvailable: true, category: '', image: null } as Product)} className="text-gray-400 hover:text-[#00BFA5]"><Plus size={14}/></button>
                    </div>
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("id-ID").format(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-gray-200">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-lg text-[#00BFA5]">
                   Rp {new Intl.NumberFormat("id-ID").format(totalPrice)}
                </span>
              </div>
            </div>
          )}

          {/* Tombol Pesan */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full mt-6 bg-[#00BFA5] text-white py-3.5 rounded-xl font-bold hover:bg-[#00a38d] transition-all shadow-lg shadow-[#00BFA5]/30 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Memproses..." : "PESAN SEKARANG"}
          </button>

        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

function MenuCard({ item, onAdd }: { item: Product; onAdd: () => void }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.image || "https://placehold.co/200x200?text=Menu"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-gray-900 line-clamp-2">{item.name}</h4>
          <p className="text-[#00BFA5] font-bold text-sm mt-1">
            Rp {new Intl.NumberFormat("id-ID").format(item.price)}
          </p>
        </div>
        <button
          onClick={onAdd}
          className="self-end bg-gray-50 text-[#00BFA5] hover:bg-[#00BFA5] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
        >
          <Plus weight="bold"/> Tambah
        </button>
      </div>
    </div>
  );
}

export default MenuOrder;