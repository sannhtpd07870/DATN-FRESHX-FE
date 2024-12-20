import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import axios from "../../../services/axiosInstance";

const { Option } = Select;

const Create = ({ isActive, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    isSuspended: 0,
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
      // Kiểm tra dữ liệu bắt buộc
      if (!formData.code || !formData.name) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      const dataToSend = {
        ...formData,
        isSuspended: Number(formData.isSuspended),
        isDeleted: Number(formData.isDeleted)
      };

      console.log("Data being sent:", dataToSend);

      const response = await axios.post("/api/drugtype", dataToSend);
      console.log("Response:", response.data);

      message.success("Tạo loại thuốc thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      console.error("Error details:", err);
      message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo loại thuốc.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mới loại thuốc"
      visible={isActive}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item 
          label="Mã loại thuốc" 
          required
          rules={[{ required: true, message: 'Vui lòng nhập mã loại thuốc!' }]}
        >
          <Input
            placeholder="Nhập mã loại thuốc"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </Form.Item>

        <Form.Item 
          label="Tên loại thuốc" 
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên loại thuốc!' }]}
        >
          <Input
            placeholder="Nhập tên loại thuốc"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Select
            value={formData.isSuspended}
            onChange={(value) => handleChange("isSuspended", value)}
          >
            <Option value={0}>Hoạt động</Option>
            <Option value={1}>Tạm ngưng</Option>
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
