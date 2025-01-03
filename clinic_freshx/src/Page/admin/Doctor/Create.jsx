import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message, DatePicker } from "antd";
import axios from "../../../services/axiosInstance";
import moment from 'moment';

const { Option } = Select;
const Create = ({ isActive, onClose, onRefresh }) => {
 const [formData, setFormData] = useState({
   name: "",
   specialty: "",
   phone: "",
   email: "",
   gender: "",
   dateOfBirth: null,
   isSuspended: 0
 });
  const [loading, setLoading] = useState(false);
  const handleChange = (name, value) => {
   setFormData({ ...formData, [name]: value });
 };
  const handleSubmit = async () => {
   setLoading(true);
   try {
     // Kiểm tra các trường bắt buộc
     if (!formData.name || !formData.specialty || !formData.phone || !formData.email) {
       throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
     }
      const dataToSend = {
       ...formData,
       dateOfBirth: formData.dateOfBirth ? moment(formData.dateOfBirth).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : null,
       isSuspended: Number(formData.isSuspended)
     };
      const response = await axios.post("/api/doctor", dataToSend);
      if (response.data.status) {
       message.success("Tạo bác sĩ thành công!");
       onClose();
       onRefresh();
     } else {
       throw new Error(response.data.message || "Tạo bác sĩ thất bại");
     }
   } catch (err) {
     console.error("Error:", err);
     message.error(err.message || "Đã xảy ra lỗi khi tạo bác sĩ");
   } finally {
     setLoading(false);
   }
 };
  return (
   <Modal
     title="Tạo mới bác sĩ"
     visible={isActive}
     onCancel={onClose}
     width={800}
     footer={null}
   >
     <Form layout="vertical">
       <Form.Item label="Họ và tên" required>
         <Input
           placeholder="Nhập họ và tên"
           value={formData.name}
           onChange={(e) => handleChange("name", e.target.value)}
         />
       </Form.Item>
        <Form.Item label="Chuyên khoa" required>
         <Input
           placeholder="Nhập chuyên khoa"
           value={formData.specialty}
           onChange={(e) => handleChange("specialty", e.target.value)}
         />
       </Form.Item>
        <Form.Item label="Số điện thoại" required>
         <Input
           placeholder="Nhập số điện thoại"
           value={formData.phone}
           onChange={(e) => handleChange("phone", e.target.value)}
         />
       </Form.Item>
        <Form.Item label="Email" required>
         <Input
           placeholder="Nhập email"
           value={formData.email}
           onChange={(e) => handleChange("email", e.target.value)}
           type="email"
         />
       </Form.Item>
        <Form.Item label="Giới tính">
         <Select
           placeholder="Chọn giới tính"
           value={formData.gender}
           onChange={(value) => handleChange("gender", value)}
         >
           <Option value="Nam">Nam</Option>
           <Option value="Nữ">Nữ</Option>
         </Select>
       </Form.Item>
        <Form.Item label="Ngày sinh">
         <DatePicker
           style={{ width: '100%' }}
           value={formData.dateOfBirth ? moment(formData.dateOfBirth) : null}
           onChange={(date) => handleChange("dateOfBirth", date)}
           format="DD/MM/YYYY"
         />
       </Form.Item>
        <Form.Item label="Trạng thái">
         <Select
           placeholder="Chọn trạng thái"
           value={formData.isSuspended}
           onChange={(value) => handleChange("isSuspended", value)}
         >
           <Option value={0}>Hoạt động</Option>
           <Option value={1}>Tạm ngừng</Option>
         </Select>
       </Form.Item>
        <Form.Item>
         <Button type="primary" onClick={handleSubmit} loading={loading}>
           Tạo mới
         </Button>
         <Button style={{ marginLeft: 8 }} onClick={onClose}>
           Hủy
         </Button>
       </Form.Item>
     </Form>
   </Modal>
 );
};
export default Create;