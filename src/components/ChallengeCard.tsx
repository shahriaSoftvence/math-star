import React from 'react';

type ChallengeCardProps = {
  icon: React.ReactElement<{ size?: number }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
};

export default function ChallengeCard({ icon, title, description, bgColor, iconColor }: ChallengeCardProps) {
  return (
    <div className={`${bgColor} p-6 rounded-2xl flex flex-col items-center text-center shadow-lg text-white hover:scale-105 transition-transform`}>
        <div className={`w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mb-4 ${iconColor}`}>
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="font-medium text-xl">{title}</h3>
        <p className="text-sm opacity-90 mt-1">{description}</p>
    </div>
  );
}