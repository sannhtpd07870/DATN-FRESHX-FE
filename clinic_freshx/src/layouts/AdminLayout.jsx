import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from "@mui/material";
import SideBar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import "./Admin.css"
import { useTheme } from '@mui/material/styles';

const AdminLayout = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box sx={{ 
    // height: "100vh",
     display: "flex", position: "relative"}}>
    <SideBar 
      isOpen={isSidebarOpen} 
      onClose={() => setIsSidebarOpen(false)} 
    />
    <Box sx={{ flex: 1 }}>
      <main className='admin-main' style={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0' }}>
      <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />
         <Outlet />
    </main>
    </Box>
  </Box>
  );
};

export default AdminLayout;
