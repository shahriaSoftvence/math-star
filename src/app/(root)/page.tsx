// app/[lang]/page.tsx
import React from 'react';
import HeroSection from './_component/HeroSection';
import FeaturesSection from './_component/FeaturesSection';
import PricingSection from './_component/PricingSection';
import FaqSection from './_component/FaqSection';

export const metadata = {
  title: "Math Star — Mathe lernen mit Spaß und Erfolg | Interaktive Lernplattform",
  description: "Math Star revolutioniert Mathe lernen! Personalisierte Übungen, interaktive Challenges, Echtzeit-Fortschritte & flexible Preise. Für bessere Noten & nachhaltigen Lernerfolg in Mathematik.",
  keywords: "Mathe lernen, Mathematik Plattform, Online Nachhilfe, Interaktive Übungen, Personalisiertes Lernen, Mathe App, Schülernachhilfe, Grundschule Mathe, Gymnasium Mathematik, Lernfortschritt, Preise, FAQ",
  authors: [{ name: "Math Star" }],
  robots: "index, follow",

  openGraph: {
    title: "Math Star — Mathe lernen mit Spaß und Erfolg",
    description: "Interaktive Mathe-Lernplattform mit personalisierten Übungen, Echtzeit-Fortschritten & flexiblen Preisen. Für nachhaltigen Lernerfolg.",
    type: "website",
    locale: "de_DE",
    siteName: "Math Star",
    url: "https://math-star.de",
  },
  
  other: {
    "schema:name": "Math Star - Mathe Lernplattform",
    "schema:description": "Interaktive Plattform für Mathematik Lernen",
    "schema:keywords": "Mathe, Lernen, Bildung, Online, Plattform"
  }
};

export default async function LandingPage() {

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