'use client';
import { useEffect, useState } from 'react';
import { ScreenSize } from '../types/types';

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 767) return ScreenSize.MOBILE;
      if (width < 1080) return ScreenSize.TABLET;
      if (width < 1280) return ScreenSize.DESKTOP_SMALL;
      if (width < 1440) return ScreenSize.DESKTOP_NORMAL;
      return ScreenSize.DESKTOP;
    }
    return ScreenSize.DESKTOP;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 767) {
        setScreenSize(ScreenSize.MOBILE);
      } else if (width < 1080) {
        setScreenSize(ScreenSize.TABLET);
      } else if (width < 1280) {
        setScreenSize(ScreenSize.DESKTOP_SMALL);
      } else if (width < 1440) {
        setScreenSize(ScreenSize.DESKTOP_NORMAL);
      } else {
        setScreenSize(ScreenSize.DESKTOP);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
