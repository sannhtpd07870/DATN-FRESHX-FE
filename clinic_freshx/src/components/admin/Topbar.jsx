import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import imageProfile from "../../assets/user.png";
import Typography from "@mui/material/Typography";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InputBase from "@mui/material/InputBase";
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';  
import { 
  Box, 
  IconButton, 
  useTheme, 
  Menu, 
  MenuItem, 
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText 
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import useAuthService from "../../services/authService";
import { ColorModeContext, tokens } from "../../theme";
import './Topbar.css';

const Topbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const tooltipTitle = theme.palette.mode === 'dark' ? 'Set theme to Light' : 'Set theme to Dark';
  const { getLogout } = useAuthService();
  const navigate = useNavigate();
 
  // Thêm state cho menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const userLogout = await getLogout();
    if (userLogout) {
      handleClose();
      navigate('/login');
    }
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const toggleSidebar = () => {
    console.log('toggleSidebar');
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const userDataCookie = Cookies.get('userData');
    if (userDataCookie) {
      setUserData(JSON.parse(userDataCookie));
    }
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={2} className="topbar">
      <Box className="mobile-menu">
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* <Box
        className="topbar-search"
        backgroundColor={colors.primary[400]}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}


      <Box className="topbar-actions">
        <Tooltip title={tooltipTitle}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Account settings">
          <Box 
            className="user-profile"
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar 
              alt="User Avatar" 
              src={""}
              className="user-avatar"
            />
            <Box className="user-info">
              <Typography variant="body2" className="user-role">
                {userData?.userRole || 'Role'}
              </Typography>
              <Typography variant="subtitle" className="user-name">
                {userData?.userName || 'User Name'}
              </Typography>
            </Box>
            <Box className="arrow-icon">
              {open ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </Box>
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
        >
          <MenuItem className="menu-item" onClick={handleProfile}>
            <ListItemIcon className="menu-item-icon">
              <PersonOutlineOutlinedIcon  />
            </ListItemIcon>
            <ListItemText>Thông tin cá nhân</ListItemText>
          </MenuItem>

          <MenuItem className="menu-item" onClick={handleSettings}>
            <ListItemIcon className="menu-item-icon">
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cài đặt tài khoản</ListItemText>
          </MenuItem>

          <Divider className="menu-divider" />

          <MenuItem className="menu-item" onClick={handleLogout}>
            <ListItemIcon className="menu-item-icon">
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;