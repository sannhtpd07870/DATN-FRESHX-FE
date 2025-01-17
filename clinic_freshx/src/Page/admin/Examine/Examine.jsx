import React, { useState, useEffect } from "react";
import "./Examine.css"; // Tách CSS ra file riêng
import TapExamineHis from "./TapExamineHis";
import TapPrescription from './TapPrescription';
import PatientInfoCard from ".././../../components/admin/Examine/PatientInfoCard";
import { Spin, message, Form, Input, InputNumber, Button } from "antd";
import axios from "../../../services/axiosInstance";

const Examine = () => {
  const [activeTab, setActiveTab] = useState("khambenh");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePatient, setActivePatient] = useState(null);

  useEffect(() => {
    fetchWaitingPatients();
  }, []);

  const fetchWaitingPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/reception/examine`);
      if (response.data.status) {
        const formattedPatients = response.data.data.map(patient => ({
          id: patient.receptionId,
          examineId: patient.examineId,
          patientId: patient.patientId,
          name: patient.patientName,
          age: patient.age,
          gender: patient.gender,
          time: patient.admissionDate,
          status: "Chờ khám",
          type: patient.reasonForVisit || "Không có",
          phone: patient.phoneNumber,
          address: patient.address,
          history: patient.medicalHistory,
          lastVisit: patient.lastExamine,
          medicalRecordNumber: patient.medicalRecordNumber
        }));
        setPatients(formattedPatients);
        if (formattedPatients.length > 0) {
          setActivePatient(formattedPatients[0]);
        }
      }
    } catch (error) {
      message.error("Lỗi khi tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-patient">
      <Sidebar
        patients={patients}
        activePatient={activePatient}
        setActivePatient={setActivePatient}
      />
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} activePatient={activePatient} />
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
            isActive={activePatient?.id === patient.id}
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

const MainContent = ({ activeTab, setActiveTab, activePatient }) => {
  
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

      <TabContent activeTab={activeTab} activePatient={activePatient} />
    </div>
  );
};

const TabContent = ({ activeTab, activePatient }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activePatient?.examineId) {
      fetchExamineData();
    } else {
      form.resetFields();
    }
  }, [activePatient]);

  const fetchExamineData = async () => {
    try {
      const response = await axios.get(`/api/examine/${activePatient.examineId}`);
      if (response.data.status) {
        const examData = response.data.data;
        form.setFieldsValue({
          temperature: examData.temperature,
          bloodPressureSystolic: examData.bloodPressureSystolic,
          bloodPressureDiastolic: examData.bloodPressureDiastolic,
          heartRate: examData.heartRate,
          height: examData.height,
          weight: examData.weight,
          symptoms: examData.symptoms,
          diagnosis: examData.diagnosis,
          conclusion: examData.conclusion,
          medicalAdvice: examData.medicalAdvice
        });
      }
    } catch (error) {
      message.error('Lỗi khi tải thông tin khám');
    }
  };

  const handleSubmitExamination = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      const payload = {
        examineId: Number(activePatient?.examineId) || 0,
        receptionId: Number(activePatient?.id) || 0,
        createdDate: new Date().toISOString(),
        createdTime: new Date().toISOString(),
        respiratoryRate: "0",
        bmi: "0",
        symptoms: values.symptoms || "",
        icdCatalogId: null,
        diagnosisDictionaryId: null,
        diagnosis: values.diagnosis || "",
        conclusion: values.conclusion || "",
        medicalAdvice: values.medicalAdvice || "",
        prescriptionId: null,
        templatePrescriptionId: null,
        createdById: "0",
        updatedDate: new Date().toISOString(),
        updatedBy: 0,
        prescriptionNumber: null,
        followUpAppointment: null,
        comorbidities: null,
        comorbidityCodes: null,
        comorbidityNames: null,
        medicalHistory: null,
        examinationDetails: null,
        labSummary: null,
        treatmentDetails: null,
        followUpAppointmentNote: null,
        reasonForVisit: null,
        isPaid: false,
        examinationNote: null,
        isDeleted: 0,
        temperature: values.temperature ? Number(values.temperature) : null,
        height: values.height ? Number(values.height) : null,
        weight: values.weight ? Number(values.weight) : null,
        bloodPressureSystolic: values.bloodPressureSystolic ? Number(values.bloodPressureSystolic) : null,
        bloodPressureDiastolic: values.bloodPressureDiastolic ? Number(values.bloodPressureDiastolic) : null,
        heartRate: values.heartRate ? Number(values.heartRate) : null,
        oxygenSaturation: null,
        visionLeft: null,
        visionRight: null,
        skinCondition: null,
        otherPhysicalFindings: null,
        prescriptions: null
      };

      const response = await axios.put(`/api/examine/${activePatient.examineId}`, payload);

      if (response.data.status) {
        message.success("Lưu thông tin khám thành công");
        fetchExamineData(); // Refresh data after successful update
      } else {
        message.error(response.data.message || "Lỗi khi lưu thông tin khám");
      }
    } catch (error) {
      console.error('Error submitting examination:', error);
      message.error("Lỗi khi lưu thông tin khám: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  switch (activeTab) {
    case "khám bệnh":
      return (
        <div>
          <h2>Khám bệnh</h2>
          <Form 
            form={form} 
            layout="vertical"
            initialValues={{
              temperature: null,
              bloodPressureSystolic: null,
              bloodPressureDiastolic: null,
              heartRate: null,
              height: null,
              weight: null,
              symptoms: "",
              diagnosis: "",
              conclusion: "",
              medicalAdvice: ""
            }}
          >
            <div className="vital-signs">
              <div className="form-group">
                <Form.Item 
                  name="temperature" 
                  label="Nhiệt độ (°C)"
                  rules={[{ type: 'number', message: 'Vui lòng nhập số' }]}
                >
                  <InputNumber step="0.1" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item 
                  name="bloodPressureSystolic" 
                  label="Huyết áp tâm thu"
                  rules={[{ type: 'number', message: 'Vui lòng nhập số' }]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item name="bloodPressureDiastolic" label="Huyết áp tâm trương">
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item name="heartRate" label="Nhịp tim (/phút)">
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item name="height" label="Chiều cao (cm)">
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item name="weight" label="Cân nặng (kg)">
                  <InputNumber />
                </Form.Item>
              </div>
            </div>

            <div className="form-group">
              <Form.Item name="symptoms" label="Triệu chứng">
                <Input.TextArea rows={3} />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item name="diagnosis" label="Chẩn đoán">
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item name="conclusion" label="Kết luận">
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item name="medicalAdvice" label="Lời dặn">
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>

            <Button 
              type="primary"
              onClick={handleSubmitExamination}
              loading={submitting}
              style={{ marginTop: 16 }}
            >
              {submitting ? 'Đang lưu...' : 'Lưu thông tin khám'}
            </Button>
          </Form>
        </div>
      );

    case "kê đơn":
      return (
        <div>
          <h2>Kê đơn</h2>
          <TapPrescription examineId={activePatient?.examineId} />
        </div>
      );

    case "lịch sử":
      return (
        <div>
          <h2>Lịch sử</h2>
          <TapExamineHis patientId={activePatient?.patientId} />
        </div>
      );

    default:
      return <div>Chọn một tab để xem nội dung</div>;
  }
};

export default Examine;
