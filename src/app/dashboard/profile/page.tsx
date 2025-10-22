"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Award,
  Star,
  Camera,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/Redux/features/auth/authApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useGetAchievementQuery } from "@/Redux/features/reward/rewardApi";
import { Achievement } from "../../../../type/progress";
import { useDictionary } from "@/hook/useDictionary";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: achievementData } = useGetAchievementQuery();
  // console.log("form my test", profileData);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const [showAll, setShowAll] = useState(false);

  const achievements = achievementData?.data || [];
  const visibleAchievements = showAll ? achievements : achievements.slice(0, 4);

  const { dictionary, loading } = useDictionary();
  const profile = dictionary?.profile;
  const user_info = profile?.user_info;
  const achievement = profile?.achievements;
  const notifications = profile?.notifications;

  if (!profile || !user_info || !achievement || !notifications || loading) {
    return null;
  }


  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profile_pic", file);

      await updateProfile(formData).unwrap();
      toast.success(notifications.image_upload_success);
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error(notifications.image_upload_error);
    }
  };


  return (
    <div className="w-full min-h-screen mt-4  p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="text-gray-600" />
          </Link>
          <h1 className="text-gray-800 text-3xl font-bold font-Nunito">
            {profile.page_title}
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

          {profileData?.data?.level && profileData?.data?.level < 26 ?
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mt-1">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-700 text-lg font-semibold font-Nunito">
                  {user_info?.math_star_level.replace("{level}", `${profileData?.data?.level}`)}
                </span>
              </div>
              <p className="text-gray-600 mt-2 font-Nunito">
                {user_info?.keep_practicing.replace("{nextLevel}", `${(profileData?.data?.level ?? 0) + 1}`)}
              </p>
            </div>
            :
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mt-1">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-700 text-lg font-semibold font-Nunito">
                  Math Star Millionaire
                </span>
              </div>
              <p className="text-gray-600 mt-2 font-Nunito">
                {profile?.user_info?.math_star_millionaire}
              </p>
            </div>
          }

          <Link href="/dashboard/settings">
            <button className="flex items-center gap-2 mt-4 cursor-pointer text-blue-600 hover:text-blue-700 font-Nunito">
              <Edit size={16} />
              <span>{user_info?.edit_profile}</span>
            </button>
          </Link>
        </div>

        {/* Achievements Card */}
        <div className="p-6 bg-white rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Award size={24} className="text-yellow-500" />
            <h3 className="text-gray-800 text-xl font-bold font-Nunito">
              {achievement?.title}
            </h3>
          </div>
          <div className="space-y-4">
            {visibleAchievements?.map((ach: Achievement) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl border flex items-center gap-4 bg-green-50 border-green-200"
              >
                <span className="text-2xl">{ach.achievement_details.icon}</span>
                <div className="flex-1">
                  <p className="font-bold font-Nunito text-green-800">
                    {ach.achievement_details.name}
                  </p>
                  <p className="text-sm font-Nunito text-green-800">
                    {ach.achievement_details.description}
                  </p>
                </div>
                <Star className="fill-green-500 stroke-green-500" />
              </div>
            ))}

            {achievements.length > 4 && (
              <div className="flex justify-end">
                <Button variant={"link"}
                  onClick={() => setShowAll(!showAll)}
                  className="text-green-700 font-semibold"
                >
                  {showAll ? (
                    <>
                      {achievement?.see_less} <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      {achievement?.see_more} <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
