import React from "react";
import { Star, Heart } from "@phosphor-icons/react/dist/ssr";

interface PlaceHeaderProps {
  name: string;
  rating?: number;
  address: string;
  category: string;
}

const PlaceHeader = ({ name, rating = 4.5, address, category }: PlaceHeaderProps) => {
  const tags = [category, "Nongkrong", "Cozy", "Ngops", "Kuliner"];

  return (
    <div className="mt-6 mb-8">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>
              <div className="flex items-center gap-1">
                <Star size={24} weight="fill" className="text-yellow-400" />
                <span className="text-xl font-bold text-gray-600">{rating}</span>
              </div>
           </div>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={32} />
        </button>
      </div>

      <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-3xl">
        {address} • <span className="text-gray-500">2.0 km</span>
      </p>

      <p className="text-gray-800 mt-2 font-medium">
        <span className="font-bold">Buka:</span> 10.00 - 02.00
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-4 py-1.5 bg-[#EAFBF7] text-gray-600 rounded-full text-sm font-medium hover:bg-[#d5f5ee] transition-colors cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-end mt-10 border-b border-gray-100 pb-4">
         <div>
            <h2 className="text-xl font-bold text-gray-900">Layanan & Menu Andalan</h2>
         </div>
         <button className="text-gray-400 text-sm hover:text-[#00BFA5]">Selengkapnya</button>
      </div>

    </div>
  );
};

export default PlaceHeader;