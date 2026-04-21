"use client";

import React from "react";
import Image from "next/image";
import { Star } from "@phosphor-icons/react";

interface UmkmCardProps {
  image: string;
  title: string;
  rating: string;
  location: string;
  distance: string;
  hours: string;
  badge?: string;
  badgeColor?: string;
  promo?: string;
  tags?: string[];
  description?: string;
}

const UmkmCard: React.FC<UmkmCardProps> = ({
  image,
  title,
  rating,
  location,
  distance,
  hours,
  badge,
  badgeColor = "bg-[#00BFA5]",
  promo,
  tags,
  description,
}) => {
  return (
    <div className="w-full relative rounded-xl bg-white flex flex-col items-start py-2.5 px-[5px] box-border gap-[5px] text-left text-base font-sans shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full border border-gray-50">
      
      <div className="self-stretch h-[184px] relative w-full">
        <Image 
          src={image}
          alt={title}
          fill
          className="rounded-[14px] max-w-full overflow-hidden shrink-0 object-cover z-[0]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {badge && (
          <div className={`absolute top-0 right-0 w-[77px] h-[23px] rounded-tr-[14px] rounded-bl-[20px] ${badgeColor} flex items-center justify-center z-[2] text-xs text-white shadow-sm`}>
             <div className="relative leading-[150%] font-light">{badge}</div>
          </div>
        )}

        {promo && (
          <div className="absolute bottom-0 left-0 bg-[#00BFA5] h-[23px] text-white text-[10px] font-bold px-3 flex items-center justify-center shadow-sm z-[2] rounded-tr-[20px] rounded-bl-[14px] whitespace-nowrap">
            {promo}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start z-[1] w-full px-1">
        
        <div className="self-stretch flex items-center justify-between gap-[15px]">
          <b className="relative leading-[150%] text-gray-900 line-clamp-1">{title}</b>
          <div className="flex items-center justify-center gap-1 text-sm text-black">
            <Star weight="fill" className="text-orange-400 mb-0.5" size={16} />
            <div className="relative leading-[150%] font-light">{rating}</div>
          </div>
        </div>

        <div className="self-stretch flex flex-col items-start text-xs text-black mt-1">
          <div className="relative leading-[150%] text-gray-600">
            <span className="font-medium text-gray-900">{location} </span>
            <span className="font-light">• {distance} • </span>
            <span className="text-red-500 font-medium">{hours}</span>
          </div>
          
          {tags && tags.length > 0 ? (
            <div className="self-stretch relative leading-[150%] font-light text-[#00BFA5] mt-1 truncate">
              {tags.join(", ")}
            </div>
          ) : description ? (
            <div className="self-stretch relative leading-[150%] font-light text-gray-500 italic mt-1 line-clamp-2">
              "{description}"
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default UmkmCard;