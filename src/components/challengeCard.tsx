import React from 'react';

type ChallengeCardProps = {
  icon: React.ReactElement<{ size?: number }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  display_top_score?: string;
};

export default function ChallengeCard({ icon, title, description, bgColor, iconColor, display_top_score }: ChallengeCardProps) {
  return (
    <div
  className={`${bgColor} p-6 rounded-2xl flex flex-col items-center text-center shadow-lg text-white hover:scale-105 transition-transform h-full`}
>
  <div className={`w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mb-4 ${iconColor}`}>
    {React.cloneElement(icon, { size: 32 })}
  </div>
  <h3 className="font-medium text-xl">{title}</h3>
  <p className="text-sm opacity-90 mt-1">{description}</p>

  {/* Push this to bottom */}
  <div className="flex-grow"></div>

  <p className="text-xs bg-white/20 rounded-md px-4 w-full py-0.5 mt-2 font-medium">
    {display_top_score ? `${display_top_score}` : "No High Score"}
  </p>
</div>

    
  );
}