'use client';

import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface StarProps {
  id: number;
  left: number;
  size: number;
  duration: number;
  onComplete: (id: number) => void;
}

const Star = ({ id, left, size, duration, onComplete }: StarProps) => {
  useEffect(() => { 
    const timer = setTimeout(() => {
      onComplete(id);
    }, duration * 1000 + 1000); // Remove after animation + 1s buffer
    return () => clearTimeout(timer);
  }, [id, duration, onComplete]);

  return (
    <motion.div
      className="absolute text-yellow-300"
      initial={{ top: '-10%', x: left, rotate: 0 }}
      animate={{ top: '110%', rotate: 360 }}
      transition={{ duration, ease: 'linear' }}
      style={{ left: `${left}%` }}
    >
      <FaStar size={size} style={{ textShadow: '0 0 5px #fff, 0 0 20px #fff' }} />
    </motion.div>
  );
};

interface StarConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  onComplete: (id: number) => void;
}

export default function FallingStars() {
  const [stars, setStars] = useState<StarConfig[]>([]);

  useEffect(() => {
    const handleRemoveStar = (id: number) => {
      setStars((prev) => prev.filter((star) => star.id !== id));
    };

    const starGenerator = setInterval(() => {
      setStars((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 15 + 5,
          duration: Math.random() * 5 + 5, // Slower, more majestic fall
          onComplete: handleRemoveStar,
        },
      ]);
    }, 200); // Generate a star every 200ms

    return () => clearInterval(starGenerator);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
      {stars.map(({ id, ...props }) => (
        <Star key={id} id={id} {...props} />
      ))}
    </div>
  );
}