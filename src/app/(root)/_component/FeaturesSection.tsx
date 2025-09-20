import React from "react";
import FeaturesElement from "./FeaturesElement";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        {/* Heading */}
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl font-bold font-Quicksand leading-10">
            <span className="text-gray-900">What is </span>
            <span className="text-blue-500">Math Star?</span>
          </h2>
          <p className="text-gray-600 text-xl font-normal font-sans leading-7 mt-4">
            Our special features that make your child's learning more effective
            and enjoyable
          </p>
        </div>

        {/* Client side feature cards */}
        <FeaturesElement />
      </div>
    </section>
  );
};

export default FeaturesSection;
