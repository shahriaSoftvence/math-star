"use client";

import PracticeCard from "@/components/PracticeCard";
import { Plus, Minus, X, Divide, Star, ShieldAlert } from "lucide-react";
import { IoStarSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useIsPremium } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/auth/authApi";
import rewardsBadge from "@/asset/images/rewards.png";
import LoadingFile from "@/asset/loader.svg";
import { useGetProgressQuery } from "@/Redux/features/reward/rewardApi";
import { useDictionary } from "@/hook/useDictionary";

export default function Home() {
  const isPremium = useIsPremium();
  const lang = localStorage.getItem("mathstar-language") || "en";
  const { data: summary, isLoading, isError } = useGetProgressQuery(lang);
  
  const progress = summary?.data?.progress_today;
  const activities = summary?.data?.recent_activities;
  const { data } = useGetProfileQuery();

  const { dictionary, loading } = useDictionary();
  const dashboard = dictionary?.dashboard;
  const practice_section = dashboard?.practice_section;
  const star_balance = dashboard?.star_balance;
  const progress_section = dashboard?.progress_section;
  const activity_section = dashboard?.activity_section;

  if (
    !dashboard ||
    loading ||
    !practice_section ||
    !progress_section ||
    !star_balance ||
    !activity_section
  ) {
    return null;
  }

  const practiceItems = [
    {
      link: "/dashboard/addition",
      icon: <Plus />,
      name: practice_section.addition.title,
      title: "Practice Addition",
      description: practice_section.addition.description,
      bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-400",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-500",
    },
    {
      link: "/dashboard/subtraction",
      icon: <Minus />,
      name: practice_section.subtraction.title,
      title: "Practice Subtraction",
      description: practice_section.subtraction.description,
      bgColor: "bg-gradient-to-br from-pink-300 to-pink-400",
      textColor: "text-pink-800",
      iconColor: "text-pink-500",
    },
    {
      link: "/dashboard/multiplication",
      icon: <X />,
      name: practice_section.multiplication.title,
      title: "Practice Multiplication",
      description: practice_section.multiplication.description,
      bgColor: "bg-gradient-to-br from-green-300 to-green-400",
      textColor: "text-green-800",
      iconColor: "text-green-500",
    },
    {
      link: "/dashboard/division",
      icon: <Divide />,
      name: practice_section.division.title,
      title: "Practice Division",
      description: practice_section.division.description,
      bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
      textColor: "text-purple-800",
      iconColor: "text-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center my-12" role="status">
        <LoadingFile className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
        <span className="sr-only">{dashboard.loading}</span>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="text-red-500 flex justify-center my-12 text-lg font-medium">
        <ShieldAlert className="mr-2" />
        {dashboard.error_message}
      </div>
    );
  }

  return (
    <div className="space-y-8 my-8 max-w-[1104px] mx-auto px-4">
      {/* Choose Your Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-4">
        {practiceItems.map((item, index) => {
          // Only allow click if user has subscription or it's the Addition card
          const isActive = isPremium || item.link === "/dashboard/addition";

          return (
            <Link
              href={isActive ? item.link : "/dashboard/subscription"}
              key={index}
              className={`relative block rounded-2xl overflow-hidden shadow-md ${
                isActive
                  ? "cursor-pointer hover:scale-105 transition-transform"
                  : "opacity-25 cursor-not-allowed"
              }`}
            >
              <PracticeCard {...item} />
            </Link>
          );
        })}
      </div>

      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-6 text-gray-800">
            {progress_section?.title}
          </h3>
          <div className="space-y-7">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {progress_section?.practice_time}
              </span>
              <span className="font-medium text-[#2563EB]">
                {progress?.practice_time_minutes} {progress_section?.minutes}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {progress_section?.stars_earned}
              </span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span className="text-[#2563EB]">{progress?.stars_earned}</span>
                <Star size={16} className="ml-1 fill-[#EAB308]" />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {progress_section?.best_challenge_score}
              </span>
              <span className="font-medium text-green-500">
                🏆 {progress?.best_challenge_score}
              </span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">
                  {progress_section?.daily_goal_progress}
                </span>
                <span className="font-medium text-gray-800">
                  {progress?.daily_goal_progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                  style={{ width: `${progress?.daily_goal_progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-6 text-gray-800">
            {activity_section?.title}
          </h3>
          <div className="space-y-2">
            {summary?.data?.recent_activities_count > 0 ? (
              activities?.map((activity, idx) => (
                <div
                  className="bg-[#f5f5f5] p-3 rounded-lg text-sm flex justify-between items-center"
                  key={idx}
                >
                  <p className="text-sidebar-primary">
                    {activity?.description}
                  </p>
                  <span className="flex items-center gap-1">
                    <Star size={20} className="fill-[#EAB308] stroke-0" />
                    <span className="text-[#eab308] font-semibold text-base">
                      {String(activity?.stars).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                {activity_section?.no_activity}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <Link href="/dashboard/rewards">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 sm:p-6 rounded-2xl text-white flex justify-between items-center gap-4 shadow-xl flex-wrap">
          {/* Left Section */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-semibold text-lg sm:text-xl md:text-3xl">
              {star_balance.title}
            </h3>

            <p className="text-3xl sm:text-4xl md:text-5xl font-bold my-2 flex items-center gap-2">
              <IoStarSharp className="shrink-0" />{" "}
              {data?.data?.star?.toLocaleString() || 0}
            </p>

            <p className="text-xs sm:text-sm md:text-base font-normal sm:font-medium opacity-90">
              {star_balance.top_up_message}
            </p>
          </div>

          {/* Right Section */}
          <div className="flex justify-end flex-shrink-0">
            <Image
              className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 object-contain"
              src={
                data?.data?.reward?.icon
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${data?.data?.reward?.icon}`
                  : rewardsBadge
              }
              alt="Badge"
              width={120}
              height={120}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
