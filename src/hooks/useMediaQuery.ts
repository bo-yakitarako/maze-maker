import { useEffect, useRef, useState } from 'react';
import { BREAKPOINT } from '../modules/styleUtility';

const useMediaQuery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeTimer = useRef<number | null>(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    if (resizeTimer.current) {
      clearTimeout(resizeTimer.current);
    }
    resizeTimer.current = window.setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 300);
  };

  const isPc = () => windowWidth > BREAKPOINT.MEDIUM;
  const isTablet = () =>
    BREAKPOINT.SMALL < windowWidth && windowWidth < BREAKPOINT.MEDIUM;
  const isSp = () => windowWidth < BREAKPOINT.SMALL;
  const isSpSmall = () => windowWidth < BREAKPOINT.TINY;
  return { windowWidth, isPc, isTablet, isSp, isSpSmall };
};

export { useMediaQuery };
