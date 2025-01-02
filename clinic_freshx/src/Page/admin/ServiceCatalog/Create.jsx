import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Checkbox } from "antd";
import axios from "../../../services/axiosInstance";

const { Option } = Select;
const Create = ({ isActive, onClose, onRefresh }) => {
 const [formData, setFormData] = useState({
   code: "",
   name: "",
   departmentId: 0,
   inventoryTypeId: 0,
   isSuspended: false,
   nameUnaccented: "",
   specialtyId: 0,
   costCenterId: 0,
   isSourceManagement: false
 });
  const [departments, setDepartments] = useState([]);
 const [inventoryTypes, setInventoryTypes] = useState([]);
 const [specialties, setSpecialties] = useState([]);
 const [costCenters, setCostCenters] = useState([]);
 const [loading, setLoading] = useState(false);
  // Fetch all necessary data when modal is opened
 useEffect(() => {
   if (isActive) {
     fetchDepartments();
     fetchInventoryTypes();
   }
 }, [isActive]);
  const fetchDepartments = async () => {
   try {
     const response = await axios.get("/api/department");
     console.log("department",response.data)
     setDepartments(response.data.data);
   } catch (err) {
     message.error("Không thể tải danh sách phòng ban");
   }
 };
  const fetchInventoryTypes = async () => {
   try {
     const response = await axios.get("/api/inventorytype");
     console.log("inventoryType",response)
     setInventoryTypes(response.data);
   } catch (err) {
     message.error("Không thể tải danh sách loại kho");
   }
 };
  const handleChange = (name, value) => {
   setFormData({ ...formData, [name]: value });
 };
  const handleSubmit = async () => {
   setLoading(true);
   try {
     // Validate required fields
     if (!formData.code || !formData.name) {
       throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
     }
      await axios.post("/api/pharmacy", formData);
     message.success("Tạo nhà thuốc thành công!");
     onClose();
     onRefresh();
   } catch (err) {
     message.error(err.message || "Đã xảy ra lỗi khi tạo nhà thuốc");
   } finally {
     setLoading(false);
   }
 };
  return (
   <Modal
     title="Tạo mới nhà thuốc"
     visible={isActive}
     onCancel={onClose}
     width={800}
     footer={null}
   >
     <Form layout="vertical">
       <Form.Item label="Mã nhà thuốc" required>
         <Input
           placeholder="Nhập mã nhà thuốc"
           value={formData.code}
           onChange={(e) => handleChange("code", e.target.value)}
         />
       </Form.Item>
        <Form.Item label="Tên nhà thuốc" required>
         <Input
           placeholder="Nhập tên nhà thuốc"
           value={formData.name}
           onChange={(e) => handleChange("name", e.target.value)}
         />
       </Form.Item>
        <Form.Item label="Phòng ban">
         <Select
           placeholder="Chọn phòng ban"
           value={formData.departmentId}
           onChange={(value) => handleChange("departmentId", value)}
         >
           {departments.map((dept) => (
             <Option key={dept.departmentId} value={dept.departmentId}>
               {dept.name}
             </Option>
           ))}
         </Select>
       </Form.Item>
        <Form.Item label="Loại kho">
         <Select
           placeholder="Chọn loại kho"
           value={formData.inventoryTypeId}
           onChange={(value) => handleChange("inventoryTypeId", value)}
         >
           {inventoryTypes.map((type) => (
             <Option key={type.inventoryTypeId} value={type.inventoryTypeId}>
               {type.name}
             </Option>
           ))}
         </Select>
       </Form.Item>
        <Form.Item>
         <Checkbox
           checked={formData.isSuspended}
           onChange={(e) => handleChange("isSuspended", e.target.checked)}
         >
           Tạm ngưng
         </Checkbox>
       </Form.Item>
        <Form.Item>
         <Checkbox
           checked={formData.isSourceManagement}
           onChange={(e) => handleChange("isSourceManagement", e.target.checked)}
         >
           Quản lý nguồn
         </Checkbox>
       </Form.Item>
        <Form.Item>
         <Button type="primary" onClick={handleSubmit} loading={loading}>
           Tạo mới
         </Button>
         <Button style={{ marginLeft: 8 }} onClick={onClose} disabled={loading}>
           Hủy
         </Button>
       </Form.Item>
     </Form>
   </Modal>
 );
};
export default Create;