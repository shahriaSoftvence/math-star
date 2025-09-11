'use client';

import React, { useEffect } from 'react';
import { Check, Delete } from 'lucide-react';

type NumpadProps = {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
};

const Numpad = ({ onNumberClick, onBackspace, onSubmit }: NumpadProps) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  const playSound = (sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(() => {
        // Silently handle audio play failures
      });
    } catch (error) {
      // Silently handle audio creation failures
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for handled keys
      const handledKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'Enter'];
      if (handledKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Handle number keys (0-9)
      if (event.key >= '0' && event.key <= '9') {
        onNumberClick(event.key);
        playSound('/Sounds/Number-Click-sound.wav');
        return;
      }

      // Handle backspace/delete keys
      if (event.key === 'Backspace' || event.key === 'Delete') {
        onBackspace();
        playSound('/Sounds/delete-click-sound.wav');
        return;
      }

      // Handle enter key for submit
      if (event.key === 'Enter') {
        onSubmit();
        playSound('/Sounds/Check-Click-sound.wav');
        return;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNumberClick, onBackspace, onSubmit]);

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
            className="h-16 text-xl font-bold text-blue-800 bg-blue-100 rounded-lg transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => {
            onBackspace();
            playSound('/Sounds/delete-click-sound.wav');
          }}
          className="flex items-center justify-center h-16 text-lg font-bold text-red-800 bg-red-100 rounded-lg transition-colors hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <Delete size={24} />
        </button>
        <button
          onClick={() => {
            onNumberClick('0');
            playSound('/Sounds/Number-Click-sound.wav');
          }}
          className="h-16 text-xl font-bold text-blue-800 bg-blue-100 rounded-lg transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          0
        </button>
        <button
          onClick={() => {
            onSubmit();
            playSound('/Sounds/Check-Click-sound.wav');
          }}
          className="flex items-center justify-center h-16 text-xl font-bold text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};

export default Numpad;