import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message, DatePicker } from "antd";
import axios from "../../../services/axiosInstance";
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const Create = ({ isActive, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    medicalRecordNumber: "",
    admissionNumber: "",
    name: "",
    gender: "",
    dateOfBirth: null,
    phoneNumber: "",
    identityCardNumber: "",
    address: "",
    imageUrl: "",
    ethnicity: "",
    isDeleted: 0
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    console.log(`Field ${name} changed to:`, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Kiểm tra các trường bắt buộc
      if (!formData.medicalRecordNumber || !formData.name) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      const dataToSend = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? moment(formData.dateOfBirth).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : null,
        createdDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        updatedDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        isDeleted: Number(formData.isDeleted)
      };

      console.log("Data being sent:", dataToSend);

      const response = await axios.post("/api/patient", dataToSend);
      console.log("Response:", response.data);

      message.success("Tạo bệnh nhân thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      console.error("Error details:", err);
      message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo bệnh nhân.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mới bệnh nhân"
      visible={isActive}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Mã bệnh án" required>
          <Input
            placeholder="Nhập mã bệnh án"
            value={formData.medicalRecordNumber}
            onChange={(e) => handleChange("medicalRecordNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Số nhập viện">
          <Input
            placeholder="Nhập số nhập viện"
            value={formData.admissionNumber}
            onChange={(e) => handleChange("admissionNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Họ và tên" required>
          <Input
            placeholder="Nhập họ và tên"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
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
            <Option value="Khác">Khác</Option>
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

        <Form.Item label="Số điện thoại">
          <Input
            placeholder="Nhập số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="CMND/CCCD">
          <Input
            placeholder="Nhập số CMND/CCCD"
            value={formData.identityCardNumber}
            onChange={(e) => handleChange("identityCardNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ">
          <TextArea
            placeholder="Nhập địa chỉ"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            rows={3}
          />
        </Form.Item>

        <Form.Item label="Dân tộc">
          <Input
            placeholder="Nhập dân tộc"
            value={formData.ethnicity}
            onChange={(e) => handleChange("ethnicity", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Ảnh">
          <Input
            placeholder="Nhập đường dẫn ảnh"
            value={formData.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
          />
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