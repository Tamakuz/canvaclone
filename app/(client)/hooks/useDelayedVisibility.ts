'use client';
import { useState, useEffect } from 'react';

export const useDelayedVisibility = (delay: number): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};
