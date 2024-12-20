import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import axios from "../../../services/axiosInstance";

const { Option } = Select;

const Create = ({ isActive, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    departmentTypeId: 0,
    isSuspended: 0,
  });
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách DocumentType
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get("/api/departmenttype"); // Thay đổi endpoint theo backend
        setDocumentTypes(response.data.data);
      } catch (err) {
        message.error("Không thể tải danh sách loại tài liệu.");
      }
    };

    if (isActive) fetchDocumentTypes();
  }, [isActive]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/department", formData);
      message.success("Tạo phòng ban thành công!");
      onClose(); // Đóng modal sau khi thành công
      onRefresh(); // Cập nhật lại dữ liệu
    } catch (err) {
      message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo phòng ban.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo phòng ban"
      visible={isActive}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Mã phòng ban" name="code" required>
          <Input
            placeholder="Nhập mã phòng ban"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Tên phòng ban" name="name" required>
          <Input
            placeholder="Nhập tên phòng ban"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Loại phòng ban" name="departmentTypeId" required>
          <Select
            placeholder="Chọn loại phòng ban"
            value={formData.departmentTypeId}
            onChange={(value) => handleChange("departmentTypeId", value)}
          >
            {documentTypes.map((type) => (
              <Option key={type.departmentTypeId} value={type.departmentTypeId}>
                {type.name}
              </Option>
            ))}
          </Select>
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
