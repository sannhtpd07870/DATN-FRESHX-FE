import React, { useState, useEffect } from "react";
import "./history.css";
import { Spin, message } from "antd";
import axios from "../../../services/axiosInstance";

const TapExamineHis = ({ patientId }) => {
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetchHistory();
    }
  }, [patientId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/patient/gethistory/${patientId}`);
      if (response.data.status) {
        setHistoryData(response.data.data);
      }
    } catch (error) {
      message.error("Lỗi khi tải lịch sử khám");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;
  if (!historyData) return null;

  return (
    <div className="history-container">
      {/* Thống kê tổng quan */}
      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-value">{historyData.totalVisits}</div>
          <div className="stat-label">Tổng số lần khám</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{historyData.visitsThisYear.visitCount}</div>
          <div className="stat-label">Số lần khám năm {historyData.visitsThisYear.year}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">-</div>
          <div className="stat-label">Bệnh mãn tính</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">-</div>
          <div className="stat-label">Tỷ lệ tuân thủ điều trị</div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="history-filters">
        <div className="filter-group">
          <label>Tìm kiếm</label>
          <input
            type="search"
            placeholder="Tìm theo triệu chứng, chẩn đoán..."
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Bác sĩ</label>
          <select className="filter-input">
            <option>Tất cả bác sĩ</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Loại khám</label>
          <select className="filter-input">
            <option>Tất cả</option>
            <option>Khám mới</option>
            <option>Tái khám</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Thời gian</label>
          <select className="filter-input">
            <option>Tất cả</option>
            <option>30 ngày gần đây</option>
            <option>3 tháng gần đây</option>
            <option>6 tháng gần đây</option>
          </select>
        </div>
      </div>

      {/* Timeline và Chi tiết */}
      <div className="history-timeline">
        <div className="timeline-years">
          {/* Group by year logic can be added here */}
          <div className="year-item active">📅 Năm {historyData.visitsThisYear.year}</div>
        </div>
        <div className="history-details">
          {historyData.patientMedicalHistory.map((record) => (
            <div key={record.receptionId} className="history-card">
              <div className="history-header">
                <div>
                  <h3>{new Date(record.examine.date).toLocaleString('vi-VN')}</h3>
                  <div style={{ color: "#6c757d" }}>
                    {record.examine.doctorName || "Chưa có thông tin"} - {record.examine.department || "Chưa có thông tin"}
                  </div>
                </div>
                <span className="visit-type visit-followup">
                  {record.examine.treatmentDetails || "Khám bệnh"}
                </span>
              </div>
              <div className="history-content">
                <div className="content-section">
                  <h4>Dấu hiệu sinh tồn</h4>
                  <div className="vital-signs">
                    <div className="vital-item">
                      <div className="vital-label">Nhiệt độ</div>
                      <div className="vital-value">{record.examine.temperature || '-'}°C</div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-label">Huyết áp</div>
                      <div className="vital-value">
                        {record.examine.bloodPressureSystolic || '-'}/{record.examine.bloodPressureDiastolic || '-'}
                      </div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-label">Nhịp tim</div>
                      <div className="vital-value">{record.examine.heartRate || '-'} bpm</div>
                    </div>
                  </div>
                  <h4>Triệu chứng</h4>
                  <ul style={{ paddingLeft: 20 }}>
                    <li>{record.examine.symptoms || "Không có triệu chứng"}</li>
                  </ul>
                  <h4>Chẩn đoán</h4>
                  <div>{record.examine.diagnosis || "Chưa có chẩn đoán"}</div>
                  <h4>Kết quả xét nghiệm</h4>
                  <div className="test-results">
                    {record.lapResult ? (
                      <>
                        <div className="test-item">🔬 {record.lapResult.description || "Không có mô tả"}</div>
                        <div>{record.lapResult.conclusion || "Không có kết luận"}</div>
                      </>
                    ) : (
                      <div>Không có kết quả xét nghiệm</div>
                    )}
                  </div>
                </div>
                <div className="content-section">
                  <h4>Đơn thuốc</h4>
                  {record.examine.prescriptionExamine ? (
                    <ul className="medication-list">
                      {record.examine.prescriptionExamine.details.map((med) => (
                        <li key={med.prescriptionDetailId} className="medication-item">
                          <div className="medication-name">
                            {med.drugName || `Thuốc #${med.drugCatalogId}`}
                          </div>
                          <div className="medication-details">
                            Sáng: {med.morningDose}, Trưa: {med.noonDose}, 
                            Chiều: {med.afternoonDose}, Tối: {med.eveningDose} × {med.daysOfSupply} ngày
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Không có đơn thuốc</div>
                  )}
                  <h4>Lời dặn</h4>
                  <div className="doctor-note">
                    {record.examine.medicalAdvice || "Không có lời dặn"}
                  </div>
                </div>
              </div>
              <div className="history-footer">
                <button className="action-btn btn-primary">
                  🔄 Tái sử dụng đơn thuốc
                </button>
                <button className="action-btn btn-secondary">🖨️ In đơn thuốc</button>
                <button className="action-btn btn-secondary">
                  📄 Xem phiếu khám
                </button>
                <button className="action-btn btn-secondary">
                  📊 Xem kết quả XN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TapExamineHis;