// app/[lang]/page.tsx
import React from 'react';
import HeroSection from './_component/HeroSection';
import FeaturesSection from './_component/FeaturesSection';
import PricingSection from './_component/PricingSection';
import FaqSection from './_component/FaqSection';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
return (
    <div className="bg-white overflow-hidden">
      <main>
        <HeroSection lang={lang} />
        <FeaturesSection lang={lang}  />
        <PricingSection  />
        <FaqSection lang={lang} />
      </main>
    </div>
  );
}