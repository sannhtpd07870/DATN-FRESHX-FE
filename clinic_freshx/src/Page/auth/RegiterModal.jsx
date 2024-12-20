import React from 'react';
import { Modal, Button, Row, Col, Typography, Input, Checkbox, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

const RegistrationModal = ({ visible, onCancel }) => {
  return (
    <Modal title={<Title level={5}>Đăng ký tài khoản Fresh-X</Title>} visible={visible} footer={null} onCancel={onCancel}>
      <Row justify="center" align="middle">
        <Col span={24} style={{ textAlign: 'center' }}>
          <img src="https://storage.googleapis.com/a1aa/image/nlCk1fhxSVTFGymQ3thyDkIRQSIwBrLeFcEAszRit90VvJ7TA.jpg" alt="Fresh X logo" width="50" height="50" />
        </Col>
        <Col span={24}>
          <Paragraph>
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng sẽ bị khóa.
          </Paragraph>
        </Col>
        <Col span={24}>
          <Button block icon={<GoogleOutlined />} style={{ marginBottom: '10px' }}>
            Đăng ký với Google
          </Button>
        </Col>
        <Col span={24}>
          <Button block icon={<FacebookOutlined />} style={{ marginBottom: '10px' }}>
            Đăng ký với Facebook
          </Button>
        </Col>
        <Col span={24}>
          <Button block icon={<MailOutlined />} style={{ marginBottom: '10px' }}>
            Sử dụng Email / số điện thoại
          </Button>
        </Col>
        <Col span={24}>
          <Text>Bạn đã có tài khoản? <Link href="#">Đăng nhập ngay</Link></Text>
        </Col>
        <Col span={24}>
          <Text type="danger">Bạn quên mật khẩu</Text>
        </Col>
      </Row>
    </Modal>
  );
};

export default RegistrationModal;