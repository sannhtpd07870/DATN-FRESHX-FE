import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Row, Col, Button, message } from "antd";
import axios from "../../services/axiosInstance";

const BaseCreate = ({ isActive, onClose, onRefresh, createConfig }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [optionsData, setOptionsData] = useState({});

    useEffect(() => {
        if (isActive) {
            form.resetFields();
            fetchAllOptions();
        }
    }, [isActive]);

    const fetchAllOptions = async () => {
        const optionsPromises = createConfig.fields
            .filter(field => field.type === 'select' && field.optionConfig)
            .map(async field => {
                try {
                    const response = await axios.get(field.optionConfig.endpoint);
                    return {
                        fieldName: field.name,
                        options: response.data.data
                    };
                } catch (error) {
                    message.error(`Không thể tải dữ liệu cho ${field.label}`);
                    return {
                        fieldName: field.name,
                        options: []
                    };
                }
            });

        const results = await Promise.all(optionsPromises);
        const newOptionsData = {};
        results.forEach(result => {
            newOptionsData[result.fieldName] = result.options;
        });
        setOptionsData(newOptionsData);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await axios.post(createConfig.endpoint, values);
            message.success('Tạo mới thành công!');
            onClose();
            onRefresh();
        } catch (error) {
          console.error(error)
            message.error(error.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    const renderField = (field) => {
        const commonProps = {
            style: { width: field.width || '100%' }
        };

        switch (field.type) {
            case 'input':
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: !!field.messageRequired,
                                message: field.messageRequired
                            }
                        ]}
                    >
                        <Input {...commonProps} placeholder={`Nhập ${field.label}`} />
                    </Form.Item>
                );

            case 'select':
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: !!field.messageRequired,
                                message: field.messageRequired
                            }
                        ]}
                    >
                        <Select
                            {...commonProps}
                            placeholder={`Chọn ${field.label}`}
                            options={
                                optionsData[field.name]?.map(item => ({
                                    value: item[field.optionLabel],
                                    label: item[field.optionLabel]
                                }))
                            }
                        />
                    </Form.Item>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            title={createConfig.title}
            open={isActive}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={16}>
                    {createConfig.fields.map(field => (
                        <Col span={field.span || 24} key={field.name}>
                            {renderField(field)}
                        </Col>
                    ))}
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo mới
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: 8 }}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BaseCreate;
