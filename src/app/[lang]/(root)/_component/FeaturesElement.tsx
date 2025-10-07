import { getTranslations } from "@/lib/translations";
import React from "react";
import { IoStar } from "react-icons/io5";

interface FeaturesElementProps {
  lang: string;
}

const FeaturesElement = async ({ lang }: FeaturesElementProps) => {
  const language = lang as 'en' | 'de';
  const { t } = getTranslations(language, 'homepage');

  // Add featureData array with translations
  const featureData = [
    {
      title: t('features.items.0.title'),
      content: t('features.items.0.description'),
      footer: t('features.items.0.highlight'),
    },
    {
      title: t('features.items.1.title'),
      content: t('features.items.1.description'),
      list: [
        t('features.items.1.operations.0'),
        t('features.items.1.operations.1'),
        t('features.items.1.operations.2'),
        t('features.items.1.operations.3'),
      ],
    },
    {
      title: t('features.items.2.title'),
      content: t('features.items.2.description'),
      footer: t('features.items.2.highlight'),
    },
    {
      title: t('features.items.3.title'),
      content: t('features.items.3.description'),
      footer: t('features.items.3.highlight'),
    },
  ];

  return (
    <div className="self-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-1 md:px-5 lg:px-12 xl:px-0"
    >
      {featureData.map((feature) => (
        <div key={feature.title}
          className="flex-1 h-96 relative bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg p-8 text-white flex flex-col hover:scale-105 transition-transform"
        >
          <div className="absolute -top-6 -right-6 flex items-center justify-center">
            <IoStar size={62} className="fill-yellow-400" />
          </div>
          <h3 className="text-2xl font-semibold font-Quicksand leading-loose">
            {feature?.title}
          </h3>
          <p className="text-base font-normal font-sans leading-relaxed mt-2">
            {feature?.content}
          </p>
          {feature?.list && (
            <ul className="mt-2 space-y-2">
              {feature?.list.map((item) => (
                <li
                  key={item}
                  className="text-blue-100 text-base font-normal font-sans leading-normal"
                >
                  • {item}
                </li>
              ))}
            </ul>
          )}
          {feature?.footer && (
            <p className="mt-auto text-base font-normal font-sans leading-normal">
              {feature?.footer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturesElement;