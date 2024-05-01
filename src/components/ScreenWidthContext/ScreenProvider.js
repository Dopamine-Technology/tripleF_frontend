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
  const [isTabletGalaxyScreen, setIsTabletGalaxyScreen] = useState(
    windowWidth > 1025 && windowWidth <= 1170
  );
  const [isMacTablet, setIsMacTablet] = useState(
    windowWidth > 1170 && windowWidth <= 1366
  );



  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsSmallScreen(newWidth <= 600);
      setIsTabletScreen(newWidth > 600 && newWidth <= 820);
      setIsProScreen(newWidth > 820 && newWidth <= 1025);
      setIsTabletGalaxyScreen(newWidth > 1025 && newWidth <= 1170)
      setIsMacTablet(newWidth > 1170 && newWidth <= 1366)
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
        isProScreen,
        isTabletGalaxyScreen,
        isMacTablet
      }}
    >
      {children}
    </ScreenWidthContext.Provider>
  );
};

export default ScreenProvider;
