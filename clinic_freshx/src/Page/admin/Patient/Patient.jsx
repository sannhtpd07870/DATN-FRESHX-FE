import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, DatePicker } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";
import moment from 'moment';
import Create from './Create';

const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        medicalRecordNumber: record.medicalRecordNumber,
        admissionNumber: record.admissionNumber,
        name: record.name,
        gender: record.gender,
        dateOfBirth: record.dateOfBirth,
        phoneNumber: record.phoneNumber,
        identityCardNumber: record.identityCardNumber,
        address: record.address,
        imageUrl: record.imageUrl,
        ethnicity: record.ethnicity
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

    const handleCancel = () => {
        setIsEditing(false);
        setEditingRecord(null);
    };

    return (
        <div>
            <Form layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <strong>Mã bệnh án:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.medicalRecordNumber}
                                onChange={(e) => handleInputChange('medicalRecordNumber', e.target.value)}
                            />
                        ) : (
                            record.medicalRecordNumber
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Số nhập viện:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.admissionNumber}
                                onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
                            />
                        ) : (
                            record.admissionNumber
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Họ tên:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Giới tính:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Select
                                value={formData.gender}
                                onChange={(value) => handleInputChange('gender', value)}
                                style={{ width: '100%' }}
                            >
                                <Option value="Nam">Nam</Option>
                                <Option value="Nữ">Nữ</Option>
                                <Option value="Khác">Khác</Option>
                            </Select>
                        ) : (
                            record.gender
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Ngày sinh:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
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
                    <Col span={12}>
                        <strong>Số điện thoại:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                        ) : (
                            record.phoneNumber
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>CMND/CCCD:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.identityCardNumber}
                                onChange={(e) => handleInputChange('identityCardNumber', e.target.value)}
                            />
                        ) : (
                            record.identityCardNumber
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Địa chỉ:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input.TextArea
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        ) : (
                            record.address
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Dân tộc:</strong>{' '}
                        {editingRecord?.patientId === record.patientId ? (
                            <Input
                                value={formData.ethnicity}
                                onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                            />
                        ) : (
                            record.ethnicity
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

const Patient = () => {
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
    const refreshData = () => fetchData();

    useEffect(() => {
        if (debouncedSearchKeyword !== undefined) {
            fetchData();
        }
    }, [debouncedSearchKeyword]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/patient/get-allpatients', {
                params: {
                    searchKeyword: debouncedSearchKeyword
                }
            });
            setData(response.data.data.items);
        } catch (error) {
            message.error('Không thể lấy dữ liệu bệnh nhân!');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(`/api/patient/${updatedRecord.patientId}`, {
                medicalRecordNumber: updatedRecord.medicalRecordNumber,
                admissionNumber: updatedRecord.admissionNumber,
                name: updatedRecord.name,
                gender: updatedRecord.gender,
                dateOfBirth: updatedRecord.dateOfBirth,
                phoneNumber: updatedRecord.phoneNumber,
                identityCardNumber: updatedRecord.identityCardNumber,
                address: updatedRecord.address,
                imageUrl: updatedRecord.imageUrl,
                ethnicity: updatedRecord.ethnicity,
                isDeleted: 0
            });
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
        setExpandedRowKeys([record.patientId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleExpandRow = (record) => {
        setEditingRecord(null);
        setIsEditing(false);
        setExpandedRowKeys((prevKeys) => {
            const keys = [...prevKeys];
            const index = keys.indexOf(record.patientId);
            if (index === -1) {
                keys.push(record.patientId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn xóa bệnh nhân "${record.name}"?`,
            onOk: async () => {
                try {
                    await axios.delete(`/api/patient/${record.patientId}`);
                    message.success('Xóa bệnh nhân thành công!');
                    fetchData();
                } catch (error) {
                    message.error('Xóa bệnh nhân thất bại!');
                }
            },
            onCancel() {
                message.info('Hủy xóa');
            },
        });
    };

    const columns = [
        {
            title: 'Mã bệnh án',
            dataIndex: 'medicalRecordNumber',
            key: 'medicalRecordNumber'
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name'
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
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
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
                    placeholder="Tìm kiếm theo mã bệnh án hoặc tên"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    style={{ width: 300 }}
                    allowClear
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleOpen}
                >
                    Thêm bệnh nhân
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="patientId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.patientId] : [])
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
                onRefresh={refreshData}
            />
        </div>
    );
};

export default Patient; 