import "./history.css"
const TapExamineHis =() => 
    {
        return(
            <div className="history-container">
  {/* Thống kê tổng quan */}
  <div className="history-stats">
    <div className="stat-card">
      <div className="stat-value">24</div>
      <div className="stat-label">Tổng số lần khám</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">4</div>
      <div className="stat-label">Số lần khám năm 2024</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">3</div>
      <div className="stat-label">Bệnh mãn tính</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">85%</div>
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
        <option>Bs. Nguyễn Văn A</option>
        <option>Bs. Trần Thị B</option>
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
      <div className="year-item active">📅 Năm 2024 (4)</div>
      <div className="year-item">📅 Năm 2023 (8)</div>
      <div className="year-item">📅 Năm 2022 (6)</div>
      <div className="year-item">📅 Năm 2021 (6)</div>
    </div>
    <div className="history-details">
      {/* Card lịch sử khám */}
      <div className="history-card">
        <div className="history-header">
          <div>
            <h3>15/12/2024 - 09:30</h3>
            <div style={{ color: "#6c757d" }}>
              Bs. Nguyễn Văn A - Khoa Nội tổng hợp
            </div>
          </div>
          <span className="visit-type visit-followup">Tái khám</span>
        </div>
        <div className="history-content">
          <div className="content-section">
            <h4>Dấu hiệu sinh tồn</h4>
            <div className="vital-signs">
              <div className="vital-item">
                <div className="vital-label">Nhiệt độ</div>
                <div className="vital-value">37.2°C</div>
              </div>
              <div className="vital-item">
                <div className="vital-label">Huyết áp</div>
                <div className="vital-value">120/80</div>
              </div>
              <div className="vital-item">
                <div className="vital-label">Nhịp tim</div>
                <div className="vital-value">78 bpm</div>
              </div>
            </div>
            <h4>Triệu chứng</h4>
            <ul style={{ paddingLeft: 20 }}>
              <li>Đau họng, khó nuốt</li>
              <li>Ho khan, ngứa cổ họng</li>
              <li>Sốt nhẹ</li>
            </ul>
            <h4>Chẩn đoán</h4>
            <div>Viêm họng cấp (J02.9)</div>
            <h4>Kết quả xét nghiệm</h4>
            <div className="test-results">
              <div className="test-item">🔬 Công thức máu</div>
              <div className="test-item">🔬 CRP</div>
            </div>
          </div>
          <div className="content-section">
            <h4>Đơn thuốc</h4>
            <ul className="medication-list">
              <li className="medication-item">
                <div className="medication-name">Amoxicillin 500mg</div>
                <div className="medication-details">
                  Uống 1 viên × 2 lần/ngày × 5 ngày
                </div>
              </li>
              <li className="medication-item">
                <div className="medication-name">Paracetamol 500mg</div>
                <div className="medication-details">
                  Uống 1 viên × 3 lần/ngày × 5 ngày
                </div>
              </li>
              <li className="medication-item">
                <div className="medication-name">Vitamin C 500mg</div>
                <div className="medication-details">
                  Uống 1 viên × 1 lần/ngày × 5 ngày
                </div>
              </li>
            </ul>
            <h4>Lời dặn</h4>
            <div className="doctor-note">
              - Uống thuốc đều đặn, đúng giờ
              <br />
              - Nghỉ ngơi, tránh đồ lạnh
              <br />- Tái khám sau 5 ngày nếu không đỡ
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
      {/* Thêm các card lịch sử khám khác tương tự */}
    </div>
  </div>
</div>

        )
    }
    export default TapExamineHis;