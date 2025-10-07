'use client'

import React, { useState } from 'react'
import HeroImage from "@/asset/images/banner-image.png";
import { PlayCircle, X } from "lucide-react";
import Image from 'next/image';

const HeroMedia = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl aspect-square relative group">
          <Image
            src={HeroImage}
            alt="Children learning on a computer"
            fill
            className="rounded-xl border-[3px] border-blue-500 object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
            onClick={openVideo}
          >
            <PlayCircle size={80} className="text-white" />
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center rounded-2xl bg-black/90">
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X size={32} />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full max-w-[100vw] max-h-[100vh]">
              <iframe
                src="https://youtube.com/embed/B1J6Ou4q8vE?si=VEJt0CVyAjbb9HAL"
                // src="https://www.youtube.com/embed/5oH9Nr3bKfw?si=nVpOpb7mue9lqFFL"
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
