import React, { useState, useEffect } from 'react';
import heroBackground from '../../assets/img/hero/bg-other3.png';
import data from "../../assets/datajson/dataclien.json";
// Template function
const medicalTemplate = (dataMedical) => {
  return (
    <a href={dataMedical.link} className="medical-container__item">
      <img
        src={dataMedical.image}
        alt=""
        className="medical-container__img"
      />
      <section className="medical-container__content">
        <h3 className="heading4 medical-container__heading">
          {dataMedical.title}
        </h3>
        <p className="medical-container__desc desc2">
          {dataMedical.desc}
        </p>
      </section>
    </a>
  );
};

const Medical = () => {
  const [maternityData, setMaternityData] = useState([]);
  const [physicalData, setPhysicalData] = useState([]);

  useEffect(() => {
    // Fetch data logic here
    // Example:
    // fetchMaternityData().then(data => setMaternityData(data));
    // fetchPhysicalData().then(data => setPhysicalData(data));
    setMaternityData(data.maternity);
    setPhysicalData(data.physical)
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div className="hero--other1">
        <img
          src={heroBackground}
          alt=""
          className="hero__image"
        />
        <div className="hero--overlay">
          <h1 className="hero__title heading1">Gói Khám</h1>
        </div>
      </div>

      <div className="container">
        <div className="action">
          <button
            data-target="#modal1"
            className="action__text button-large open-modal"
            onClick={() => {
              // Open modal logic
              const modal = document.querySelector('#modal1');
              if (modal) modal.classList.add('show');
            }}
          >
            Liên hệ
          </button>
          <span className="action__separate"></span>
          <a href="./book.html" className="action__text button-large">
            Đặt lịch hẹn
          </a>
          <span className="action__separate"></span>
          <a href="#!" className="action__text button-large">
            Tìm Bác sĩ
          </a>
        </div>

        <div className="medical">
          <div className="medical-container">
            <h2 className="medical-container__title">Thai sản</h2>
            <div
              id="maternity"
              className="medical-container__maternity"
            >
              {maternityData.map((item, index) => medicalTemplate(item))}
            </div>
          </div>

          <div className="medical-container">
            <h2 className="medical-container__title">Khám sức khỏe</h2>
            <div
              id="physical"
              className="medical-container__maternity"
            >
              {physicalData.map((item, index) => medicalTemplate(item))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Medical;