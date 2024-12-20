import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from '../components/public/Navbar';
import Header from '../components/common/Header';
import Footer from '../components/common/footer';
const PublicLayout = () => {

  return (
    <div>
    <Header/>
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
  );
};

export default PublicLayout;