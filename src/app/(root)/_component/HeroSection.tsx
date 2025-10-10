import React from "react";
import Image from "next/image";
import Lines from "@/asset/Lines.png";
import Link from "next/link";
import HeroMedia from "./HeroMedia";
import { Button } from "@/components/ui/button";
import { getDictionary } from "../../actions/dictionaries";



const HeroSection = async () => {
  const {homepage} = await getDictionary();

  return (
    <div className="w-full pt-[200px] pb-[100px] min-h-[800px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <Image src={Lines} className="absolute top-[8%] left-[17%]" alt="line" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 items-center z-10 fade-up">
        <div
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          <h1 className="text-3xl md:text-4xl xl:text-[45px] font-semibold font-Poppins leading-tight">
            <span className="text-blue-600">
              {homepage.hero.title_line1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0D1216] to-[#008EFF] inline-block text-transparent bg-clip-text">
              {homepage.hero.title_line2}
            </span>
          </h1>
          <p className="text-black text-lg xl:text-xl font-medium font-Quicksand leading-loose max-w-lg">
            {homepage.hero.description}
          </p>
          <div className="flex items-center gap-3">
            <Link href="/auth/signup">
              <Button
                className="w-full sm:w-auto h-10 bg-blue-500 hover:bg-blue-600 sm:h-12 lg:h-14 text-base md:text-lg font-medium md:font-semibold"
                variant="default"
              >
                {homepage.hero.sign_up}
              </Button>
            </Link>

            <Link href="/auth/signin">
              <Button
                className="w-full sm:w-auto h-10 bg-gray-100 hover:bg-gray-200 sm:h-12 lg:h-14 text-base md:text-lg font-medium md:font-semibold"
                variant="outline"
              >
                {homepage.hero.sign_in}
              </Button>
            </Link>
          </div>
        </div>
        <div className="fade-up" style={{ animationDelay: "0.15s" }}>
          <HeroMedia />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
