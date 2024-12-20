import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import axios from "../../../services/axiosInstance";

const Create = ({ isActive, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
      code: "",
      name: "",
      isSuspended: 0
    });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await axios.post("/api/departmenttype", formData);
        message.success("Tạo loại phòng ban thành công!");
        onClose();
        onRefresh();
      } catch (err) {
        message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo loại phòng ban.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal
        title="Tạo loại phòng ban"
        visible={isActive}
        onCancel={onClose}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Mã loại phòng ban" name="code" required>
            <Input
              placeholder="Nhập mã loại phòng ban"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Tên loại phòng ban" name="name" required>
            <Input
              placeholder="Nhập tên loại phòng ban"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Tình trạng" name="isSuspended" required>
            <Select
              placeholder="Chọn tình trạng"
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
            <Button style={{ marginLeft: "8px" }} onClick={onClose} disabled={loading}>
              Hủy bỏ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  export default Create;