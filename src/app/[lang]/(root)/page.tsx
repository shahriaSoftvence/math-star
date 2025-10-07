// app/[lang]/page.tsx
import React from 'react';
import HeroSection from './_component/HeroSection';
import FeaturesSection from './_component/FeaturesSection';
import PricingSection from './_component/PricingSection';
import FaqSection from './_component/FaqSection';

interface LandingPageProps {
  params: {
    lang: string;
  };
}

export default function LandingPage({ params }: LandingPageProps) {
  return (
    <div className="bg-white overflow-hidden">
      <main>
        <HeroSection lang={params.lang} />
        <FeaturesSection lang={params.lang}  />
        <PricingSection  />
        <FaqSection lang={params.lang} />
      </main>
    </div>
  );
}