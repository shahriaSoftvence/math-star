"use client";

import React from "react";
import Image from "next/image";
import Lines from "../../../../public/Lines.png";
import Link from "next/link";
import HeroMedia from "./HeroMedia";
// import HeroMedia from "./HeroMedia";

const HeroSection = () => {

  return (
    <div className="w-full pt-[200px] pb-[100px] min-h-[800px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <Image src={Lines} className="absolute top-[8%] left-[17%]" alt="line" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 items-center z-10 fade-up">
        <div
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
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
            <Link href="/auth/signup">
              <button className="h-14 px-5 py-3 bg-blue-500 rounded-lg text-white text-xl font-bold font-Quicksand leading-normal hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="h-14 px-5 py-3 bg-zinc-100 rounded-lg text-black text-xl font-bold font-Quicksand leading-normal border border-zinc-200 hover:bg-zinc-200 transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </div>
        <div  className="fade-up" style={{ animationDelay: "0.15s" }}>
          <HeroMedia />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
