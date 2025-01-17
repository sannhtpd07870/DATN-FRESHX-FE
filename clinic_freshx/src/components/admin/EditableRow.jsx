import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, Button, message, Checkbox } from 'antd';
import axios from "../../services/axiosInstance";

const { Option } = Select;

const EditableRow = ({
    record,
    onSave,
    onCancel,
    UpdateEndpoint,
    primaryKey,
    isEditing,
    setIsEditing,
    editingRecord,
    setEditingRecord,
    fieldsConfig,
}) => {
    const [formData, setFormData] = useState({});
    const [optionsData, setOptionsData] = useState({});
    const [errors, setErrors] = useState({}); // Thêm state để quản lý lỗi


    useEffect(() => {
        setFormData(fieldsConfig.reduce((acc, field) => {
            acc[field.name] = record[field.name];
            return acc;
        }, {}));
    }, [record, fieldsConfig]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const fetchedData = {};
                for (const field of fieldsConfig) {
                    if (field.type === 'select' && field.optionConfig?.endpoint) {
                        const response = await axios.get(field.optionConfig.endpoint);
                        fetchedData[field.name] = response.data.data;
                    }
                }
                setOptionsData(fetchedData);
            } catch (error) {
                message.error('Không thể tải dữ liệu!');
            }
        };

        fetchOptions();
    }, [fieldsConfig]);

    const validateForm = () => {
        const newErrors = {};
        fieldsConfig.forEach(field => {
            if (field.messageRequired && !formData[field.name]) {
                newErrors[field.name] = field.messageRequired;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            if (!validateForm()) {
                message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
                return;
            }
            const updatedData = { ...record, ...formData };
            await axios.put(`${UpdateEndpoint}/${updatedData[primaryKey]}`,
                updatedData
            );
            message.success('Cập nhật thành công!');
            setIsEditing(false);
            handleCancel();
            await onSave();
        } catch (error) {
            console.error(error)
            if (error.status && error.status === 500) {
                message.error(error.response.data.message)
            }
            if (error.status && error.status === 400 && error.response.data.data.length > 0) {
                const erdata = error.response.data.data
                erdata.map((item) => (
                    message.error(`${item.field}: ${item.message}`)
                ))
            }
            message.error('Cập nhật không thành công!');
        }

        // try {
        //     const updatedData = { ...record, ...formData };
        //     await onSave(updatedData);
        //     setIsEditing(false);
        // } catch (error) {
        //     message.error('Cập nhật không thành công!');   
        // }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingRecord(null);
    };

    return (
        <Form layout="vertical">
            <Row gutter={[10, 16]}>
                {fieldsConfig.map((field) => (
                    <Col span={field.span || 12} key={field.name}>
                        {field.label ? (<strong>{field.label}: </strong>) : null}
                        {isEditing ? (
                            <div>
                                {field.type === 'input' ? (
                                    <>
                                        <Input
                                            type={field.inputType === 'number'? 'number' : 'text'}
                                            value={formData[field.name]}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            status={errors[field.name] ? 'error' : ''}
                                        />
                                        {errors[field.name] && (
                                            <div style={{ color: 'red', fontSize: '14px' }}>{errors[field.name]}</div>
                                        )}
                                    </>
                                ) : field.type === 'select' ? (
                                    <>
                                        <Select
                                            showSearch
                                            value={formData[field.name]}
                                            onChange={(value) => handleInputChange(field.name, value)}
                                            style={{ width: '100%' }}
                                            status={errors[field.name] ? 'error' : ''}
                                        >
                                            {optionsData[field.name]?.map((option) => (
                                                <Option key={option[field.optionKey]} value={option[field.optionValue]}>
                                                    {option[field.optionLabel]}
                                                </Option>
                                            ))}
                                        </Select>
                                        {errors[field.name] && (
                                            <div style={{ color: 'red', fontSize: '14px' }}>{errors[field.name]}</div>
                                        )}
                                    </>
                                ) : field.type === 'checkbox' ? (
                                    <Checkbox
                                        checked={formData[field.name]}
                                        onChange={(e) => handleInputChange(field.name, e.target.checked)}
                                    >
                                    </Checkbox>
                                ) : null
                            }
                            </div>
                        ) : (
                            field.type === 'select' ? (
                                optionsData[field.name]?.find((opt) => opt[field.name] === record[field.optionValue])?.[field.optionLabel] || 'N/A'
                            ) : field.type === 'date' ? (
                                record[field.name] ? new Date(record[field.name]).toLocaleString() : 'Invalid Date'
                            ) : field.type === 'checkbox' ? (
                                <input type="checkbox" checked={!!record[field.name]} disabled />
                            ) : (
                                record[field.name]
                            )
                        )
                        }
                    </Col>
                ))}
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={handleSaveClick}
                        disabled={!isEditing}
                        style={{ marginRight: 8 }}
                    >
                        Lưu
                    </Button>
                    <Button onClick={handleCancel} disabled={!isEditing}>
                        Thoát
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default EditableRow;
