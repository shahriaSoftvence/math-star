// src/app/page.tsx
import React from 'react';
import HeroSection from './_component/HeroSection';
import FeaturesSection from './_component/FeaturesSection';
import PricingSection from './_component/PricingSection';
import FaqSection from './_component/FaqSection';

export default function LandingPage() {
  return (
    <div className="bg-white overflow-hidden">
    
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
      </main>
     
    </div>
  );
}