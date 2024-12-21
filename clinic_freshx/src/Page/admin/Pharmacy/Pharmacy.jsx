import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, Checkbox } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce";
import Create from './Create';

const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        code: record.code,
        name: record.name,
        departmentId: record.departmentId,
        inventoryTypeId: record.inventoryTypeId,
        specialtyId: record.specialtyId,
        costCenterId: record.costCenterId,
        isSuspended: record.isSuspended,
        isSourceManagement: record.isSourceManagement
    });

    const [departments, setDepartments] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [inventoryTypes, setInventoryTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptRes, specRes, invRes] = await Promise.all([
                    axios.get('/api/department'),
                    axios.get('/api/specialty'),
                    axios.get('/api/inventorytype')
                ]);
                setDepartments(deptRes.data.data);
                setSpecialties(specRes.data.data);
                setInventoryTypes(invRes.data.data);
            } catch (error) {
                message.error('Không thể lấy dữ liệu!');
            }
        };
        fetchData();
    }, []);

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
                        <strong>Mã nhà thuốc:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        ) : (
                            record.code
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Tên nhà thuốc:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Khoa/Phòng:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Select
                                value={formData.departmentId}
                                onChange={(value) => handleInputChange('departmentId', value)}
                                style={{ width: '100%' }}
                            >
                                {departments.map((dept) => (
                                    <Option key={dept.departmentId} value={dept.departmentId}>
                                        {dept.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            departments.find(d => d.departmentId === record.departmentId)?.name || 'N/A'
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Loại kho:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Select
                                value={formData.inventoryTypeId}
                                onChange={(value) => handleInputChange('inventoryTypeId', value)}
                                style={{ width: '100%' }}
                            >
                                {inventoryTypes.map((type) => (
                                    <Option key={type.id} value={type.id}>
                                        {type.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            inventoryTypes.find(t => t.id === record.inventoryTypeId)?.name || 'N/A'
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Chuyên khoa:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Select
                                value={formData.specialtyId}
                                onChange={(value) => handleInputChange('specialtyId', value)}
                                style={{ width: '100%' }}
                            >
                                {specialties.map((spec) => (
                                    <Option key={spec.id} value={spec.id}>
                                        {spec.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            specialties.find(s => s.id === record.specialtyId)?.name || 'N/A'
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Mã trung tâm chi phí:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Input
                                value={formData.costCenterId}
                                onChange={(e) => handleInputChange('costCenterId', e.target.value)}
                                type="number"
                            />
                        ) : (
                            record.costCenterId
                        )}
                    </Col>
                    <Col span={12}>
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Checkbox
                                checked={formData.isSourceManagement}
                                onChange={(e) => handleInputChange('isSourceManagement', e.target.checked)}
                            >
                                Quản lý nguồn
                            </Checkbox>
                        ) : (
                            <strong>Quản lý nguồn: {record.isSourceManagement ? 'Có' : 'Không'}</strong>
                        )}
                    </Col>
                    <Col span={12}>
                        <strong>Trạng thái:</strong>{' '}
                        {editingRecord?.pharmacyId === record.pharmacyId ? (
                            <Select
                                value={formData.isSuspended}
                                onChange={(value) => handleInputChange('isSuspended', value)}
                                style={{ width: '100%' }}
                            >
                                <Option value={false}>Hoạt động</Option>
                                <Option value={true}>Tạm ngừng</Option>
                            </Select>
                        ) : (
                            record.isSuspended ? 'Tạm ngừng' : 'Hoạt động'
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

const Pharmacy = () => {
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
            const response = await axios.get('/api/pharmacy/detail', {
                params: {
                    searchKeyword: debouncedSearchKeyword
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
            await axios.put(`/api/pharmacy/${updatedRecord.pharmacyId}`, {
                code: updatedRecord.code,
                name: updatedRecord.name,
                departmentId: updatedRecord.departmentId,
                inventoryTypeId: updatedRecord.inventoryTypeId,
                specialtyId: updatedRecord.specialtyId,
                costCenterId: updatedRecord.costCenterId,
                isSuspended: updatedRecord.isSuspended,
                isSourceManagement: updatedRecord.isSourceManagement,
                nameUnaccented: updatedRecord.name
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
        setExpandedRowKeys([record.pharmacyId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleExpandRow = (record) => {
        setEditingRecord(false);
        setIsEditing(false);
        setExpandedRowKeys((prevKeys) => {
            const keys = [...prevKeys];
            const index = keys.indexOf(record.pharmacyId);
            if (index === -1) {
                keys.push(record.pharmacyId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn xóa nhà thuốc ${record.name}?`,
            onOk: async () => {
                try {
                    await axios.delete(`/api/pharmacy/${record.pharmacyId}`);
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
            title: 'Mã nhà thuốc',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên nhà thuốc',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isSuspended',
            key: 'isSuspended',
            render: (isSuspended) => (isSuspended ? 'Tạm ngừng' : 'Hoạt động')
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
                    placeholder="Tìm kiếm theo mã hoặc tên nhà thuốc"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    style={{ width: 300 }}
                />
                <Button type="primary" onClick={handleOpen}>
                    Thêm nhà thuốc
                </Button>
            </div>

            <Create
                isActive={isModalVisible}
                onClose={handleClose}
                onRefresh={fetchData}
            />

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="pharmacyId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.pharmacyId] : [])
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

export default Pharmacy; 