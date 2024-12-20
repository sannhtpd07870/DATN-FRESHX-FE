import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "../../../services/axiosInstance";

const Create = ({ isActive, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: ""
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

      console.log("Data being sent:", formData);

      const response = await axios.post("/api/inventorytype", formData);
      console.log("Response:", response.data);

      message.success("Tạo loại kho thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      console.error("Error details:", err);
      message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo loại kho.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mới loại kho"
      visible={isActive}
      onCancel={onClose}
      width={500}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item 
          label="Mã loại kho" 
          required
          rules={[{ required: true, message: 'Vui lòng nhập mã loại kho!' }]}
        >
          <Input
            placeholder="Nhập mã loại kho"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </Form.Item>

        <Form.Item 
          label="Tên loại kho" 
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên loại kho!' }]}
        >
          <Input
            placeholder="Nhập tên loại kho"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
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