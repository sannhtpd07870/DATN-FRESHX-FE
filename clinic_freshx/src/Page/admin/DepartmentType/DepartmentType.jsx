import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce"
import Create from './Create';
const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        name: record.name,
        code: record.code
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
            ...formData,
          };
          await onSave(updatedData);
          setIsEditing(false);
        } catch (error) {
          message.error('Cập nhật không thành công!');
        }
      };
      const handleCancel =()=>{
        setIsEditing(false);
        setEditingRecord(false);
      }
    
      return (
        <div>
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>Tên phòng ban:</strong>{' '}
                {editingRecord?.departmentTypeId === record.departmentTypeId ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  record.name
                )}
              </Col>
              <Col span={12}>
                <strong>Mã phòng ban:</strong>{' '}
                {editingRecord?.departmentTypeId === record.departmentTypeId ? (
                  <Input
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                  />
                ) : (
                  record.code
                )}
              </Col>
              <Col span={12}>
                <strong>Ngày tạo:</strong> {new Date(record.createdDate).toLocaleString()}
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
                  onClick={() => handleCancel()} 
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

const DepartmentType = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingRecord, setEditingRecord] = useState(true);
  const theme = useTheme();  // Use the MUI theme hook
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    useEffect(() => {
      if (debouncedSearchKeyword !== undefined) {
          fetchData();
      }
  }, [debouncedSearchKeyword]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/departmenttype/detail', {
        params: {
          searchKeyword
        }
      });
      setData(response.data.data);
    } catch (error) {
      message.error('Không thể lấy dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord) => {
    try {
      await axios.put(
        `/api/departmenttype/${updatedRecord.departmentTypeId}`,
        updatedRecord
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
    setExpandedRowKeys([record.departmentTypeId]);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleExpandRow = (record) => {
    setExpandedRowKeys((prevKeys) => {
      const keys = [...prevKeys];
      const index = keys.indexOf(record.departmentTypeId);
      if (index === -1) {
        keys.push(record.departmentTypeId);
      } else {
        keys.splice(index, 1);
      }
      return keys;
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xóa ${record.name}?`,
      onOk: async () => {
        // Logic xóa dữ liệu
        try {
          // Giả sử API xóa dữ liệu
          await axios.delete(`/api/departmenttype/${record.departmentTypeId}`);
          message.success('Xóa thành công!');
          fetchData(); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
          message.error('Xóa không thành công!');
        }
      },
      onCancel() {
        message.info('Hủy xóa');
      },
    });
  };
//   const handleSave = async (values) => {
//     try {
//       const updatedData = {
//         ...editingRecord,
//         ...values
//       };
//      await axios.put(`/api/departmenttype/${editingRecord.departmentTypeId}`, updatedData);
//       message.success('Cập nhật thành công!'); 
//       fetchData();
//       setIsEditing(false);
//       setEditingRecord(null);
//       setExpandedRowKeys([]);
//     } catch (err) {
//         message.error(err. data.data[0].message)
//         setError(err);
//         setUserData(null);  
//         return false; 
//     }
//   };

  const columns = [
    {
      title: 'Mã phòng ban',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isSuspended',
      key: 'isSuspended',
      render: (isSuspended) => (isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng'),
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
            style={{ marginRight: 8 }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];



  return (
    <div>
       <Button 
        type="primary" 
        onClick={() => setIsCreateModalVisible(true)}
        style={{ marginBottom: 20, marginRight: 16 }}
      >
        Tạo mới
      </Button>
      <Input
        placeholder="Tìm kiếm"
        value={searchKeyword}
        onChange={handleSearchChange}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="departmentTypeId"
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) =>
            setExpandedRowKeys(expanded ? [record.departmentTypeId] : [])
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
        isActive={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onRefresh={fetchData}
      />
    </div>
  );
};

export default DepartmentType;
