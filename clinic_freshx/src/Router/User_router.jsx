import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../layouts/userLayout.jsx';
import UserDashboard from '../components/user/UserDashboard';
// import UserProfile from '../components/User/UserProfile';
// import UserAppointments from '../components/User/UserAppointments';
// import UserMedicalRecords from '../components/User/UserMedicalRecords';

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        {/* <Route path="ho-so" element={<UserProfile />} />
        <Route path="lich-hen" element={<UserAppointments />} />
        <Route path="ho-so-y-te" element={<UserMedicalRecords />} /> */}
      </Route>
    </Routes>
  );
};

export default UserRouter;
