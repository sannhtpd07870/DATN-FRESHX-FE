import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import { Table, Button, Input, Modal, message, Row, Col, Form, Select } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import useDebounce from "../../../components/admin/useDebounce"
import Create from './Create';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
    const [formData, setFormData] = useState({
        code: record.code,
        name: record.name,
        unitOfMeasureId: record.unitOfMeasureId,
        manufacturerId: record.manufacturerId,
        countryId: record.countryId,
        fullName: record.fullName,
        activeIngredient: record.activeIngredient,
        usage: record.usage,
        dosage: record.dosage,
        effect: record.effect,
        drugTypeId: record.drugTypeId,
        drugClassification: record.drugClassification,
        routeOfAdministration: record.routeOfAdministration,
        isSuspended: record.isSuspended,
        nationalDrugCode: record.nationalDrugCode,
        description: record.description,
        referenceNumber: record.referenceNumber,
        note1: record.note1,
        note2: record.note2,
        note3: record.note3,
        costPrice: record.costPrice,
        unitPrice: record.unitPrice,
        managementPharmacyId: record.managementPharmacyId,
        departmentPharmacyId: record.departmentPharmacyId
    });

    // States for dropdown data
    const [drugTypes, setDrugTypes] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [countries, setCountries] = useState([]);
    const [units, setUnits] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);

    // Fetch all necessary data on component mount
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [
                    drugTypesRes,
                    manufacturersRes,
                    countriesRes,
                    unitsRes,
                    pharmaciesRes
                ] = await Promise.all([
                    axios.get('/api/drugtype'),
                    axios.get('/api/supplier'),
                    axios.get('/api/country'),
                    axios.get('/api/unitofmeasure'),
                    axios.get('/api/pharmacy')
                ]);

                setDrugTypes(drugTypesRes.data.data);
                setManufacturers(manufacturersRes.data.data);
                setCountries(countriesRes.data.data);
                setUnits(unitsRes.data.data);
                setPharmacies(pharmaciesRes.data.data);
            } catch (error) {
                message.error('Không thể lấy dữ liệu!');
            }
        };

        fetchDropdownData();
    }, []);

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
                    {/* Basic Information */}
                    <Col span={8}>
                        <strong>Mã thuốc:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        ) : (
                            record.code
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Tên thuốc:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        ) : (
                            record.name
                        )}
                    </Col>
                    <Col span={8}>
                        <strong>Tên đầy đủ:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                            />
                        ) : (
                            record.fullName
                        )}
                    </Col>

                    {/* Dropdowns */}
                    <Col span={8}>
                        <strong>Loại thuốc:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.drugTypeId}
                                onChange={(value) => handleInputChange('drugTypeId', value)}
                                style={{ width: '100%' }}
                            >
                                {drugTypes.map((type) => (
                                    <Option key={type.drugTypeId} value={type.drugTypeId}>
                                        {type.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            drugTypes.find(type => type.drugTypeId === record.drugTypeId)?.name
                        )}
                    </Col>

                    {/* Manufacturers */}
                    <Col span={8}>
                        <strong>Nhà sản xuất:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.manufacturerId}
                                onChange={(value) => handleInputChange('manufacturerId', value)}
                                style={{ width: '100%' }}
                            >
                                {manufacturers.map((manufacturer) => (
                                    <Option key={manufacturer.supplierId} value={manufacturer.supplierId}>
                                        {manufacturer.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            manufacturers.find(m => m.supplierId === record.manufacturerId)?.name
                        )}
                    </Col>

                    {/* Countries */}
                    <Col span={8}>
                        <strong>Quốc gia:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.countryId}
                                onChange={(value) => handleInputChange('countryId', value)}
                                style={{ width: '100%' }}
                            >
                                {countries.map((country) => (
                                    <Option key={country.countryId} value={country.countryId}>
                                        {country.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            countries.find(c => c.countryId === record.countryId)?.name
                        )}
                    </Col>

                    {/* Units of Measure */}
                    <Col span={8}>
                        <strong>Đơn vị tính:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.unitOfMeasureId}
                                onChange={(value) => handleInputChange('unitOfMeasureId', value)}
                                style={{ width: '100%' }}
                            >
                                {units.map((unit) => (
                                    <Option key={unit.unitOfMeasureId} value={unit.unitOfMeasureId}>
                                        {unit.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            units.find(u => u.unitOfMeasureId === record.unitOfMeasureId)?.name
                        )}
                    </Col>

                    {/* Management Pharmacy */}
                    <Col span={8}>
                        <strong>Nhà thuốc quản lý:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.managementPharmacyId}
                                onChange={(value) => handleInputChange('managementPharmacyId', value)}
                                style={{ width: '100%' }}
                            >
                                {pharmacies.map((pharmacy) => (
                                    <Option key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>
                                        {pharmacy.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            pharmacies.find(p => p.pharmacyId === record.managementPharmacyId)?.name
                        )}
                    </Col>

                    {/* Department Pharmacy */}
                    <Col span={8}>
                        <strong>Nhà thuốc khoa:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Select
                                value={formData.departmentPharmacyId}
                                onChange={(value) => handleInputChange('departmentPharmacyId', value)}
                                style={{ width: '100%' }}
                            >
                                {pharmacies.map((pharmacy) => (
                                    <Option key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>
                                        {pharmacy.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            pharmacies.find(p => p.pharmacyId === record.departmentPharmacyId)?.name
                        )}
                    </Col>

                    {/* Drug Details */}
                    <Col span={12}>
                        <strong>Hoạt chất:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input
                                value={formData.activeIngredient}
                                onChange={(e) => handleInputChange('activeIngredient', e.target.value)}
                            />
                        ) : (
                            record.activeIngredient
                        )}
                    </Col>

                    {/* Continue with other fields... */}

                    {/* Notes */}
                    <Col span={24}>
                        <strong>Ghi chú 1:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input.TextArea
                                value={formData.note1}
                                onChange={(e) => handleInputChange('note1', e.target.value)}
                            />
                        ) : (
                            record.note1
                        )}
                    </Col>

                    {/* Prices */}
                    <Col span={12}>
                        <strong>Giá nhập:</strong>{' '}
                        {editingRecord?.drugCatalogId === record.drugCatalogId ? (
                            <Input
                                type="number"
                                value={formData.costPrice}
                                onChange={(e) => handleInputChange('costPrice', parseFloat(e.target.value))}
                            />
                        ) : (
                            record.costPrice
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

const DrugCatalog = () => {
    const [data, setData] = useState([]);
    const [drugTypes, setDrugTypes] = useState([]);
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
        fetchDrugTypes();
    }, [debouncedSearchKeyword]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/drugcatalog', {
                params: {
                    searchKeyword
                }
            });
            setData(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu thuốc!');
        } finally {
            setLoading(false);
        }
    };

    const fetchDrugTypes = async () => {
        try {
            const response = await axios.get('/api/drugtype');
            setDrugTypes(response.data.data);
        } catch (error) {
            message.error('Không thể lấy dữ liệu loại thuốc!');
        }
    };

    const handleSave = async (updatedRecord) => {
        try {
            await axios.put(
                `/api/drugcatalog/${updatedRecord.drugCatalogId}`,
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
        setExpandedRowKeys([record.drugCatalogId]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa thuốc "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`/api/drugcatalog/${record.drugCatalogId}`);
                    message.success('Xóa thuốc thành công!');
                    fetchData(); // Refresh data after deletion
                } catch (error) {
                    console.error('Error deleting drug:', error);
                    message.error('Xóa thuốc thất bại!');
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
            const index = keys.indexOf(record.drugCatalogId);
            if (index === -1) {
                keys.push(record.drugCatalogId);
            } else {
                keys.splice(index, 1);
            }
            return keys;
        });
    };

    const columns = [
        {
            title: 'Mã thuốc',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên thuốc',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Loại thuốc',
            dataIndex: 'drugTypeId',
            key: 'drugTypeId',
            render: (drugTypeId) => drugTypes.find((type) => type.drugTypeId === drugTypeId)?.name || 'Không xác định'
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
                rowKey="drugCatalogId"
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) =>
                    setExpandedRowKeys(expanded ? [record.drugCatalogId] : [])
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
                        drugTypes={drugTypes}
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

export default DrugCatalog;
