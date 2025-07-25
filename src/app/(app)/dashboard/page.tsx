import PracticeCard from '@/components/PracticeCard';
import ActivityItem from '@/components/ActivityItem';
import { Plus, Minus, X, Divide, Star } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";
import BadgeBronze from '../../../../public/assets/Bronje.png';
import Image from 'next/image';
import Link from 'next/link';


const practiceItems = [
  { link: "/addition", icon: <Plus />, title: "Practice Addition", description: "Improve your basic sums", bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-400 ", textColor: "text-yellow-800", iconColor: "text-yellow-500" },
  { link: "/subtraction", icon: <Minus />, title: "Practice Subtraction", description: "Sharpen your subtraction skills", bgColor: "bg-gradient-to-br from-pink-300 to-pink-400", textColor: "text-pink-800", iconColor: "text-pink-500" },
  { link: "/multiplication", icon: <X />, title: "Practice Multiplication", description: "Master your times tables", bgColor: "bg-gradient-to-br from-green-300 to-green-400", textColor: "text-green-800", iconColor: "text-green-500" },
  { link: "/division", icon: <Divide />, title: "Practice Division", description: "Divide and conquer", bgColor: "bg-gradient-to-br from-purple-300 to-purple-400", textColor: "text-purple-800", iconColor: "text-purple-500" },
];

const activityItems = [
  { title: "Addition - Speed Mode - 60s", score: "12 correct", stars: 1 },
  { title: "Division - No Mistake", score: "Ended after 5th question", stars: 1 },
  { title: "Multiplication - 100 Questions", score: "85/100 completed", stars: 3 },
  { title: "Subtraction - What's Missing", score: "8/10 correct", stars: 2 },
];

export default function Home() {
  const dailyGoalProgress = 83;

  return (
    <div className="space-y-8 max-w-[1104px] mx-auto">
      {/* Choose Your Practice */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Choose Your Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <PracticeCard {...item} />
            </Link>
          ))}
        </div>
      </div>

      {/* Progress and Activity */}
      <div className="flex flex-wrap justify-baseline items-start st gap-6">
        <div className="self-stretch bg-white p-6 w-[48%] max-[1000px]:w-[100%] rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Your Progress Today</h3>
          <div className="space-y-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Practice Time:</span>
              <span className="font-medium text-[#2563EB]">25 Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stars Earned:</span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span>25</span>
                <Star size={16} className="ml-1 fill-[#EAB308] " />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Best Challenge Score:</span>
              <span className="font-medium text-gray-800">🏆 92/100</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Daily Goal Progress:</span>
                <span className="font-medium text-gray-800">{dailyGoalProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full" style={{ width: `${dailyGoalProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch bg-white p-6 w-[48%] max-[1000px]:w-[100%] rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Recent Activity</h3>
          <div className="space-y-4">
            {activityItems.map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <Link href="/rewards">
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
          <div>
            <h3 className="font-semibold text-lg">Your Star Balance</h3>
            <p className="text-5xl font-bold my-1 flex gap-2"><IoStarSharp /> 1,247</p>
            <p className="text-sm opacity-80">Top up to win rewards</p>
          </div>
          <div className="text-7xl absolute top-0 right-0">
            <Image src={BadgeBronze} alt='Badge' />
          </div>
        </div>
      </Link>
    </div>
  );
}