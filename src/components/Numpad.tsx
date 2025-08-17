'use client';

import React from 'react';
import { Check, Delete } from 'lucide-react';

type NumpadProps = {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
};

const Numpad = ({ onNumberClick, onBackspace, onSubmit }: NumpadProps) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              onNumberClick(btn);
              playSound('/Sounds/Number-Click-sound.wav');
            }}
            className="h-16 text-xl font-bold text-blue-800 bg-blue-100 rounded-lg transition-colors hover:bg-blue-200"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => {
            onBackspace();
            playSound('/Sounds/delete-click-sound.wav');
          }}
          className="flex items-center justify-center h-16 text-lg font-bold text-red-800 bg-red-100 rounded-lg transition-colors hover:bg-red-200"
        >
          <Delete size={24} />
        </button>
        <button
          onClick={() => {
            onNumberClick('0');
            playSound('/Sounds/Number-Click-sound.wav');
          }}
          className="h-16 text-xl font-bold text-blue-800 bg-blue-100 rounded-lg transition-colors hover:bg-blue-200"
        >
          0
        </button>
        <button
          onClick={() => {
            onSubmit();
            playSound('/Sounds/Check-Click-sound.wav');
          }}
          className="flex items-center justify-center h-16 text-xl font-bold text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200"
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};

export default Numpad;