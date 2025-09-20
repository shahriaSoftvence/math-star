'use client';

import React from "react";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";

const featureData = [
  {
    title: "Created By Teachers",
    content:
      "Math Star is an e-learning platform created by experienced elementary school teachers. We all share a common goal of helping children learn.",
    footer: "It's our passion!",
  },
  {
    title: "Basic Math Operations",
    content:
      "We are committed to helping children improve their skills in the four basic math operations:",
    list: ["Addition", "Subtraction", "Multiplication", "Division"],
  },
  {
    title: "Personalized Learning",
    content:
      "Children can create exercises tailored to their needs at their personal learning pace - quick and easy.",
    footer: "Never repetitive, thanks to adaptive exercise generation.",
  },
  {
    title: "Safe Learning Environment",
    content:
      "Math Star is free from ads, games and other distractions. We don't provide tools to communicate or connect with other users.",
    footer: "Your child's safety is our top priority.",
  },
];

const FeatureCard = ({
  title,
  content,
  footer,
  list,
}: (typeof featureData)[0]) => (
  <motion.div
    className="flex-1 h-96 relative bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg p-8 text-white flex flex-col"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="absolute -top-6 -right-6 flex items-center justify-center">
      <IoStar size={62} className="fill-yellow-400" />
    </div>
    <h3 className="text-2xl font-semibold font-Quicksand leading-loose">
      {title}
    </h3>
    <p className="text-base font-normal font-sans leading-relaxed mt-4">
      {content}
    </p>
    {list && (
      <ul className="mt-4 space-y-2">
        {list.map((item) => (
          <li
            key={item}
            className="text-blue-100 text-base font-normal font-sans leading-normal"
          >
            • {item}
          </li>
        ))}
      </ul>
    )}
    {footer && (
      <p className="mt-auto text-base font-normal font-sans leading-normal">
        {footer}
      </p>
    )}
  </motion.div>
);

const FeaturesElement = () => {
  return (
    <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featureData.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
};

export default FeaturesElement;
