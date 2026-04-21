"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  ShoppingBag, 
  Coffee, 
  Storefront, 
  SignOut 
} from "@phosphor-icons/react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Beranda", href: "/dashboard", icon: SquaresFour },
    { name: "Pesanan Masuk", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Kelola Layanan", href: "/dashboard/products", icon: Coffee },
    { name: "Profil Tempat", href: "/dashboard/profile", icon: Storefront },
  ];

  return (
    <aside className="w-[280px] bg-white border-r border-gray-100 h-screen fixed left-0 top-0 flex flex-col p-6 z-40">
      
      <div className="mb-10 px-2">
        <Link href="/" className="text-2xl font-bold text-[#00BFA5]">
          Lokalin Aja
        </Link>
        <p className="text-xs text-gray-400 mt-1 font-medium">Mitra Dashboard</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-[#00BFA5] text-white shadow-lg shadow-[#00BFA5]/30" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#00BFA5]"
              }`}
            >
              <item.icon size={22} weight={isActive ? "fill" : "regular"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors mt-auto"
      >
        <SignOut size={22} />
        Keluar
      </button>
    </aside>
  );
};

export default Sidebar;