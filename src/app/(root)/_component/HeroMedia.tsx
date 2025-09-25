'use client'

import React, { useState } from 'react'
import HeroImage from "../../../../public/assets/banner-image.png";
import { PlayCircle, X } from "lucide-react";
import Image from 'next/image';


const HeroMedia = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <>
      <div
        className="flex justify-center items-center"
      >
        <div className="w-full max-w-xl aspect-square relative group">
          <Image
            src={HeroImage}
            alt="Children learning on a computer"
            fill
            className="rounded-xl border-[3px] border-blue-500 object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-xl cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
            onClick={openVideo}
          >
            <PlayCircle size={80} className="text-white" />
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 bg-[#00000048] bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[90%] h-[80%] p-4">
            <button
              onClick={closeVideo}
              className="absolute top-1/4 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <div className="aspect-w-16 h-full">
              <iframe
                src="https://www.youtube.com/embed/5oH9Nr3bKfw?si=nVpOpb7mue9lqFFL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroMedia;
