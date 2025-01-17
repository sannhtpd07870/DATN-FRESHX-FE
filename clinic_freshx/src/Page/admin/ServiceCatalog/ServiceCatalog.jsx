import React from 'react';
import BaseTable from '../../../components/admin/BaseTable';

const ServiceCatalog = () => {
    // Cấu hình các cột trong bảng
    const columns = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (price ? price.toLocaleString() + ' VNĐ' : 'Không có giá'),
        },
        {
            title: 'Đơn vị đo lường',
            dataIndex: 'unitOfMeasure',
            key: 'unitOfMeasure',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isSuspended',
            key: 'isSuspended',
            render: (isSuspended) => (isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng'),
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: ['serviceTypes', 'name'],
            key: 'serviceTypeName',
        },
    ];

    // Cấu hình các trường cho form thêm/chỉnh sửa dịch vụ
    const fieldsConfig = [
        {
            name: 'code',
            label: 'Mã dịch vụ',
            type: 'input',
            messageRequired: 'Mã dịch vụ không được để trống',
            span: 12,
        },
        {
            name: 'name',
            label: 'Tên dịch vụ',
            type: 'input',
            messageRequired: 'Tên dịch vụ không được để trống',
            span: 12,
        },
        {
            name: 'price',
            label: 'Giá',
            type: 'input',
            inputType: 'number',
            messageRequired: 'Giá không được để trống',
            span: 12,
        },
        {
            name: 'unitOfMeasureId',
            label: 'Đơn vị đo lường',
            messageRequired: 'Đơn vị đo lường là bắt buộc',
            type: 'select',
            optionKey: 'unitOfMeasureId',
            optionValue: 'unitOfMeasureId',
            optionLabel: 'name',
            optionConfig: {
                endpoint: '/api/unitOfMeasure',
            },
            span: 12,
        },
        {
            name: 'hasStandardValue',
            label: 'Giá trị chuẩn',
            type: 'checkbox',
            span: 3,
        },
        {
            name: 'level',
            label: 'Cấp độ dịch vụ',
            type: 'input',
            inputType: 'number',
            span: 3,
        },
      
        {
            name: 'serviceTypeId',
            label: 'Loại dịch vụ',
            type: 'select',
            optionKey: 'serviceTypeId',
            optionValue: 'serviceTypeId',
            optionLabel: 'name',
            optionConfig: {
                endpoint: '/api/servicetypes',
            },
            span: 3 ,
        },
        {
            name: 'serviceGroupId',
            label: 'Nhóm dịch vụ',
            type: 'select',
            optionKey: 'serviceGroupId',
            optionValue: 'serviceGroupId',
            optionLabel: 'name',
            optionConfig: {
                endpoint: '/api/servicegroup',
            },
            span: 3,
        },
        {
            name: 'parentServiceId',
            label: 'Dịch vụ cha',
            type: 'select',
            optionKey: 'parentServiceId',
            optionValue: 'serviceCatalogId',
            optionLabel: 'name',
            optionConfig: {
                endpoint: '/api/servicecatalog',
            },
            span: 3,
        },
        { name: 'isSuspended', 
            label: 'Trạng thái', 
            type: 'select', 
            optionKey: 'isSuspended', 
            optionValue: 'valueId', 
            optionLabel: 'name', 
            optionConfig: {
            endpoint: '/api/status',
        },
        span: 3 }
    ];

    // Cấu hình tạo dịch vụ mới
    const createConfig = {
        title: 'Tạo dịch vụ mới',
        endpoint: '/api/servicecatalog',
        fields: fieldsConfig,
    };

    return (
        <BaseTable
            endpoint="/api/servicecatalog"
            UpdateEndpoint="/api/servicecatalog"
            DeleteEndpoint="/api/servicecatalog"
            columns={columns}
            fieldsConfig={fieldsConfig}
            primaryKey="serviceCatalogId"
            createConfig={createConfig}
            searchPlaceholder="Tìm kiếm dịch vụ"
            createButtonLabel="Tạo dịch vụ mới"
        />
    );
};

export default ServiceCatalog;





