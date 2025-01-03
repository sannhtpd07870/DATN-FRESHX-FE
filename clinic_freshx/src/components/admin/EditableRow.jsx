import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, Button, message } from 'antd';
import axios from "../../services/axiosInstance";

const { Option } = Select;

const EditableRow = ({ 
    record, 
    onSave, 
    onCancel, 
    isEditing, 
    setIsEditing, 
    editingRecord, 
    setEditingRecord, 
    fieldsConfig,
}) => {
    const [formData, setFormData] = useState({});
    const [optionsData, setOptionsData] = useState({});

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

        
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const updatedData = { ...record, ...formData };
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
        <Form layout="vertical">
            <Row gutter={[10, 16]}>
                {fieldsConfig.map((field) => (
                    <Col span={field.span} key={field.name}>
                     { field.label ? ( <strong>{field.label}: </strong>) : null }
                        {isEditing? (


                            field.type === 'input' ? (
                                
                                <Input
                                    value={formData[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                />
                            ) : field.type === 'select' ? (
                                <Select
                                    value={formData[field.name]}
                                    onChange={(value) => handleInputChange(field.name, value)}
                                    style={{ width: '100%' }}
                                >
                                    {optionsData[field.name]?.map((option) => (
                                        <Option key={option[field.optionKey]} value={option[field.optionValue]}>
                                            {option[field.optionLabel]}
                                        </Option>
                                    ))}
                                </Select>
                            ) : null
                        ) : (
                            field.type === 'select'
                            ? optionsData[field.name]?.find((opt) => opt[field.name] === record[field.optionValue])?.[field.optionLabel] || 'N/A'
                            : field.type === 'date'
                            ? record[field.name]
                              ? new Date(record[field.name]).toLocaleString()
                              : 'Invalid Date'
                            : record[field.name]
                        )}
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
