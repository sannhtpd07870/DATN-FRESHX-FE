import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Table, Row, Col, Checkbox, message } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useDebounce from '../../hooks/useDebounce';

const Pharmacy = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const theme = useTheme();
    const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

    useEffect(() => {
        if (debouncedSearchKeyword !== undefined) {
            fetchData();
        }
    }, [debouncedSearchKeyword]);

    useEffect(() => {
        fetchDepartments();
        fetchSpecialties();
        fetchInventoryTypes();
    }, []);

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
            message.error('Không thể lấy dữ liệu nhà thuốc!');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('/api/department');
            setDepartments(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu khoa/phòng!');
        }
    };

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('/api/specialty');
            setSpecialties(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu chuyên khoa!');
        }
    };

    const fetchInventoryTypes = async () => {
        try {
            const response = await axios.get('/api/inventorytype');
            setInventoryTypes(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu loại kho!');
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(`/api/pharmacy/${updatedRecord.pharmacyId}`, {
                code: updatedRecord.code,
                name: updatedRecord.name,
                departmentId: updatedRecord.departmentId,
                inventoryTypeId: updatedRecord.inventoryTypeId,
                isSuspended: updatedRecord.isSuspended,
                nameUnaccented: updatedRecord.name,
                specialtyId: updatedRecord.specialtyId,
                costCenterId: updatedRecord.costCenterId,
                isSourceManagement: updatedRecord.isSourceManagement
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

    const handleAdd = async (values) => {
        try {
            await axios.post('/api/pharmacy', {
                ...values,
                nameUnaccented: values.name
            });
            message.success('Thêm nhà thuốc thành công!');
            setIsModalVisible(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            message.error('Thêm nhà thuốc thất bại!');
        }
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa nhà thuốc "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`/api/pharmacy/${record.pharmacyId}`);
                    message.success('Xóa nhà thuốc thành công!');
                    fetchData();
                } catch (error) {
                    message.error('Xóa nhà thuốc thất bại!');
                }
            }
        });
    };

    const handleCancel = () => {
        setEditingRecord(null);
        setIsEditing(false);
        setExpandedRowKeys([]);
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsEditing(true);
        setExpandedRowKeys([record.pharmacyId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const columns = [
        {
            title: 'Mã nhà thuốc',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => (
                <Button type="link" onClick={() => handleEdit(record)}>
                    {text}
                </Button>
            )
        },
        {
            title: 'Tên nhà thuốc',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Khoa/Phòng',
            dataIndex: 'departmentId',
            key: 'departmentId',
            render: (departmentId) => 
                departments.find(d => d.departmentId === departmentId)?.name
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
                        onClick={() => handleEdit(record)}
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
                    allowClear
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Thêm nhà thuốc
                </Button>
            </div>

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
                        departments={departments}
                        specialties={specialties}
                        inventoryTypes={inventoryTypes}
                    />
                )}
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0' }}
            />

            <Modal
                title="Thêm nhà thuốc mới"
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
                                name="code"
                                label="Mã nhà thuốc"
                                rules={[{ required: true, message: 'Vui lòng nhập mã nhà thuốc!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên nhà thuốc"
                                rules={[{ required: true, message: 'Vui lòng nhập tên nhà thuốc!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="departmentId"
                                label="Khoa/Phòng"
                                rules={[{ required: true, message: 'Vui lòng chọn khoa/phòng!' }]}
                            >
                                <Select>
                                    {departments.map(dept => (
                                        <Option key={dept.departmentId} value={dept.departmentId}>
                                            {dept.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="inventoryTypeId"
                                label="Loại kho"
                                rules={[{ required: true, message: 'Vui lòng chọn loại kho!' }]}
                            >
                                <Select>
                                    {inventoryTypes.map(type => (
                                        <Option key={type.id} value={type.id}>
                                            {type.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="specialtyId"
                                label="Chuyên khoa"
                            >
                                <Select>
                                    {specialties.map(spec => (
                                        <Option key={spec.id} value={spec.id}>
                                            {spec.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="costCenterId"
                                label="Mã trung tâm chi phí"
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="isSourceManagement"
                                valuePropName="checked"
                            >
                                <Checkbox>Quản lý nguồn</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="isSuspended"
                                label="Trạng thái"
                                initialValue={false}
                            >
                                <Select>
                                    <Option value={false}>Hoạt động</Option>
                                    <Option value={true}>Tạm ngừng</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Pharmacy; 