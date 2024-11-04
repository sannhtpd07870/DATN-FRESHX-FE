import {React,useContext,useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import { Box, useTheme, styled } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
//import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NightsStayTwoToneIcon from '@mui/icons-material/NightsStayTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DayBg from '../../assets/Image/day.jpg'
import NightBg from '../../assets/Image/night.jpg'
import ThemeTransition from './ThemeTransition';

const ToggleButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#757575' : '#b7b7b7',
  //backgroundImage: theme.palette.mode === 'dark' ? {NightBg} : {DayBg},
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  border: 'none',
  borderRadius: 30,
  padding: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  width: 60,
  height: 30,
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#aaaaaa' : '#888888',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 20,
  height: 20,
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#425782',
  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  position: 'absolute',
  left: theme.palette.mode === 'dark' ? 'calc(100% - 25px)' : '5px',
  transition: 'left 0.3s ease',
  
}));

const TextWrapper = styled(Box)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
});

const ThemeBottom = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const tooltipTitle = theme.palette.mode === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  const handleThemeToggle = () => {
    setIsThemeChanging(true);
    colorMode.toggleColorMode();

    setTimeout(() => {
      setIsThemeChanging(false);
    }, 1000); // Adjust this to match the transition duration
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 2,
        right: 20,
        zIndex: 1000,
      }}
      display="flex" justifyContent="flex-end" p={2}
    >
      <Tooltip title={tooltipTitle}>
        <ToggleButton onClick={handleThemeToggle}>
          <IconWrapper>
            {theme.palette.mode === 'dark' ? <NightsStayTwoToneIcon fontSize="small" /> : <LightModeTwoToneIcon fontSize="small" />}
          </IconWrapper>
          <TextWrapper>
            {/* Optional Text */}
          </TextWrapper>
          <ThemeTransition isThemeChanging={isThemeChanging}/>
        </ToggleButton>
      </Tooltip>      
    </Box>
  );
};

export default ThemeBottom;