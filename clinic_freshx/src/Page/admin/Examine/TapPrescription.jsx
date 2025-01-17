import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Table, Space, Card, message, AutoComplete } from 'antd';
import axios from "../../../services/axiosInstance";

const TapPrescription = ({ examineId }) => {
  const [form] = Form.useForm();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [searchDrugs, setSearchDrugs] = useState([]);

  useEffect(() => {
    fetchDrugs();
    if (examineId) {
      fetchPrescription();
    }
  }, [examineId]);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(`/api/prescription/${examineId}`);
      if (response.data.status && response.data.data) {
        const prescriptionDetails = response.data.data.details.map(detail => ({
          ...detail,
         // drugName: `${detail.drugCode} - ${detail.drugName}` // Thêm drugName để hiển thị trong AutoComplete
        }));
        setDetails(prescriptionDetails);
      }
    } catch (error) {
      message.error('Lỗi khi tải đơn thuốc');
    }
  };

  const fetchDrugs = async () => {
    try {
      const response = await axios.get('/api/drugcatalog');
      if (response.data.status) {
        setDrugs(response.data.data);
      }
      console.log(response)
    } catch (error) {
      message.error('Lỗi khi tải danh sách thuốc');
    }
  };

  const handleSearch = (value) => {
    if (!value) {
      setSearchDrugs([]);
      return;
    }

    const searchValue = value.toLowerCase();
    const filteredDrugs = drugs.filter(drug => 
      drug.code?.toLowerCase().includes(searchValue) || 
      drug.name?.toLowerCase().includes(searchValue)
    );

    const options = filteredDrugs.map(drug => ({
      value: drug.drugCatalogId.toString(),
      label: `${drug.code} - ${drug.name}`,
      drug: drug
    }));

    setSearchDrugs(options);
  };

  const columns = [
    {
      title: 'Thuốc',
      dataIndex: 'drugCatalogId',
      key: 'drugCatalogId',
      width: 250,
      render: (text, record, index) => (
        <AutoComplete
          value={record.drugName}
          options={searchDrugs}
          onSearch={handleSearch}
          placeholder="Nhập mã hoặc tên thuốc"
          onChange={(value) => {
            handleDetailChange(index, 'drugName', value);
          }}
          onSelect={(value, option) => {
            handleDetailChange(index, 'drugCatalogId', option.drug.drugCatalogId);
            handleDetailChange(index, 'drugName', option.label);
            handleDetailChange(index, 'unitPrice', option.drug.unitPrice);
          }}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Sáng',
      dataIndex: 'morningDose',
      key: 'morningDose',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleDetailChange(index, 'morningDose', value)}
        />
      ),
    },
    {
      title: 'Trưa',
      dataIndex: 'noonDose',
      key: 'noonDose',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleDetailChange(index, 'noonDose', value)}
        />
      ),
    },
    {
      title: 'Chiều',
      dataIndex: 'afternoonDose',
      key: 'afternoonDose',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleDetailChange(index, 'afternoonDose', value)}
        />
      ),
    },
    {
      title: 'Tối',
      dataIndex: 'eveningDose',
      key: 'eveningDose',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleDetailChange(index, 'eveningDose', value)}
        />
      ),
    },
    {
      title: 'Số ngày',
      dataIndex: 'daysOfSupply',
      key: 'daysOfSupply',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={1}
          value={text}
          onChange={(value) => handleDetailChange(index, 'daysOfSupply', value)}
        />
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleDetailChange(index, 'quantity', value)}
        />
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => handleDetailChange(index, 'note', e.target.value)}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 120,
      render: (text) => text?.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (text, record) => {
        const amount = (record.quantity || 0) * (record.unitPrice || 0);
        return amount.toLocaleString('vi-VN') + ' đ';
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleRemoveDrug(index)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;

    // Tự động tính số lượng và thành tiền
    if (['morningDose', 'noonDose', 'afternoonDose', 'eveningDose', 'daysOfSupply'].includes(field)) {
      const detail = newDetails[index];
      const totalDosePerDay = (detail.morningDose || 0) + 
                            (detail.noonDose || 0) + 
                            (detail.afternoonDose || 0) + 
                            (detail.eveningDose || 0);
      detail.quantity = totalDosePerDay * (detail.daysOfSupply || 0);
      detail.totalAmount = detail.quantity * (detail.unitPrice || 0);
    }

    setDetails(newDetails);
  };

  const handleAddDrug = () => {
    setDetails([
      ...details,
      {
        prescriptionId: 0,
        drugCatalogId: 0,
        drugName: '',
        morningDose: 0,
        noonDose: 0,
        afternoonDose: 0,
        eveningDose: 0,
        daysOfSupply: 1,
        quantity: 0,
        unitPrice: 0,
        totalAmount: 0,
        note: ''
      }
    ]);
  };

  const handleRemoveDrug = (index) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const totalAmount = details.reduce((sum, detail) => sum + (detail.totalAmount || 0), 0);
      
      const payload = {
        examineId: examineId,
        totalAmount: totalAmount,
        isPaid: false,
        note: values.note,
        details: details.map(detail => ({
          prescriptionId: 0,
          drugCatalogId: detail.drugCatalogId,
          morningDose: detail.morningDose,
          noonDose: detail.noonDose,
          afternoonDose: detail.afternoonDose,
          eveningDose: detail.eveningDose,
          daysOfSupply: detail.daysOfSupply,
          quantity: detail.quantity,
          totalAmount: detail.totalAmount,
          note: detail.note
        }))
      };

      console.log(payload)
      await axios.post('/api/prescription', payload);
      message.success('Lưu đơn thuốc thành công');
      form.resetFields();
      setDetails([]);
    } catch (error) {
      message.error('Lỗi khi lưu đơn thuốc');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-container">
      <Card title="Kê đơn thuốc">
        <Form form={form} layout="vertical">
          <Form.Item name="note" label="Ghi chú đơn thuốc">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Button type="dashed" onClick={handleAddDrug} style={{ marginBottom: 16 }}>
            + Thêm thuốc
          </Button>

          <Table
            columns={columns}
            dataSource={details}
            rowKey={(record, index) => index}
            pagination={false}
            scroll={{ x: 'max-content' }}
            summary={pageData => {
              const total = pageData.reduce((sum, detail) => 
                sum + (detail.quantity || 0) * (detail.unitPrice || 0), 0
              );
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={7}>Tổng cộng</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    {total.toLocaleString('vi-VN')} đ
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
              );
            }}
          />

          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ marginTop: 16 }}
          >
            Lưu đơn thuốc
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default TapPrescription; 