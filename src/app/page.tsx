import PracticeCard from '@/components/PracticeCard';
import ActivityItem from '@/components/ActivityItem';
import { Plus, Minus, X, Divide, Star } from 'lucide-react';

const practiceItems = [
  { icon: <Plus />, title: "Practice Addition", description: "Improve your basic sums", bgColor: "bg-yellow-100", textColor: "text-yellow-800", iconColor: "text-yellow-500" },
  { icon: <Minus />, title: "Practice Subtraction", description: "Sharpen your subtraction skills", bgColor: "bg-pink-100", textColor: "text-pink-800", iconColor: "text-pink-500" },
  { icon: <X />, title: "Practice Multiplication", description: "Master your times tables", bgColor: "bg-green-100", textColor: "text-green-800", iconColor: "text-green-500" },
  { icon: <Divide />, title: "Practice Division", description: "Divide and conquer", bgColor: "bg-purple-100", textColor: "text-purple-800", iconColor: "text-purple-500" },
];

const activityItems = [
  { title: "Addition - Speed Mode - 60s", score: "12 correct", stars: "★★" },
  { title: "Division - No Mistake", score: "Ended after 5th question", stars: "★" },
  { title: "Multiplication - 100 Questions", score: "85/100 completed", stars: "★★★" },
  { title: "Subtraction - What's Missing", score: "8/10 correct", stars: "★★" },
];

export default function Home() {
  const dailyGoalProgress = 83;

  return (
    <div className="space-y-8">
      {/* Choose Your Practice */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Your Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceItems.map((item, index) => (
            <PracticeCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Your Progress Today</h3>
          <div className="space-y-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Practice Time:</span>
              <span className="font-medium text-gray-800">25 Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stars Earned:</span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span>25</span>
                <Star size={16} className="ml-1" />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Best Challenge Score:</span>
              <span className="font-medium text-gray-800">92/100</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Daily Goal Progress:</span>
                <span className="font-medium text-gray-800">{dailyGoalProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${dailyGoalProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Recent Activity</h3>
          <div className="space-y-4">
            {activityItems.map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
        <div>
          <h3 className="font-semibold text-lg">Your Star Balance</h3>
          <p className="text-5xl font-bold my-1">1,247</p>
          <p className="text-sm opacity-80">Top up to win rewards</p>
        </div>
        <div className="text-7xl opacity-50">
          {/* <BadgeBronze size={80} /> */}
        </div>
      </div>
    </div>
  );
}