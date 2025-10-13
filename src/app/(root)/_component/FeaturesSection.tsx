import React from "react";
import { getDictionary } from "../../actions/dictionaries";
import { IoStar } from "react-icons/io5";

const FeaturesSection = async () => {
  const { homepage } = await getDictionary();

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        {/* Heading */}
        <div className="text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold font-Quicksand leading-10">
            <span className="text-gray-900">{homepage.features.title1}{" "}</span>
            <span className="text-blue-500">{homepage.features.title2}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-xl font-normal font-sans leading-7 mt-4">
            {homepage.features.description}
          </p>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-1 md:px-5 lg:px-12 xl:px-0"
        >
          {homepage?.features?.items?.map((item) => (
            <div key={item.title}
              className="flex-1 h-96 relative bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg p-8 text-white flex flex-col hover:scale-105 transition-transform"
            >
              <div className="absolute -top-6 -right-6 flex items-center justify-center">
                <IoStar size={62} className="fill-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold font-Quicksand leading-loose">
                {item.title}
              </h3>
              <p className="text-base font-normal font-sans leading-relaxed mt-2">
                {item.description}
              </p>
              {item.operations && (
                <ul className="mt-2 space-y-2">
                  {item.operations.map((operation) => (
                    <li
                      key={operation}
                      className="text-blue-100 text-base font-normal font-sans leading-normal"
                    >
                      • {operation}
                    </li>
                  ))}
                </ul>
              )}
              {item.highlight && (
                <p className="mt-auto text-base font-normal font-sans leading-normal">
                  {item.highlight}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
