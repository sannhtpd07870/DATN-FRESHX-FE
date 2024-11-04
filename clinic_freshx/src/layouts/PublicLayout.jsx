import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
const PublicLayout = () => {

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default PublicLayout;