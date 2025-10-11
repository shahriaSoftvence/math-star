"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hook/useDictionary";

type IconProps = {
  className?: string;
  size?: number;
};

type ChallengeStartScreenProps = {
  title: string;
  btnTxt: string;
  des?: string;
  onStart: () => void;
  onCancel: () => void;
  bgColor?: string;
  icon?: React.ComponentType<IconProps>;
  iconColor?: string;
  startBtnColor?: string;
};

const ChallengeStartScreens = ({
  title,
  btnTxt,
  des,
  onStart,
  onCancel,
  bgColor,
  icon,
  iconColor,
  iconBgColor,
  startBtnColor,
}: ChallengeStartScreenProps & { iconBgColor?: string }) => {
  const { dictionary, loading } = useDictionary();

  if (loading) return null;

  return (
    <div
      className={`w-full min-h-screen ${bgColor} flex flex-col justify-center items-center p-4`}
    >
      <div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 sm:gap-6">

        {/* Icon */}
        <div
          className={`${iconBgColor ?? 'bg-blue-100'} rounded-full flex justify-center items-center p-2 sm:p-3`}
        >
          {icon &&
            React.createElement(icon, {
              className: `${iconColor} w-8 md:w-10 h-8 md:h-10`,
              size: 40,
            })}
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-gray-800 text-2xl font-bold font-Poppins leading-snug sm:leading-loose">
            {title}
          </h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            {des ?? ""}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full">
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold w-full sm:w-auto flex-1"
            onClick={onCancel}
          >
            {dictionary?.shared?.navigation?.cancel ?? "Cancel"}
          </Button>
          <Button
            className={`${startBtnColor} text-white rounded-full font-semibold w-full sm:w-auto flex-1`}
            onClick={onStart}
          >
            {btnTxt}
          </Button>
        </div>
      </div>
    </div>
  );
};


export default ChallengeStartScreens;





// const ChallengeStartScreen = ({ onStart, onCancel }: { onStart: () => void, onCancel: () => void }) => (
//     <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col justify-center items-center p-4">
//         <div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 sm:gap-6">

//             {/* Icon */}
//             <div className="bg-blue-100 rounded-full flex justify-center items-center p-2 sm:p-3">
//                 <BsGrid3X3 className="w-10 h-10 text-pink-600" />
//             </div>

//             {/* Title and Description */}
//             <div>
//                 <h2 className="text-gray-800 text-2xl font-bold font-Poppins leading-snug sm:leading-loose">
//                     Ready to Start?
//                 </h2>
//                 <p className="text-gray-600 mt-1 text-sm md:text-base">
//                     Solve all 100 division problems!
//                 </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full">
//                 <Button
//                     className="bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 w-full sm:w-auto flex-1"
//                     onClick={onCancel}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     className="bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 w-full sm:w-auto flex-1"
//                     onClick={onStart}
//                 >
//                     Start Challenge
//                 </Button>
//             </div>

//         </div>
//     </div>
// );
