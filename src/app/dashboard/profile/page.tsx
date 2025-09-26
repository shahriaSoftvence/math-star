"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Award,
  Star,
  Camera,
} from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/Redux/features/auth/authApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useGetMyAchievementsQuery } from "@/Redux/features/reward/rewardApi";
import { Achievement } from "../../../../type/practise";

const achievements = [
  {
    icon: "⭐",
    title: "First Star!",
    description: "Earned your first star",
    unlocked: true,
  },
  {
    icon: "⚡",
    title: "Speed Demon",
    description: "Completed Speed Mode 10 times",
    unlocked: true,
  },
  {
    icon: "🏆",
    title: "Perfect Score",
    description: "Got 100% in a challenge",
    unlocked: true,
  },
  {
    icon: "🧮",
    title: "Math Master",
    description: "Practice all 4 operations",
    unlocked: false,
  },
];

export default function ProfilePage() {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: achievementData } = useGetMyAchievementsQuery();
  // console.log("form my test", profileData);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profile_pic", file);

      await updateProfile(formData).unwrap();
      toast.success("Image uploaded successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error("Failed to update profile picture.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b mt-4 from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="text-gray-600" />
          </Link>
          <h1 className="text-gray-800 text-3xl font-bold font-Nunito">
            My Profile
          </h1>
        </div>

        {/* Subscription Card */}
        <SubscriptionCard />

        {/* User Info Card */}
        <div className="p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center relative">
          <div className="relative w-24 h-24 mb-4">
            {/* Avatar Circle */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={handleAvatarClick}
            >
              <Avatar className="w-24 h-24">
                {profileData?.data?.profile_pic ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${profileData?.data?.profile_pic}`}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 text-4xl font-semibold to-purple-500 text-white">
                    {profileData?.data?.name
                      ? profileData.data.name.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* Camera Icon Overlay */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 bg-white/50 hover:bg-white rounded-full flex justify-center items-center shadow-md cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Camera size={16} />
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <h2 className="text-gray-800 text-2xl font-bold font-Nunito">
            {profileData?.data?.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-700 text-lg font-semibold font-Nunito">
              Math Star Level {profileData?.data?.level}
            </span>
          </div>
          <p className="text-gray-600 mt-2 font-Nunito">
            Keep practicing to reach Level{" "}
            {`${(profileData?.data?.level ?? 0) + 1}`} !
          </p>
          <Link href="/dashboard/settings">
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
            <h3 className="text-gray-800 text-xl font-bold font-Nunito">
              Achievements
            </h3>
          </div>
          <div className="space-y-3">
            {achievementData?.data?.map((ach: Achievement) => {
              const unlocked = ach.progress >= ach.achievement_details.requirement; 
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border flex items-center gap-4 ${unlocked
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                >
                  <span className="text-2xl">{ach.achievement_details.icon}</span>
                  <div className="flex-1">
                    <p
                      className={`font-bold font-Nunito ${unlocked ? "text-green-800" : "text-gray-500"
                        }`}
                    >
                      {ach.achievement_details.name}
                    </p>
                    <p
                      className={`text-sm font-Nunito ${unlocked ? "text-green-600" : "text-gray-400"
                        }`}
                    >
                      {ach.achievement_details.description}
                    </p>
                  </div>
                  {unlocked && <Star className="fill-green-500 stroke-green-500" />}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
