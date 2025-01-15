import React, { useState } from "react";
import "./Examine.css"; // Tách CSS ra file riêng
import TapExamineHis from "./TapExamineHis";
import PatientInfoCard from ".././../../components/admin/Examine/PatientInfoCard";
const Examine = () => {
  const [activeTab, setActiveTab] = useState("khambenh");
  const [patients] = useState([
    {
      ReceptionId: 1,
      name: "Nguyễn Văn A",
      age: 35,
      gender: "Nam",
      time: "08:30",
      status: "Đang khám",
      type: "Khám định kỳ",
      phone: "0912345678",
      address: "123 Đường ABC, Quận XYZ",
      history: [
        { year: 2020, description: "Tăng huyết áp" },
        { year: 2021, description: "Dị ứng Penicillin" },
      ],
      lastVisit: {
        date: "15/12/2024",
        diagnosis: "Viêm họng cấp",
        doctor: "Bs. Nguyễn X",
      },
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      time: "09:00",
      status: "Chờ khám",
      type: "Đau đầu, sốt",
      history: [
        { year: 2020, description: "Tăng huyết áp" },
        { year: null, description: "Dị ứng Penicillin" },
      ],
      lastVisit: {
        date: "15/12/2024",
        diagnosis: "Viêm họng cấp",
        doctor: "Bs. Nguyễn X",
      },
    },
    {
        id: 3,
        name: "Trần Thị c",
        age: 28,
        gender: "Nữ",
        time: "09:00",
        status: "Chờ khám",
        type: "Đau đầu, sốt",
      },
      {
        id: 4,
        name: "Trần Thị c",
        age: 28,
        gender: "Nữ",
        time: "09:00",
        status: "Chờ khám",
        type: "Đau đầu, sốt",
      },
      {
        id: 5,
        name: "Trần Thị c",
        age: 28,
        gender: "Nữ",
        time: "09:00",
        status: "Chờ khám",
        type: "Đau đầu, sốt",
      },
      {
        id: 3,
        name: "Trần Thị c",
        age: 28,
        gender: "Nữ",
        time: "09:00",
        status: "Chờ khám",
        type: "Đau đầu, sốt",
      }

  ]);

  const [activePatient, setActivePatient] = useState(patients[0]);


  return (
    <div className="container-patient">
      <Sidebar
        patients={patients}
        activePatient={activePatient}
        setActivePatient={setActivePatient}
      />
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const Sidebar = ({ patients, activePatient, setActivePatient }) => {
  return (
    <div className="sidebar-patient">
      <div className="patient-list">
        <input
          type="search"
          placeholder="Tìm kiếm bệnh nhân..."
          className="search-bar"
        />
        {patients.map((patient) => (
          <PatientItem
            key={patient.id}
            patient={patient}
            isActive={activePatient.id === patient.id}
            onClick={() => setActivePatient(patient)}
          />
        ))}
      </div>
      <div className="patient-info-sidebar">
        <PatientInfoCard patient={activePatient} />
      </div>
    </div>
  );
};

const PatientItem = ({ patient, isActive, onClick }) => {
  return (
    <div
      className={`patient-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{patient.name}</strong>
        <span
          className={`status-badge ${
            patient.status === "Đang khám"
              ? "status-active"
              : "status-waiting"
          }`}
        >
          {patient.status}
        </span>
      </div>
      <div>
        {patient.age} tuổi - {patient.gender} - {patient.time}
      </div>
      <div style={{ color: "#666" }}>{patient.type}</div>
    </div>
  );
};

const MainContent = ({ activeTab, setActiveTab }) => {
  
  return (
    <div className="main-content">
      {/* <div className="quick-actions">
        <button className="btn btn-secondary">📋 Toa mẫu</button>
        <button className="btn btn-secondary">🔍 Tra cứu ICD</button>
        <button className="btn btn-secondary">📊 Xét nghiệm</button>
        <button className="btn btn-secondary">📷 Chẩn đoán hình ảnh</button>
        <div style={{ flex: 1 }}></div>
        <button className="btn btn-primary">💾 Lưu</button>
        <button className="btn btn-primary">🖨️ In toa thuốc</button>
      </div> */}

      <div className="tabs">
        {["Khám bệnh", "Kê đơn", "Lịch sử", "Xét nghiệm", "Giấy tờ"].map(
          (tab, index) => (
            <div
              key={index}
              className={`tab ${activeTab === tab.toLowerCase() ? "active" : ""}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </div>
          )
        )}
      </div>

      <TabContent activeTab={activeTab} />
    </div>
  );
};

