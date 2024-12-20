import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select, Checkbox } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce"
const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        code: record.code,
        name: record.name,
        nameEnglish: record.nameEnglish,
        nameRussian: record.nameRussian,
        address: record.address,
        phoneNumber: record.phoneNumber,
        fax: record.fax,
        email: record.email,
        taxCode: record.taxCode,
        director: record.director,
        contactPerson: record.contactPerson,
        isForeign: record.isForeign,
        isStateOwned: record.isStateOwned,
        isSuspended: record.isSuspended,
        isPharmaceuticalSupplier: record.isPharmaceuticalSupplier,
        isMedicalConsumableSupplier: record.isMedicalConsumableSupplier,
        isAssetSupplier: record.isAssetSupplier
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
                    {/* Basic Information */}
                    <Col span={8}>
                        <strong>Mã nhà cung cấp:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        ) : (
                            record.code
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Tên nhà cung cấp:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Tên tiếng Anh:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.nameEnglish}
                                onChange={(e) => handleInputChange('nameEnglish', e.target.value)}
                            />
                        ) : (
                            record.nameEnglish
                        )}
                    </Col>

                    {/* Contact Information */}
                    <Col span={12}>
                        <strong>Địa chỉ:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        ) : (
                            record.address
                        )}
                    </Col>
                    <Col span={6}>
                        <strong>Số điện thoại:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                        ) : (
                            record.phoneNumber
                        )}
                    </Col>
                    <Col span={6}>
                        <strong>Fax:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.fax}
                                onChange={(e) => handleInputChange('fax', e.target.value)}
                            />
                        ) : (
                            record.fax
                        )}
                    </Col>

                    {/* Additional Information */}
                    <Col span={8}>
                        <strong>Email:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        ) : (
                            record.email
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Mã số thuế:</strong>{' '}
                        {editingRecord?.supplierId === record.supplierId ? (
                            <Input
                                value={formData.taxCode}
                                onChange={(e) => handleInputChange('taxCode', e.target.value)}
                            />
                        ) : (
                            record.taxCode
                        )}
                    </Col>

                    {/* Checkboxes */}
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isForeign}
                                    onChange={(e) => handleInputChange('isForeign', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Nhà cung cấp nước ngoài
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isStateOwned}
                                    onChange={(e) => handleInputChange('isStateOwned', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Doanh nghiệp nhà nước
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isSuspended}
                                    onChange={(e) => handleInputChange('isSuspended', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Tạm ngưng
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isPharmaceuticalSupplier}
                                    onChange={(e) => handleInputChange('isPharmaceuticalSupplier', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Cung cấp dược phẩm
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isMedicalConsumableSupplier}
                                    onChange={(e) => handleInputChange('isMedicalConsumableSupplier', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Cung cấp vật tư y tế
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={formData.isAssetSupplier}
                                    onChange={(e) => handleInputChange('isAssetSupplier', e.target.checked)}
                                    disabled={!editingRecord}
                                >
                                    Cung cấp tài sản
                                </Checkbox>
                            </Col>
                        </Row>
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

const Supplier = () => {
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
            const response = await axios.get('/api/supplier', {
                params: {
                    searchKeyword
                }
            });
            setData(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu nhà cung cấp!');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(
                `/api/supplier/${updatedRecord.supplierId}`,
                {
                    code: updatedRecord.code,
                    name: updatedRecord.name,
                    nameEnglish: updatedRecord.nameEnglish,
                    nameRussian: updatedRecord.nameRussian,
                    address: updatedRecord.address,
                    phoneNumber: updatedRecord.phoneNumber,
                    fax: updatedRecord.fax,
                    email: updatedRecord.email,
                    taxCode: updatedRecord.taxCode,
                    director: updatedRecord.director,
                    contactPerson: updatedRecord.contactPerson,
                    isForeign: updatedRecord.isForeign,
                    isStateOwned: updatedRecord.isStateOwned,
                    isSuspended: updatedRecord.isSuspended,
                    isPharmaceuticalSupplier: updatedRecord.isPharmaceuticalSupplier,
                    isMedicalConsumableSupplier: updatedRecord.isMedicalConsumableSupplier,
                    isAssetSupplier: updatedRecord.isAssetSupplier
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
        setExpandedRowKeys([record.supplierId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa nhà cung cấp "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`/api/supplier/${record.supplierId}`);
                    message.success('Xóa nhà cung cấp thành công!');
                    fetchData();
                } catch (error) {
                    console.error('Error deleting supplier:', error);
                    message.error('Xóa nhà cung cấp thất bại!');
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
            const index = keys.indexOf(record.supplierId);
            if (index === -1) {
                keys.push(record.supplierId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const columns = [
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isSuspended',
            key: 'isSuspended',
            render: (isSuspended) => (isSuspended ? 'Tạm ngưng' : 'Hoạt động')
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
                rowKey="supplierId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.supplierId] : [])
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

export default Supplier;

