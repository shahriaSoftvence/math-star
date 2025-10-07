import React from "react";
import FeaturesElement from "./FeaturesElement";
import { getTranslations } from '@/lib/translations';

interface FeaturesSectionProps {
  lang: string;
}

const FeaturesSection = async ({ lang }: FeaturesSectionProps) => {
  const language = lang as 'en' | 'de';
  const { t } = getTranslations(language, 'homepage');
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        {/* Heading */}
        <div className="text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold font-Quicksand leading-10">
            <span className="text-gray-900">{t('features.title1')}{" "}</span>
            <span className="text-blue-500">{t('features.title2')}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-xl font-normal font-sans leading-7 mt-4">
            {t('features.description')}
          </p>
        </div>
        <FeaturesElement lang={lang} />
      </div>
    </section>
  );
};

export default FeaturesSection;
