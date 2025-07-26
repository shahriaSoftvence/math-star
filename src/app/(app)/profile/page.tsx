// src/app/profile/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Crown, Calendar, Edit, Award, Star } from 'lucide-react';

const achievements = [
  {
    icon: '⭐',
    title: 'First Star!',
    description: 'Earned your first star',
    unlocked: true,
  },
  {
    icon: '⚡',
    title: 'Speed Demon',
    description: 'Completed Speed Mode 10 times',
    unlocked: true,
  },
  {
    icon: '🏆',
    title: 'Perfect Score',
    description: 'Got 100% in a challenge',
    unlocked: true,
  },
  {
    icon: '🧮',
    title: 'Math Master',
    description: 'Practice all 4 operations',
    unlocked: false,
  },
];

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="text-gray-600" />
          </Link>
          <h1 className="text-gray-800 text-3xl font-bold font-Nunito">My Profile</h1>
        </div>

        {/* Subscription Card */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl shadow-lg text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Crown size={32} className="text-yellow-300" />
              <div>
                <h2 className="text-xl font-bold font-Nunito">Current Subscription</h2>
                <p className="text-purple-100 font-Nunito">Premium Plan</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-purple-100 font-Nunito">
                <Calendar size={16} />
                <span>Renews on February 15, 2024</span>
              </div>
              <button className="px-3 py-2 bg-white text-red-500 text-sm font-medium font-Nunito rounded-md hover:bg-gray-100 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold font-Nunito">E</span>
          </div>
          <h2 className="text-gray-800 text-2xl font-bold font-Nunito">Emma</h2>
          <div className="flex items-center gap-2 mt-1">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-700 text-lg font-semibold font-Nunito">Math Star Level 3</span>
          </div>
          <p className="text-gray-600 mt-2 font-Nunito">Keep practicing to reach Level 4!</p>
          <Link href='/settings'>
          <button className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-Nunito">
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
          </Link>
        </div>

        {/* Achievements Card */}
        <div className="p-6 bg-white rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Award size={24} className="text-yellow-500" />
            <h3 className="text-gray-800 text-xl font-bold font-Nunito">Achievements</h3>
          </div>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className={`p-4 rounded-xl border flex items-center gap-4 ${
                  ach.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <span className="text-2xl">{ach.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold font-Nunito ${ach.unlocked ? 'text-green-800' : 'text-gray-500'}`}>
                    {ach.title}
                  </p>
                  <p className={`text-sm font-Nunito ${ach.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                    {ach.description}
                  </p>
                </div>
                {ach.unlocked && <Star className="fill-green-500 stroke-green-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}