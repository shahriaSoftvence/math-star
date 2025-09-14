// ste_br/src/components/landing/HeroSection.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '../../../public/assets/banner-image.png';
import { PlayCircle, X } from 'lucide-react';
import Lines from '../../../public/Lines.png';
import { motion } from 'framer-motion'; // <-- Import motion

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full pt-[200px] pb-[100px] min-h-[800px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <Image src={Lines} className="absolute top-[8%] left-[17%]" alt="line" />
      <motion.div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 items-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-semibold font-Poppins leading-tight">
            <span className="text-blue-600">
              Turn Screen Time Into real study time
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0D1216] to-[#008EFF] inline-block text-transparent bg-clip-text">
              Elementary school math made fun
            </span>
          </h1>
          <p className="text-black text-xl font-medium font-Quicksand leading-loose max-w-lg">
            Become a math star! Study with Interactive exercises and master
            exciting challenges.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/signup">
              <button className="h-14 px-5 py-3 bg-blue-500 rounded-lg text-white text-xl font-bold font-Quicksand leading-normal hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            </Link>
            <Link href="/signin">
              <button className="h-14 px-5 py-3 bg-zinc-100 rounded-lg text-black text-xl font-bold font-Quicksand leading-normal hover:bg-zinc-200 transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          variants={itemVariants}
        >
          {/* FIX: Replaced fixed width and height with responsive classes */}
          <div className="w-full max-w-xl aspect-square relative group">
            <Image
              src={HeroImage}
              alt="Children learning on a computer"
              layout="fill"
              objectFit="cover"
              className="rounded-xl border-[3px] border-blue-500"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-xl cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
              onClick={openVideo}
            >
              <PlayCircle size={80} className="text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {isVideoOpen && (
        <div className="fixed inset-0 bg-[#00000048] bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[90%] h-[80%] p-4">
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
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
    </div>
  );
};

export default HeroSection;