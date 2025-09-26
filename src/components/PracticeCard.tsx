import { useSetAdditionMutation } from "@/Redux/features/addition/additionApi";
import { useSetDivisionMutation } from "@/Redux/features/division/divisionApi";
import { useSetMultiplicationMutation } from "@/Redux/features/multiplication/multiplicationApi";
import { useSetSubtractionMutation } from "@/Redux/features/subtraction/subtractionApi";
import React from "react";

type PracticeCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
};

const PracticeCard = ({
  icon,
  title,
  description,
  bgColor,
  textColor,
  iconColor,
}: PracticeCardProps) => {
  const [setAddition] = useSetAdditionMutation();
  const [setSubtraction] = useSetSubtractionMutation();
  const [setMultiplication] = useSetMultiplicationMutation();
  const [setDivision] = useSetDivisionMutation();

  const handleSetMethod = async (title: string) => {
    // console.log(title)
    if (title === "Practice Addition") {
     await setAddition();
    } else if (title === "Practice Subtraction") {
     await setSubtraction();
    } else if (title === "Practice Multiplication") {
    await  setMultiplication();
    } else if (title === "Practice Division") {
     await setDivision();
    }
  };

  return (
    <div
      onClick={() => handleSetMethod(title)}
      className={`${bgColor} p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm`}
    >
      <div
        className={`w-16 h-16 bg-white/30 rounded-full inline-flex justify-center items-center text-5xl font-bold mb-2 ${iconColor}`}
      >
        {icon}
      </div>
      <h3 className={`font-semibold text-lg ${textColor}`}>{title}</h3>
      <p className={`text-[12px] ${textColor} opacity-80`}>{description}</p>
    </div>
  );
};

export default PracticeCard;
