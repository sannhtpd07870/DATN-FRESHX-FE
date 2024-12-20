import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce"
import { PlusOutlined } from '@ant-design/icons';
import Create from './Create';
const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        code: record.code,
        name: record.name,
        isSuspended: record.isSuspended
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
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
                        <strong>Tên loại thuốc:</strong>{' '}
                        {editingRecord?.drugTypeId === record.drugTypeId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Mã loại thuốc:</strong>{' '}
                        {editingRecord?.drugTypeId === record.drugTypeId ? (
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        ) : (
                            record.code
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Trạng thái:</strong>{' '}
                        {editingRecord?.drugTypeId === record.drugTypeId ? (
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

const DrugType = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const theme = useTheme();
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
            const response = await axios.get('/api/drugtype', {
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
                `/api/drugtype/${updatedRecord.drugTypeId}`,
                {
                    code: updatedRecord.code,
                    name: updatedRecord.name,
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
        setExpandedRowKeys([record.drugTypeId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleExpandRow = (record) => {
        setEditingRecord(false);
        setIsEditing(false);
        setExpandedRowKeys((prevKeys) => {
            const keys = [...prevKeys];
            const index = keys.indexOf(record.drugTypeId);
            if (index === -1) {
                keys.push(record.drugTypeId);
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
                try {
                    await axios.delete(`/api/drugtype/${record.drugTypeId}`);
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
            title: 'Mã loại thuốc',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên loại thuốc',
            dataIndex: 'name',
            key: 'name'
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
                        style={{ marginRight: 8 }}
                    >
                        Xóa
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div>
             <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalVisible(true)}
        >
          Thêm mới thuốc
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
                rowKey="drugTypeId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.drugTypeId] : [])
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

export default DrugType;
