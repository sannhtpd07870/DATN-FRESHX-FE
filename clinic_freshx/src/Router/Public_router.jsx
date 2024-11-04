import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Home from '../components/public/Home';
import Services from '../components/public/Services';
import About from '../components/public/About';
import Login from '../Page/public/login';
// import Contact from '../components/Public/Contact';
// import Appointment from '../components/Public/Appointment';

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="lien-he" element={<Contact />} />
        <Route path="dat-lich" element={<Appointment />} /> */}
      </Route>
    </Routes>
  );
};

export default PublicRouter ;