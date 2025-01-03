import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, DatePicker } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";
import Create from './Create';
import moment from 'moment';

const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
  const [formData, setFormData] = useState({
    name: record.name,
    specialty: record.specialty,
    phone: record.phone,
    email: record.email,
    gender: record.gender,
    dateOfBirth: record.dateOfBirth,
    isSuspended: record.isSuspended
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        ...record,
        ...formData
      };
      await onSave(updatedData);
      setIsEditing(false);
    } catch (error) {
      message.error('Cập nhật không thành công!');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingRecord(null);
  };

  return (
    <div>
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <strong>Tên bác sĩ:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              record.name
            )}
          </Col>
          <Col span={12}>
            <strong>Chuyên khoa:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Input
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
              />
            ) : (
              record.specialty
            )}
          </Col>
          <Col span={12}>
            <strong>Số điện thoại:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            ) : (
              record.phone
            )}
          </Col>
          <Col span={12}>
            <strong>Email:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            ) : (
              record.email
            )}
          </Col>
          <Col span={12}>
            <strong>Giới tính:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Select
                value={formData.gender}
                onChange={(value) => handleInputChange('gender', value)}
                style={{ width: '100%' }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            ) : (
              record.gender
            )}
          </Col>
          <Col span={12}>
            <strong>Ngày sinh:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <DatePicker
                value={moment(formData.dateOfBirth)}
                onChange={(date) => handleInputChange('dateOfBirth', date.toISOString())}
                style={{ width: '100%' }}
              />
            ) : (
              moment(record.dateOfBirth).format('DD/MM/YYYY')
            )}
          </Col>
          <Col span={12}>
            <strong>Trạng thái:</strong>{' '}
            {editingRecord?.doctorId === record.doctorId ? (
              <Select
                value={formData.isSuspended}
                onChange={(value) => handleInputChange('isSuspended', value)}
                style={{ width: '100%' }}
              >
                <Option value={0}>Hoạt động</Option>
                <Option value={1}>Tạm ngừng</Option>
              </Select>
            ) : (
              record.isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng'
            )}
          </Col>
          <Col span={24}>
            <Button 
              type="primary" 
              onClick={handleSaveClick}
              disabled={!isEditing}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Button>
            <Button 
              onClick={handleCancel} 
              disabled={!isEditing}
            >
              Thoát
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const DoctorTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);

  useEffect(() => {
    if (debouncedSearchKeyword !== undefined) {
      fetchData();
    }
  }, [debouncedSearchKeyword]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/doctor/detail', {
        params: {
          searchKeyword,
          startDate: null,
          endDate: null,
          status: null,
          specialty: null,
          phone: null,
          email: null,
          gender: null,
        }
      });
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      message.error('Không thể lấy dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord) => {
    try {
      await axios.put(
        `/api/doctor/${updatedRecord.doctorId}`,
        {
          name: updatedRecord.name,
          specialty: updatedRecord.specialty,
          phone: updatedRecord.phone,
          email: updatedRecord.email,
          gender: updatedRecord.gender,
          dateOfBirth: updatedRecord.dateOfBirth,
          isSuspended: updatedRecord.isSuspended
        }
      );
      message.success('Cập nhật thành công!');
      fetchData();
      setEditingRecord(null);
      setExpandedRowKeys([]);
    } catch (error) {
      message.error('Cập nhật không thành công!');
    }
  };

  const handleCancel = () => {
    setEditingRecord(null);
    setIsEditing(false);
    setExpandedRowKeys([]);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditing(true);
    setExpandedRowKeys([record.doctorId]);
  };

  const handleExpandRow = (record) => {
    setEditingRecord(null);
    setIsEditing(false);
    setExpandedRowKeys((prevKeys) => {
      const keys = [...prevKeys];
      const index = keys.indexOf(record.doctorId);
      if (index === -1) {
        keys.push(record.doctorId);
      } else {
        keys.splice(index, 1);
      }
      return keys;
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xóa bác sĩ ${record.name}?`,
      onOk: async () => {
        try {
          await axios.delete(`/api/doctor/${record.doctorId}`);
          message.success('Xóa thành công!');
          fetchData();
        } catch (error) {
          message.error('Xóa không thành công!');
        }
      },
      onCancel() {
        message.info('Hủy xóa');
      },
    });
  };

  const columns = [
    {
      title: 'Tên bác sĩ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Chuyên khoa',
      dataIndex: 'specialty',
      key: 'specialty'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isSuspended',
      key: 'isSuspended',
      render: (isSuspended) => (isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng')
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleExpandRow(record)}
            style={{ marginRight: 8 }}
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          >
            Xóa
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
     Tạo mới bác sĩ
   </Button>
      <Input
        placeholder="Tìm kiếm theo tên, chuyên khoa, email..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="doctorId"
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) =>
          setExpandedRowKeys(expanded ? [record.doctorId] : [])
        }
        expandedRowRender={(record) => (
          <ExpandedRow
            record={record}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingRecord={editingRecord}
            setEditingRecord={setEditingRecord}
          />
        )}
        style={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0' }}
      />
       <Create
     isActive={isModalVisible}
     onClose={handleClose}
     onRefresh={fetchData}
   />
    </div>
  );
};

export default DoctorTable;
