import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminDashboard from '../components/admin/AdminDashboard';
import CustomerRequest from '../Page/admin/Customer.jsx';
import DrugTypeTable from '../Page/admin/DrugType/DrugType.jsx';
// import UserManagement from '../components/admin/UserManagement';
// import AppointmentManagement from '../components/admin/AppointmentManagement';
// import ServiceManagement from '../components/admin/ServiceManagement';
// import ReportManagement from '../components/admin/ReportManagement';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
       <Route path="customer" element={<CustomerRequest />} />
       <Route path= "drugtype" element={<DrugTypeTable />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