// import React, { useState, useEffect } from 'react';
// import axios from '../../../services/axiosInstance';
// import { Table, Button, Input, Modal, message, Row, Col, Form, Select, InputNumber } from 'antd';
// import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import { useTheme } from '@mui/material/styles';
// import useDebounce from "../../../components/admin/useDebounce";
// import Create from './Create';

// const { Option } = Select;

// const ExpandedRow = ({ record, onSave, onCancel, isEditing, setIsEditing, editingRecord, setEditingRecord }) => {
//     const [formData, setFormData] = useState({
//         code: record.code,
//         name: record.name,
//         price: record.price,
//         unitOfMeasure: record.unitOfMeasure,
//         hasStandardValue: record.hasStandardValue,
//         level: record.level,
//         isParentService: record.isParentService,
//         parentServiceId: record.parentServiceId,
//         serviceGroupId: record.serviceGroupId,
//         isSuspended: record.isSuspended
//     });

//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleSaveClick = async () => {
//         try {
//             const updatedData = {
//                 ...record,
//                 ...formData
//             };
//             await onSave(updatedData);
//             setIsEditing(false);
//         } catch (error) {
//             message.error('Cập nhật không thành công!');
//         }
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//         setEditingRecord(null);
//     };

//     return (
//         <div>
//             <Form layout="vertical">
//                 <Row gutter={[16, 16]}>
//                     <Col span={12}>
//                         <strong>Mã dịch vụ:</strong>{' '}
//                         {editingRecord?.serviceCatalogId === record.serviceCatalogId ? (
//                             <Input
//                                 value={formData.code}
//                                 onChange={(e) => handleInputChange('code', e.target.value)}
//                             />
//                         ) : (
//                             record.code
//                         )}
//                     </Col>
//                     <Col span={12}>
//                         <strong>Tên dịch vụ:</strong>{' '}
//                         {editingRecord?.serviceCatalogId === record.serviceCatalogId ? (
//                             <Input
//                                 value={formData.name}
//                                 onChange={(e) => handleInputChange('name', e.target.value)}
//                             />
//                         ) : (
//                             record.name
//                         )}
//                     </Col>
//                     <Col span={12}>
//                         <strong>Giá dịch vụ:</strong>{' '}
//                         {editingRecord?.serviceCatalogId === record.serviceCatalogId ? (
//                             <InputNumber
//                                 value={formData.price}
//                                 onChange={(value) => handleInputChange('price', value)}
//                                 formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                 parser={value => value.replace(/\$\s?|(,*)/g, '')}
//                                 style={{ width: '100%' }}
//                             />
//                         ) : (
//                             formData.price?.toLocaleString('vi-VN')
//                         )}
//                     </Col>
//                     <Col span={24}>
//                         {editingRecord?.serviceCatalogId === record.serviceCatalogId && (
//                             <div style={{ marginTop: 16 }}>
//                                 <Button type="primary" onClick={handleSaveClick} style={{ marginRight: 8 }}>
//                                     Lưu
//                                 </Button>
//                                 <Button onClick={handleCancel}>Hủy</Button>
//                             </div>
//                         )}
//                     </Col>
//                 </Row>
//             </Form>
//         </div>
//     );
// };

// const ServiceCatalog = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [expandedRowKeys, setExpandedRowKeys] = useState([]);
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [editingRecord, setEditingRecord] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const theme = useTheme();
//     const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
//     const [isModalVisible, setModalVisible] = useState(false);

//     const handleOpen = () => setModalVisible(true);
//     const handleClose = () => setModalVisible(false);
//     const refreshData = () => fetchData();

//     useEffect(() => {
//         if (debouncedSearchKeyword !== undefined) {
//             fetchData();
//         }
//     }, [debouncedSearchKeyword]);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('/api/servicecatalog', {
//                 params: {
//                     searchKeyword
//                 }
//             });
//             setData(response.data.data);
//         } catch (error) {
//             message.error('Không thể lấy dữ liệu!');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSave = async (updatedRecord) => {
//         try {
//             await axios.put(
//                 `/api/servicecatalog/${updatedRecord.serviceCatalogId}`,
//                 updatedRecord
//             );
//             message.success('Cập nhật thành công!');
//             fetchData();
//             setEditingRecord(null);
//             setExpandedRowKeys([]);
//         } catch (error) {
//             message.error('Cập nhật không thành công!');
//         }
//     };

