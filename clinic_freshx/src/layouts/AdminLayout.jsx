import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from "@mui/material";
import SideBar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box sx={{ height: "100vh", display: "flex", position: "relative", backgroundColor:"f8f8f8" }}>
    <SideBar 
      isOpen={isSidebarOpen} 
      onClose={() => setIsSidebarOpen(false)} 
    />
    <Box sx={{ flex: 1 }}>
      <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main >
         <Outlet />
    </main>
    </Box>
  </Box>
  );
};

export default AdminLayout;
