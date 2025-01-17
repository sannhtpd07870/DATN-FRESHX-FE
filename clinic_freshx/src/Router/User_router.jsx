import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout.jsx';
import UserDashboard from '../components/user/UserDashboard';
import AccountInfo from '../components/user/AccountInfo.jsx';
// import UserProfile from '../components/User/UserProfile';
// import UserAppointments from '../components/User/UserAppointments';
// import UserMedicalRecords from '../components/User/UserMedicalRecords';

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="profile" element=  {<AccountInfo/>}/>
        {/* <Route path="ho-so" element={<UserProfile />} />
        <Route path="lich-hen" element={<UserAppointments />} />
        <Route path="ho-so-y-te" element={<UserMedicalRecords />} /> */}
      </Route>
    </Routes>
  );
};

export default UserRouter;
