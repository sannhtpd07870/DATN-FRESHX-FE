const Doctor = () => {
    return(
        <main>
  {/* Hero */}
  <div className="hero--other1">
    <img src="./assets/img/hero/bg-other1.png" alt="" className="hero__image" />
    <div className="hero--overlay">
      <h1 className="hero__title heading1">Tìm Bác Sĩ</h1>
    </div>
  </div>
  <div className="container">
    <div className="action">
      <button
        data-target="#modal1"
        className="action__text button-large open-modal"
      >
        Liên hệ
      </button>
      <span className="action__separate" />
      <a href="./book.html" className="action__text button-large">
        Đặt lịch hẹn
      </a>
      <span className="action__separate" />
      <a href="#!" className="action__text action__text--active button-large">
        Tìm Bác sĩ
      </a>
    </div>
    <div className="action-large">
      <div className="action-large__container">
        <div className="action-large__wrap">
          <img src="./assets/icons/address.svg" alt="" />
          <p className="desc2">Lựa chọn cơ sở</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
        <span className="action-large__separate" />
        <div className="action-large__wrap">
          <img src="./assets/icons/expertise.svg" alt="" />
          <p className="desc2">Yêu cầu chuyên môn</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
        <span className="action-large__separate" />
        <div className="action-large__wrap">
          <img src="./assets/icons/laguage.svg" alt="" />
          <p className="desc2">Ngôn ngữ</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
        <span className="action-large__separate" />
        <div className="action-large__wrap">
          <img src="./assets/icons/job.svg" alt="" />
          <p className="desc2">Nghề nghiệp</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
        <span className="action-large__separate" />
        <div className="action-large__wrap">
          <img src="./assets/icons/academicTitle.svg" alt="" />
          <p className="desc2">Học hàm</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
        <span className="action-large__separate" />
        <div className="action-large__wrap">
          <img src="./assets/icons/academicTitle.svg" alt="" />
          <p className="desc2">Học vị</p>
          <button>
            <img src="./assets/icons/arrowDown3.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="action-large__bot">
        <div className="action-large__wrap">
          <img src="./assets/icons/searchDoctor.svg" alt="" />
          <input
            placeholder="Nhập tên Bác sĩ...."
            type="search"
            className="action-large__input"
          />
        </div>
        <button className="action-large__btn btn">Tìm Bác sĩ</button>
      </div>
    </div>
    <h2 className="heading2">Danh sách Bác sĩ</h2>
    <div id="doctor" className="doctor" />
  </div>
</main>

    )
}

export default Doctor;