import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, DatePicker } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";
import Create from './Create';
import moment from 'moment';

const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        name: record.name,
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
                    <Col span={8}>
                        <strong>Họ và tên:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Số điện thoại:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
                            <Input
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        ) : (
                            record.phone
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Email:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
                            <Input
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        ) : (
                            record.email
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Giới tính:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
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
                    <Col span={8}>
                        <strong>Ngày sinh:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
                            <DatePicker
                                value={moment(formData.dateOfBirth)}
                                onChange={(date) => handleInputChange('dateOfBirth', date)}
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                            />
                        ) : (
                            moment(record.dateOfBirth).format('DD/MM/YYYY')
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Trạng thái:</strong>{' '}
                        {editingRecord?.receptionistId === record.receptionistId ? (
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
                            Hủy
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

const Receptionist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
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
            const response = await axios.get('/api/receptionist', {
                params: {
                    searchKeyword: debouncedSearchKeyword
                }
            });
            setData(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu lễ tân!');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(`/api/receptionist/${updatedRecord.receptionistId}`, updatedRecord);
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
        setExpandedRowKeys([record.receptionistId]);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa lễ tân "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`/api/receptionist/${record.receptionistId}`);
                    message.success('Xóa lễ tân thành công!');
                    fetchData();
                } catch (error) {
                    message.error('Xóa lễ tân thất bại!');
                }
            },
            onCancel() {
                message.info('Đã hủy xóa');
            },
        });
    };

    const handleExpandRow = (record) => {
        setEditingRecord(null);
        setIsEditing(false);
        setExpandedRowKeys((prevKeys) => {
            const keys = [...prevKeys];
            const index = keys.indexOf(record.receptionistId);
            if (index === -1) {
                keys.push(record.receptionistId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name'
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
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Input
                    placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    style={{ width: 300 }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateModalVisible(true)}
                >
                    Thêm lễ tân
                </Button>
            </div>

            <Create
                isActive={isCreateModalVisible}
                onClose={() => setIsCreateModalVisible(false)}
                onRefresh={fetchData}
            />

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="receptionistId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.receptionistId] : [])
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

export default Receptionist; 