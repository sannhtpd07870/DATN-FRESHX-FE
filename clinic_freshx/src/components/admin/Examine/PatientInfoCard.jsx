import React from 'react';
import { Card, Badge, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './PatientInfoCard.css';

const PatientInfoCard = ({ patient }) => {
  // Kiểm tra dữ liệu đầu vào và cung cấp giá trị mặc định
  const {
    name = 'Không rõ',
    id = 'Không rõ',
    age = 'Không rõ',
    gender = 'Không rõ',
    allergy = null,
    contact = 'Không rõ',
    address = 'Không rõ',
    history = [],
    lastVisit = {},
  } = patient || {};

  const lastVisitDate = lastVisit.date || 'Không rõ';
  const lastVisitDiagnosis = lastVisit.diagnosis || 'Không rõ';
  const lastVisitDoctor = lastVisit.doctor || 'Không rõ';

  return (
    <div className="patient-info-card" bordered>
      {/* Header */}
      <div className="patient-info-header">
        <div>
          <h2 className="patient-name">{name}</h2>
          <div className="patient-details">
            <span>Mã BN: {id}</span>
            <span>{age} tuổi</span>
            <span>{gender}</span>
          </div>
        </div>
        {allergy && (
          <Badge
            count={allergy}
            style={{ backgroundColor: '#ff4d4f' }}
            className="patient-allergy-badge"
          >
            <ExclamationCircleOutlined />
          </Badge>
        )}
      </div>

      <Divider />

      {/* Contact Information */}
      <div className="patient-section">
        <h3>Thông tin liên hệ</h3>
        <p>ĐT: {contact}</p>
        <p>Địa chỉ: {address}</p>
      </div>

      <Divider />

      {/* Medical History */}
      <div className="patient-section">
        <h3>Tiền sử bệnh</h3>
        <ul className="patient-history">
          {history.length > 0 ? (
            history.map((item, index) => (
              <li key={index}>
                <Badge color="blue" text={`${item.year}: ${item.condition || 'Không rõ'}`} />
              </li>
            ))
          ) : (
            <p>Không có thông tin tiền sử bệnh.</p>
          )}
        </ul>
      </div>

      <Divider />

      {/* Last Visit */}
      <div className="patient-section">
        <h3>Lần khám gần nhất</h3>
        <p>Ngày khám: {lastVisitDate}</p>
        <p>Chẩn đoán: {lastVisitDiagnosis}</p>
        <p>Bác sĩ: {lastVisitDoctor}</p>
      </div>
    </div>
  );
};

// Giá trị mặc định nếu không có props truyền vào
PatientInfoCard.defaultProps = {
  patient: {
    name: 'Không rõ',
    id: 'Không rõ',
    age: 'Không rõ',
    gender: 'Không rõ',
    allergy: null,
    contact: 'Không rõ',
    address: 'Không rõ',
    history: [],
    lastVisit: {},
  },
};

export default PatientInfoCard;
