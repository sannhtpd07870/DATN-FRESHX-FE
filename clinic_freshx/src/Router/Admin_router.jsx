import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminDashboard from '../components/admin/AdminDashboard';
// import UserManagement from '../components/admin/UserManagement';
// import AppointmentManagement from '../components/admin/AppointmentManagement';
// import ServiceManagement from '../components/admin/ServiceManagement';
// import ReportManagement from '../components/admin/ReportManagement';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        {/* <Route path="users" element={<UserManagement />} />
        <Route path="appointments" element={<AppointmentManagement />} />
        <Route path="services" element={<ServiceManagement />} />
        <Route path="reports" element={<ReportManagement />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRouter;
