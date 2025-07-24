// src/app/settings/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCircle, Edit, Bell, LockKeyhole, Save } from 'lucide-react';

// A simple toggle switch component
const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 ease-in-out ${
        isEnabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isEnabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Emma Johnson',
    email: 'emma@example.com',
    grade: '5th Grade'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log('Saved:', userInfo);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="text-gray-600" />
          </Link>
          <h1 className="text-gray-800 text-3xl font-bold font-Nunito">Settings</h1>
        </div>

        {/* Main Settings Container */}
        <div className="flex flex-col gap-6">
          {/* Personal Information */}
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <UserCircle className="text-blue-500" size={24} />
                <h2 className="text-gray-800 text-xl font-bold font-Nunito">Personal Information</h2>
              </div>
              <button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-[#000] font-medium hover:bg-slate-100"
              >
                {isEditing ? <Save size={16} /> : <Edit size={16} />}
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2.5 bg-white text-slate-950 rounded-md border border-slate-200 font-Nunito"
                  />
                ) : (
                  <input
                    type="text"
                    value={userInfo.name}
                    disabled
                    className="w-full h-10 px-3 py-2.5 bg-gray-50 text-slate-950 rounded-md border border-slate-200 cursor-not-allowed font-Nunito"
                  />
                )}
              </div>
              
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2.5 bg-white text-slate-950 rounded-md border border-slate-200 font-Nunito"
                  />
                ) : (
                  <input
                    type="text"
                    value={userInfo.email}
                    disabled
                    className="w-full h-10 px-3 py-2.5 bg-gray-50 text-slate-950 rounded-md border border-slate-200 cursor-not-allowed font-Nunito"
                  />
                )}
              </div>
              
              {/* Grade Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                  Grade
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="grade"
                    value={userInfo.grade}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2.5 bg-white text-slate-950 rounded-md border border-slate-200 font-Nunito"
                  />
                ) : (
                  <input
                    type="text"
                    value={userInfo.grade}
                    disabled
                    className="w-full h-10 px-3 py-2.5 bg-gray-50 text-slate-950 rounded-md border border-slate-200 cursor-not-allowed font-Nunito"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="p-6 bg-white rounded-3xl shadow-lg flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Bell className="text-blue-500" size={24} />
              <div>
                <h3 className="text-gray-800 text-base font-bold font-Nunito">Push Notifications</h3>
                <p className="text-gray-600 text-sm font-Nunito">Receive practice reminders and updates</p>
              </div>
            </div>
            <ToggleSwitch />
          </div>

          {/* Change Password */}
          <div className="p-6 bg-white rounded-3xl shadow-lg">
             <div className="flex items-center gap-2 mb-4">
                <LockKeyhole className="text-blue-500" size={24} />
                <h2 className="text-gray-800 text-xl font-bold font-Nunito">Change Password</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full h-10 px-3 py-2.5 bg-slate-50 rounded-md border border-slate-200 placeholder-slate-500 font-Nunito"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full h-10 px-3 py-2.5 bg-slate-50 rounded-md border border-slate-200 placeholder-slate-500 font-Nunito"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-Nunito mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full h-10 px-3 py-2.5 bg-slate-50 rounded-md border border-slate-200 placeholder-slate-500 font-Nunito"
                  />
                </div>
                <button className="w-full h-10 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  Change Password
                </button>
              </div>
          </div>

          {/* About */}
          <div className="p-6 bg-white rounded-3xl shadow-lg font-Nunito">
            <h3 className="text-gray-800 text-base font-bold mb-2">About Math Star</h3>
            <p className="text-gray-600 text-sm">Version 1.0.0</p>
            <p className="text-gray-600 text-sm">Made with ❤️ for learning</p>
          </div>
        </div>
      </div>
    </div>
  );
}