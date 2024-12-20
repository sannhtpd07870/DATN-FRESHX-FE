import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Home from '../Page/public/Home';
import Specialty from '../Page/public/specialty.jsx';
import Medical from '../Page/public/Medical.jsx';
import About from '../Page/public/About.jsx';
import Doctor from '../Page/public/Doctor.jsx';
import Book from '../Page/public/Book.jsx';
import Login from '../Page/auth/Login';
import Blog from '../Page/public/Blog.jsx';
import Chat from '../Page/public/Chat.jsx';
// import Contact from '../components/Public/Contact';
// import Appointment from '../components/Public/Appointment';

const PublicRouter = () => {
  return (
    <Routes>
       <Route path='chat' element = {<Chat/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="specialty" element = {<Specialty/>}/>
        <Route path="medical" element = {<Medical/>}/>
        <Route path="about" element ={<About/>}/>
        <Route path="chuyen-gia-y-te" element ={<Doctor/> }/>
        <Route path="book" element ={<Book/>}/>
        <Route path="blog" element = {<Blog/>}/>
       
      </Route>
    </Routes>
  );
};

export default PublicRouter ;