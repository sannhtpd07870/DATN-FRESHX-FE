import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminDashboard from '../components/admin/AdminDashboard';
import CustomerRequest from '../Page/admin/Customer.jsx';
import DrugTypeTable from '../Page/admin/DrugType/DrugType.jsx';
import DoctorTable from '../Page/admin/Doctor/Doctor.jsx';
import DepartmentType from '../Page/admin/DepartmentType/DepartmentType.jsx';
import Department from '../Page/admin/Department/Department.jsx';
import DrugCatalog from '../Page/admin/DrugCatalog/DrugCatalog.jsx';
import Supplier from '../Page/admin/Supplier/Supplier.jsx'
import UnitOfMeasure from "../Page/admin/UnitOfMeasure/UnitOfMeasure.jsx"
import ServiceGroup from "../Page/admin/ServiceGroup/ServiceGroup.jsx"
import InventoryType from "../Page/admin/InventoryType/InventoryType.jsx"
import Receptionist from "../Page/admin/Receptionist/Receptionist.jsx"
import Patient from "../Page/admin/Patient/Patient.jsx"
import Pharmacy from '../Page/admin/Pharmacy/Pharmacy.jsx';

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
       <Route path="doctor" element={<DoctorTable />} />
       <Route path="departmenttype" element={<DepartmentType />} />
       <Route path="department" element={<Department />} /> 
       <Route path="drugcatalog" element={<DrugCatalog/>}/>
       <Route path="supplier" element={<Supplier/>}/>
       <Route path="unitofmeasure" element= {<UnitOfMeasure/>}/>
       <Route path="servicegroup" element={<ServiceGroup/>}/>
       <Route path="inventorytype" element={<InventoryType/>}/>
       <Route path="receptionist" element={<Receptionist/>}/> 
      <Route path="patient" element={<Patient/>}/>
      <Route path="pharmacy" element={<Pharmacy/>}/>
     
      </Route>
    </Routes>
  );
};

export default AdminRouter;