//     const handleCancel = () => {
//         setEditingRecord(null);
//         setIsEditing(false);
//         setExpandedRowKeys([]);
//     };

//     const handleEdit = (record) => {
//         setEditingRecord(record);
//         setIsEditing(true);
//         setExpandedRowKeys([record.serviceCatalogId]);
//     };

//     const handleSearchChange = (e) => {
//         setSearchKeyword(e.target.value);
//     };

//     const handleExpandRow = (record) => {
//         setEditingRecord(null);
//         setIsEditing(false);
//         setExpandedRowKeys((prevKeys) => {
//             const keys = [...prevKeys];
//             const index = keys.indexOf(record.serviceCatalogId);
//             if (index === -1) {
//                 keys.push(record.serviceCatalogId);
//             } else {
//                 keys.splice(index, 1);
//             }
//             return keys;
//         });
//     };

//     const handleDelete = (record) => {
//         Modal.confirm({
//             title: `Bạn có chắc chắn muốn xóa dịch vụ ${record.name}?`,
//             onOk: async () => {
//                 try {
//                     await axios.delete(`/api/servicecatalog/${record.serviceCatalogId}`);
//                     message.success('Xóa thành công!');
//                     fetchData();
//                 } catch (error) {
//                     message.error('Xóa không thành công!');
//                 }
//             },
//             onCancel() {
//                 message.info('Hủy xóa');
//             },
//         });
//     };

//     const columns = [
//         {
//             title: 'Mã dịch vụ',
//             dataIndex: 'code',
//             key: 'code'
//         },
//         {
//             title: 'Tên dịch vụ',
//             dataIndex: 'name',
//             key: 'name'
//         },
//         {
//             title: 'Giá dịch vụ',
//             dataIndex: 'price',
//             key: 'price',
//             render: (price) => price?.toLocaleString('vi-VN')
//         },
//         {
//             title: 'Hành động',
//             key: 'action',
//             render: (_, record) => (
//                 <div>
//                     <Button
//                         icon={<EyeOutlined />}
//                         onClick={() => handleExpandRow(record)}
//                         style={{ marginRight: 8 }}
//                     >
//                         Xem
//                     </Button>
//                     <Button
//                         icon={<EditOutlined />}
//                         onClick={() => handleEdit(record)}
//                         style={{ marginRight: 8 }}
//                     >
//                         Sửa
//                     </Button>
//                     <Button
//                         icon={<DeleteOutlined />}
//                         onClick={() => handleDelete(record)}
//                     >
//                         Xóa
//                     </Button>
//                 </div>
//             )
//         }
//     ];

//     return (
//         <div>
//             <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
//                 <Input
//                     placeholder="Tìm kiếm theo mã hoặc tên dịch vụ"
//                     value={searchKeyword}
//                     onChange={handleSearchChange}
//                     style={{ width: 300 }}
//                 />
//                 <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
//                     Thêm dịch vụ
//                 </Button>
//             </div>

//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 loading={loading}
//                 rowKey="serviceCatalogId"
//                 expandedRowKeys={expandedRowKeys}
//                 onExpand={(expanded, record) =>
//                     setExpandedRowKeys(expanded ? [record.serviceCatalogId] : [])
//                 }
//                 expandedRowRender={(record) => (
//                     <ExpandedRow
//                         record={record}
//                         onSave={handleSave}
//                         onCancel={handleCancel}
//                         isEditing={isEditing}
//                         setIsEditing={setIsEditing}
//                         editingRecord={editingRecord}
//                         setEditingRecord={setEditingRecord}
//                     />
//                 )}
//                 style={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0' }}
//             />
//             <Create
//                 isActive={isModalVisible}
//                 onClose={handleClose}
//                 onRefresh={refreshData}
//             />
//         </div>
//     );
// };

// export default ServiceCatalog;
