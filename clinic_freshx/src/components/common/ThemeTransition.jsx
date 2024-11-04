import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const ThemeTransition = ({ children, isThemeChanging }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    console.log(isThemeChanging)
    if (isThemeChanging) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Match this with the transition duration (adjust as needed)

      return () => clearTimeout(timer); // Cleanup the timer
    }
    isThemeChanging = false;
  }, [isThemeChanging]);

  return (
    <Box
      sx={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateX(2%)' : 'translateX(0)',
        transition: 'opacity 0.8s ease, transform 1s ease',
      }}
    >
      {children}
    </Box>
  );
};

export default ThemeTransition;
