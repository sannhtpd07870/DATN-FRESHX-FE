import React from 'react';
import BaseTable from '../../../components/admin/BaseTable';

const SupplierCatalog = () => {
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
            title: 'Trạng thái',
            dataIndex: 'isSuspended',
            key: 'isSuspended',
            render: (isSuspended) => (isSuspended ? 'Tạm ngừng' : 'Hoạt động')
        }
    ];

    const fieldsConfig = [
        { name: 'name', label: 'Tên nhà cung cấp', type: 'input', messageRequired: 'Tên nhà cung cấp không được để trống', width: '100%', span: 12 },
        { name: 'nameEnglish', label: 'Tên nhà cung cấp (Tiếng Anh)', type: 'input', width: '100%', span: 12 },
        { name: 'nameRussian', label: 'Tên nhà cung cấp (Tiếng Nga)', type: 'input', width: '100%', span: 12 },
        { name: 'address', label: 'Địa chỉ', type: 'input', width: '100%', span: 12 },
        { name: 'phoneNumber', label: 'Số điện thoại', type: 'input', width: '100%', span: 12 },
        { name: 'fax', label: 'Số fax', type: 'input', width: '100%', span: 12 },
        { name: 'email', label: 'Email', type: 'input', width: '100%', span: 12 },
        { name: 'taxCode', label: 'Mã số thuế', type: 'input', width: '100%', span: 12 },
        { name: 'director', label: 'Giám đốc', type: 'input', width: '100%', span: 12 },
        { name: 'contactPerson', label: 'Người liên hệ', type: 'input', width: '100%', span: 12 },
        { name: 'isForeign', label: 'Nhà cung cấp nước ngoài', type: 'checkbox', span: 12 },
        { name: 'isStateOwned', label: 'Nhà cung cấp nhà nước', type: 'checkbox', span: 12 },
        { name: 'isSuspended', label: 'Hoạt động', type: 'checkbox', optionKey: 'isSuspended', optionValue: 'valueId', optionLabel: 'name', optionConfig: {
            endpoint: '/api/status',
        }, span: 12 },
        { name: 'isPharmaceuticalSupplier', label: 'Nhà cung cấp dược phẩm', type: 'checkbox', span: 12 },
        { name: 'isMedicalConsumableSupplier', label: 'Nhà cung cấp vật tư y tế', type: 'checkbox', span: 12 },
        { name: 'isAssetSupplier', label: 'Nhà cung cấp tài sản', type: 'checkbox', span: 12 },
    ];

    const createConfig = {
        title: "Tạo nhà cung cấp mới",
        endpoint: "/api/supplier",
        fields: fieldsConfig
    };

    return (
        <BaseTable
            endpoint="/api/supplier"
            UpdateEndpoint="/api/supplier/id"
            DeleteEndpoint="/api/supplier"
            columns={columns}
            fieldsConfig={fieldsConfig}
            primaryKey="supplierId"
            createConfig={createConfig}
            searchPlaceholder="Tìm kiếm nhà cung cấp"
            createButtonLabel="Tạo nhà cung cấp mới"
        />
    );
};

export default SupplierCatalog; 