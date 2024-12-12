import { useState } from "react";
import data from "../../assets/data/data.json";
const Specialty = () =>{
    const [modalData, setModalData] = useState(null);

    const openSpeciModal = (index) => {
      setModalData(data.speci[index]);
    };
  
    const closeSpeciModal = () => {
      setModalData(null);
    };
  
    return (
      <main>
        {/* Hero */}
        <div className="hero--other1">
          <img
            src="./assets/img/hero/bg-other2.png"
            alt=""
            className="hero__image"
          />
          <div className="hero--overlay">
            <h1 className="hero__title heading1">Chuyên Khoa</h1>
          </div>
        </div>
  
        <div className="container">
          <div className="action">
            <button className="action__text button-large">Liên hệ</button>
            <span className="action__separate"></span>
            <a href="./book.html" className="action__text button-large">
              Đặt lịch hẹn
            </a>
            <span className="action__separate"></span>
            <a href="#!" className="action__text button-large">
              Tìm Bác sĩ
            </a>
          </div>
  
          <div id="speci" className="speci">
            <section>
              <h2 className="heading2">Chuyên khoa của chúng tôi</h2>
              <p className="desc1 speci__desc">
                Fresh-X cung cấp đa dạng các dịch vụ và chuyên khoa lâm sàng toàn
                diện, kết hợp chuyên môn y khoa với công nghệ tiên tiến để mang lại
                dịch vụ chăm sóc chất lượng cao nhất cho bệnh nhân.
              </p>
            </section>
  
            {data.speci.map((item, index) => (
              <div className="speci-container" key={index}>
                <img src={item.image} alt={item.title} className="speci-image" />
                <section className="speci-container__content">
                <h3 className="speci-container__title">{item.title}</h3>
                <p className="speci-desc">{item.desc}</p>
                <button
                  className="speci-container__btn"
                  data-id={index}
                  onClick={() => openSpeciModal(index)}
                >
                  Tìm hiểu thêm
                </button>
                </section>
              </div>
            ))}
          </div>
        </div>
  
        {modalData && (
          <div className={`modal ${modalData ? "active" : ""}`}>
            <div className="modal-speci">
              <img
                src="./assets/icons/close2.svg"
                alt=""
                className="modal-speci__close modal-close"
                onClick={closeSpeciModal}
              />
              <h3 className="modal-speci__title">{modalData.title}</h3>
              <p className="modal-speci__desc desc1">{modalData.explain}</p>
              <button className="btn">Đặt lịch hẹn</button>
            </div>
            <div
              className="modal__overlay modal-close"
              onClick={closeSpeciModal}
            ></div>
          </div>
        )}
      </main>
    );
  };
export default Specialty;