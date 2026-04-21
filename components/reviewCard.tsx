"use client";

import React from "react";
import Image from "next/image";
import { Star, DotsThreeVertical } from "@phosphor-icons/react";


interface ReviewCardProps {
  avatar: string;
  name: string;
  place: string;
  rating: string;
  review: string;
  tags: string[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  name,
  place,
  rating,
  review,
  tags,
}) => {
  return (
    <div className="w-full h-full relative rounded-xl bg-white flex items-start p-2 gap-3 text-left font-sans">
      
      <div className="flex-shrink-0">
        <Image 
          src={avatar} 
          alt={name}
          width={45} 
          height={45} 
          className="rounded-full object-cover w-[45px] h-[45px]"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        
        <div className="flex justify-between items-start w-full">
          
          <div className="flex-1 pr-2">
            <span className="font-bold text-gray-900 text-base leading-snug">
              {name}
            </span>
            <span className="text-gray-500 text-sm font-normal leading-snug ml-1">
              di {place}
            </span>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3 pt-0.5">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Star weight="fill" className="text-orange-400" size={14} />
              <span className="text-xs font-semibold text-gray-700">{rating}</span>
            </div>
            <DotsThreeVertical size={24} className="text-gray-400 cursor-pointer" />
          </div>

        </div>

        <div className="text-sm md:text-base text-gray-600 font-light leading-relaxed italic line-clamp-4">
          “{review}”
        </div>

        <div className="text-xs md:text-sm text-[#00BFA5] font-medium mt-auto pt-2">
          Tags: {tags.join(", ")}
        </div>

      </div>
    </div>
  );
};

export default ReviewCard;