import React, { useState, useEffect } from 'react';
import ScreenWidthContext from './ScreenWidth.context';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const ScreenProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(windowWidth <= 600);
  const [isTabletScreen, setIsTabletScreen] = useState(
    windowWidth > 600 && windowWidth <= 820
  );
  const [isProScreen, setIsProScreen] = useState(
    windowWidth > 820 && windowWidth <= 1025
  );

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsSmallScreen(newWidth <= 600);
      setIsTabletScreen(newWidth > 600 && newWidth <= 820);
      setIsProScreen(newWidth > 820 && newWidth <= 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ScreenWidthContext.Provider
      value={{
        windowWidth,
        isSmallScreen,
        isTabletScreen,
        isProScreen
      }}
    >
      {children}
    </ScreenWidthContext.Provider>
  );
};

export default ScreenProvider;