const TabContent = ({ activeTab }) => {
 
  const [hisdata] = useState(
    
    {
      "statistics": [
        {
          "value": "24",
          "label": "Tổng số lần khám"
        },
        {
          "value": "4",
          "label": "Số lần khám năm 2024"
        },
        {
          "value": "3",
          "label": "Bệnh mãn tính"
        },
        {
          "value": "85%",
          "label": "Tỷ lệ tuân thủ điều trị"
        }
      ],
      "yearlyRecords": [
        {
          "year": 2024,
          "visitCount": 4
        },
        {
          "year": 2023,
          "visitCount": 8
        },
        {
          "year": 2022,
          "visitCount": 6
        },
        {
          "year": 2021,
          "visitCount": 6
        }
      ],
      "examinations": [
        {
          "id": "exam-2024-01",
          "date": "15/12/2024 - 09:30",
          "doctor": "Bs. Nguyễn Văn A",
          "department": "Khoa Nội tổng hợp",
          "visitType": "Tái khám",
          "vitalSigns": [
            {
              "type": "Nhiệt độ",
              "value": "37.2°C"
            },
            {
              "type": "Huyết áp",
              "value": "120/80"
            },
            {
              "type": "Nhịp tim",
              "value": "78 bpm"
            }
          ],
          "symptoms": [
            "Đau họng, khó nuốt",
            "Ho khan, ngứa cổ họng",
            "Sốt nhẹ"
          ],
          "diagnosis": {
            "name": "Viêm họng cấp",
            "code": "J02.9"
          },
          "testResults": [
            "Công thức máu",
            "CRP"
          ],
          "medications": [
            {
              "name": "Amoxicillin 500mg",
              "instructions": "Uống 1 viên × 2 lần/ngày × 5 ngày"
            },
            {
              "name": "Paracetamol 500mg",
              "instructions": "Uống 1 viên × 3 lần/ngày × 5 ngày"
            },
            {
              "name": "Vitamin C 500mg",
              "instructions": "Uống 1 viên × 1 lần/ngày × 5 ngày"
            }
          ],
          "doctorNotes": [
            "Uống thuốc đều đặn, đúng giờ",
            "Nghỉ ngơi, tránh đồ lạnh",
            "Tái khám sau 5 ngày nếu không đỡ"
          ]
        }
      ]
    }
  
   )
  
    console.log(activeTab)
  switch (activeTab) {
    case "khám bệnh":
      return (
        <div>
          <h2>Khám bệnh</h2>
  <div className="vital-signs">
    <div className="form-group">
      <label>Nhiệt độ (°C)</label>
      <input type="number" step="0.1" defaultValue="37.2" />
    </div>
    <div className="form-group">
      <label>Huyết áp (mmHg)</label>
      <input type="text" defaultValue="120/80" />
    </div>
    <div className="form-group">
      <label>Nhịp tim (/phút)</label>
      <input type="number" defaultValue={80} />
    </div>
    <div className="form-group">
      <label>SpO2 (%)</label>
      <input type="number" defaultValue={98} />
    </div>
    <div className="form-group">
      <label>Chiều cao (cm)</label>
      <input type="number" defaultValue={170} />
    </div>
    <div className="form-group">
      <label>Cân nặng (kg)</label>
      <input type="number" defaultValue={65} />
    </div>
  </div>
  <div className="form-group">
    <label>Lý do khám</label>
    <textarea rows={2} placeholder="Nhập lý do khám..." defaultValue={""} />
  </div>
  <div style={{ marginBottom: 15 }}>
    <label style={{ display: "block", marginBottom: 5}}>
      Mẫu bệnh án nhanh
    </label>
    <div className="examination-templates">
      <div className="template-card">
        <strong>Khám tổng quát</strong>
        <div>Mẫu khám sức khỏe định kỳ</div>
      </div>
      <div className="template-card">
        <strong>Đau đầu</strong>
        <div>Mẫu khám đau đầu, migraine</div>
      </div>
      <div className="template-card">
        <strong>Viêm họng</strong>
        <div>Mẫu khám viêm đường hô hấp</div>
      </div>
    </div>
  </div>
  <div className="form-group diagnosis-suggestions">
    <label>Triệu chứng</label>
    <textarea rows={3} placeholder="Nhập triệu chứng..." defaultValue={""} />
    <div className="suggestions-list" style={{ display: "none" }}>
      <div className="suggestion-item">Đau đầu vùng trán</div>
      <div className="suggestion-item">Sốt nhẹ</div>
      <div className="suggestion-item">Ho khan</div>
    </div>
  </div>
  <div className="form-group">
    <label>Chẩn đoán</label>
    <select style={{ marginBottom: 8 }}>
      <option>-- Chọn ICD --</option>
      <option>J00 - Viêm mũi cấp</option>
      <option>J02.9 - Viêm họng cấp</option>
    </select>
  </div>
        </div>
      );
    case "kedon":
      return (
        <div>
          <h2>Kê đơn</h2>
          {/* Thêm nội dung tab Kê đơn */}
        </div>
      );
    case "lịch sử":
      return (
        <div>
          <h2>Lịch sử</h2>
         <TapExamineHis historyData={hisdata}/>
        </div>
      );
    default:
      return <div>Chọn một tab để xem nội dung</div>;
  }
};

export default Examine;
