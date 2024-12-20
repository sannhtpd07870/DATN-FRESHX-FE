import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";

const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        code: record.code,
        name: record.name,
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

    return (
        <div>
            <Form layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <strong>Mã nhóm dịch vụ:</strong>{' '}
                        {editingRecord?.serviceGroupId === record.serviceGroupId ? (
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        ) : (
                            record.code
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Tên nhóm dịch vụ:</strong>{' '}
                        {editingRecord?.serviceGroupId === record.serviceGroupId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Trạng thái:</strong>{' '}
                        {editingRecord?.serviceGroupId === record.serviceGroupId ? (
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

                    {/* Action Buttons */}
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
                            onClick={onCancel}
                            disabled={!isEditing}
                        >
                            Hủy
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

const ServiceGroup = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const theme = useTheme();
    const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

    useEffect(() => {
        if (debouncedSearchKeyword !== undefined) {
            fetchData();
        }
    }, [debouncedSearchKeyword]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/servicegroup/detail', {
                params: {
                    searchKeyword: debouncedSearchKeyword
                }
            });
            setData(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu nhóm dịch vụ!');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(
                `/api/servicegroup/${updatedRecord.serviceGroupId}`,
                {
                    code: updatedRecord.code,
                    name: updatedRecord.name,
                    isSuspended: updatedRecord.isSuspended
                }
            );
            message.success('Cập nhật thành công!');
            fetchData();
            setEditingRecord(null);
            setIsEditing(false);
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
        setExpandedRowKeys([record.serviceGroupId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleExpandRow = (record) => {
        setEditingRecord(null);
        setIsEditing(false);
        setExpandedRowKeys((prevKeys) => {
            const keys = [...prevKeys];
            const index = keys.indexOf(record.serviceGroupId);
            if (index === -1) {
                keys.push(record.serviceGroupId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa nhóm dịch vụ "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`/api/servicegroup/${record.serviceGroupId}`);
                    message.success('Xóa nhóm dịch vụ thành công!');
                    fetchData();
                } catch (error) {
                    console.error('Error deleting service group:', error);
                    message.error('Xóa nhóm dịch vụ thất bại!');
                }
            },
            onCancel() {
                message.info('Đã hủy xóa');
            },
        });
    };

    const columns = [
        {
            title: 'Mã nhóm dịch vụ',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => handleExpandRow(record)}
                >
                    {text}
                </Button>
            )
        },
        {
            title: 'Tên nhóm dịch vụ',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => handleExpandRow(record)}
                >
                    {text}
                </Button>
            )
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
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm theo mã hoặc tên nhóm dịch vụ"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginRight: 16 }}
                    allowClear
                />
            </div>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="serviceGroupId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.serviceGroupId] : [])
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
        </div>
    );
};

export default ServiceGroup; 