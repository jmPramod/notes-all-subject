"use client";
import React, { useEffect, useState } from "react";

interface ChangeWordsProps {
  words: string[];
  duration: number;
}

export const ChangeWords: React.FC<ChangeWordsProps> = ({
  words,
  duration,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <span className="transition-transform duration-500 text-8xl">
      {words[currentWordIndex]}
    </span>
  );
};
