import React, { useState, useEffect } from 'react';
import BaseTable from '../../../components/admin/BaseTable';

const DrugCatalog = () => {
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
            title: 'Trạng thái',
            dataIndex: 'isSuspended',
            key: 'isSuspended',
            render: (isSuspended) => (isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng')
        }
    ];

    const fieldsConfig = [
        { name: 'name', label: 'Tên thuốc', type: 'input', messageRequired: 'Tên thuốc không được để trống',    width: '100%', span: 8,  },
        { name: 'code', label: 'Mã thuốc', type: 'input', messageRequired: 'Mã thuốc không được để trống',    width: '100%',  span: 8 },
        { name: 'unitOfMeasureId', label: 'Đơn vị đo lường', type: 'select', optionKey: 'unitOfMeasureId',    width: '100%', optionValue: 'unitOfMeasureId', optionLabel: 'name', optionConfig: {
            endpoint: '/api/unitofmeasure',
        }, span: 8 },
        { name: 'manufacturerId', label: 'Nhà sản xuất', type: 'select', optionKey: 'supplierId', optionValue: 'supplierId', optionLabel: 'name', optionConfig: {
            endpoint: '/api/supplier',
        }, span: 8 },
        { name: 'countryId', label: 'Quốc gia', type: 'select', optionKey: 'countryId', optionValue: 'countryId', optionLabel: 'name',  optionConfig: {
            endpoint: '/api/country',
        }, span: 8 },
        { name: 'activeIngredient', label: 'Hoạt chất', type: 'input', span: 8 },
        { name: 'usage', label: 'Cách sử dụng', type: 'input', span: 12 },
        { name: 'dosage', label: 'Liều lượng', type: 'input', span: 12 },
        { name: 'effect', label: 'Tác dụng', type: 'input', span: 12 },
        { name: 'drugTypeId', label: 'Loại thuốc', type: 'select', optionKey: 'drugTypeId', optionValue: 'drugTypeId', optionLabel: 'name', optionConfig: {
            endpoint: '/api/drugtype',
        }, span: 12 },
        { name: 'drugClassification', label: 'Phân loại thuốc', type: 'input', span: 12 },
        { name: 'routeOfAdministration', label: 'Đường dùng', type: 'input', span: 12 },
        { name: 'description', label: 'Mô tả', type: 'input', span: 12 },
        { name: 'nationalDrugCode', label: 'Mã thuốc quốc gia', type: 'input', span: 12 },
        { name: 'referenceNumber', label: 'Số tham chiếu', type: 'input', span: 12 },
        { name: 'note1', label: 'Ghi chú 1', type: 'input', span: 12 },
        { name: 'note2', label: 'Ghi chú 2', type: 'input', span: 12 },
        { name: 'note3', label: 'Ghi chú 3', type: 'input', span: 12 },
        { name: 'quantityImported', label: 'Số lượng nhập', type: 'input', span: 12 },
        { name: 'quantityInStock', label: 'Số lượng tồn', type: 'input', span: 12 },
        { name: 'costPrice', label: 'Giá vốn', type: 'input', span: 12 },
        { name: 'unitPrice', label: 'Giá bán', type: 'input', span: 12 },
        { name: 'isSuspended', label: 'Trạng thái', type: 'select', optionKey: 'isSuspended', optionValue: 'valueId', optionLabel: 'name', optionConfig: {
            endpoint: '/api/status',
        },span: 12 },
    ];



    const createConfig = {
        title: "Tạo thuốc mới",
        endpoint: "/api/drugcatalog",
        fields: fieldsConfig
    };

    return (
        <BaseTable
            endpoint="/api/drugcatalog"
            UpdateEndpoint="/api/drugcatalog"
            DeleteEndpoint="/api/drugcatalog"
            columns={columns}
            fieldsConfig={fieldsConfig}
            primaryKey="drugCatalogId"
            createConfig={createConfig}
            searchPlaceholder="Tìm kiếm thuốc"
            createButtonLabel="Tạo thuốc mới"
        />
    );
};

export default DrugCatalog;
