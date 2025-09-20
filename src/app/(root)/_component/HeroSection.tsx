// src/app/(root)/_component/HeroSection.tsx
import React from "react";
import Image from "next/image";
import Lines from "../../../../public/Lines.png";
import HeroMedia from "./HeroMedia";

const HeroSection = () => {
  return (
    <div className="w-full pt-[200px] pb-[100px] min-h-[800px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <Image src={Lines} className="absolute top-[8%] left-[17%]" alt="line" />

      <HeroMedia />
    </div>
  );
};

export default HeroSection;
