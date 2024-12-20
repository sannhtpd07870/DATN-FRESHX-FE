import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, DatePicker } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";
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
                ...formData,
                dateOfBirth: moment(formData.dateOfBirth).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
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
                        <strong>Họ tên:</strong>{' '}
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

const Receptionist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
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
            const response = await axios.get('/api/receptionist/detail', {
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
            await axios.put(`/api/receptionist/${updatedRecord.receptionistId}`, {
                name: updatedRecord.name,
                phone: updatedRecord.phone,
                email: updatedRecord.email,
                gender: updatedRecord.gender,
                dateOfBirth: updatedRecord.dateOfBirth,
                isSuspended: updatedRecord.isSuspended
            });
            message.success('Cập nhật thành công!');
            fetchData();
            setEditingRecord(null);
            setIsEditing(false);
            setExpandedRowKeys([]);
        } catch (error) {
            message.error('Cập nhật không thành công!');
        }
    };

    // ... Rest of the component implementation (handleAdd, handleDelete, etc.) ...

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Button type="link" onClick={() => handleExpandRow(record)}>
                    {text}
                </Button>
            )
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
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date) => moment(date).format('DD/MM/YYYY')
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
                    allowClear
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Thêm lễ tân
                </Button>
            </div>

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

            <Modal
                title="Thêm lễ tân mới"
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAdd}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Họ tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Select>
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateOfBirth"
                                label="Ngày sinh"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="isSuspended"
                                label="Trạng thái"
                                initialValue={0}
                            >
                                <Select>
                                    <Option value={0}>Hoạt động</Option>
                                    <Option value={1}>Tạm ngừng</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Receptionist; 