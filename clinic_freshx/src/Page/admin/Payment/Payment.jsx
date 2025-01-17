import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Modal, Select, Input, message, Tag, Space } from 'antd';
import { PrinterOutlined, QrcodeOutlined } from '@ant-design/icons';
import axios from "../../../services/axiosInstance";

const { Option } = Select;

const Payment = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountPaid, setAmountPaid] = useState(0);
  const [qrModal, setQRModal] = useState(false);
  const [qrCode, setQRCode] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/payment');
      if (response.data.status) {
        setBills(response.data.data);
      }
    } catch (error) {
      message.error('Lỗi khi tải danh sách hóa đơn');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const payload = {
        billId: selectedBill.billId,
        amountPaid: parseFloat(amountPaid),
        paymentDate: new Date().toISOString(),
        paymentMethod: paymentMethod
      };

      await axios.post('/api/payment', payload);
      message.success('Thanh toán thành công');
      setPaymentModal(false);
      fetchBills(); // Refresh danh sách
    } catch (error) {
      message.error('Lỗi khi thanh toán');
    }
  };

  const handlePrint = async (billId) => {
    try {
      const response = await axios.post(`/api/payment/print`, { billId }, {
        responseType: 'blob'
      });
      
      // Tạo URL và tải PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill-${billId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      message.error('Lỗi khi in hóa đơn');
    }
  };

  const generateQRCode = async (bill) => {
    // Tạo dữ liệu cho QR code (có thể tích hợp với các cổng thanh toán như VNPay, MoMo)
    const qrData = {
      amount: bill.totalAmount,
      billId: bill.billId,
      // Thêm các thông tin cần thiết khác
    };
    
    // TODO: Tích hợp với cổng thanh toán để sinh QR code
    console.log('QR Data:', qrData);

    const qrCode = await generateVNPayQR(bill.billId, bill.totalAmount);
    setQRCode(qrCode);
    setQRModal(true);
  };

  const generateVNPayQR = async (billId, amount) => {
    try {
      const response = await axios.post('/api/payment/vnpay/qr', {
        billId,
        amount,
        // Các thông tin khác theo yêu cầu của VNPay
      });
      
      if (response.data.status) {
        // Hiển thị QR code từ response
        return response.data.qrCode;
      }
    } catch (error) {
      message.error('Lỗi khi tạo mã QR');
    }
  };

  const columns = [
    {
      title: 'Mã HĐ',
      dataIndex: 'billId',
      key: 'billId',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        const colors = {
          'Paid': 'success',
          'Partially Paid': 'warning',
          'Pending': 'error'
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'billDetails',
      key: 'totalAmount',
      render: (details) => {
        const total = details.reduce((sum, detail) => sum + detail.subtotal, 0);
        return total.toLocaleString('vi-VN') + ' đ';
      }
    },
    {
      title: 'Chi tiết',
      dataIndex: 'billDetails',
      key: 'details',
      render: (details) => (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {details.map((detail, index) => (
            <li key={index}>
              {`Dịch vụ #${detail.serviceCatalogId}: ${detail.quantity} x ${detail.unitPrice.toLocaleString('vi-VN')}đ`}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.paymentStatus !== 'Paid' && (
            <Button 
              type="primary"
              onClick={() => {
                setSelectedBill(record);
                setAmountPaid(record.billDetails.reduce((sum, detail) => sum + detail.subtotal, 0));
                setPaymentModal(true);
              }}
            >
              Thanh toán
            </Button>
          )}
          <Button 
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record.billId)}
          >
            In
          </Button>
          <Button 
            icon={<QrcodeOutlined />}
            onClick={() => generateQRCode(record)}
          >
            QR
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Danh sách hóa đơn">
        <Table 
          columns={columns}
          dataSource={bills}
          rowKey="billId"
          loading={loading}
        />
      </Card>

      <Modal
        title="Thanh toán hóa đơn"
        open={paymentModal}
        onOk={handlePayment}
        onCancel={() => setPaymentModal(false)}
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>Phương thức thanh toán:</div>
          <Select
            style={{ width: '100%' }}
            value={paymentMethod}
            onChange={setPaymentMethod}
          >
            <Option value="CASH">Tiền mặt</Option>
            <Option value="CARD">Thẻ</Option>
            <Option value="TRANSFER">Chuyển khoản</Option>
          </Select>
        </div>
        
        <div>
          <div style={{ marginBottom: 8 }}>Số tiền thanh toán:</div>
          <Input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            addonAfter="VNĐ"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Payment; 