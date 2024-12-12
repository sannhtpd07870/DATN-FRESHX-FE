const About = () => {
    return(
        <>
  {/* Header */}
  <header id="header" className="header" />
  {/* Main */}
  <main>
    {/* Hero */}
    <div className="hero--other1">
      <img
        src="./assets/img/hero/bg-other3.png"
        alt=""
        className="hero__image"
      />
      <div className="hero--overlay">
        <h1 className="hero__title heading1">Về chúng tôi</h1>
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
        <a href="#!" className="action__text button-large">
          Tìm Bác sĩ
        </a>
      </div>
      <div className="about">
        <section className="about-content">
          <h2 className="about-content__title">
            Chào mừng bạn đến với Fresh-X.
            <br />
            Chúng tôi là mạng lưới phòng khám sức khỏe hàng đầu Việt Nam.
          </h2>
          <p className="desc1 about-content__desc">
            Fresh-X cam kết vươn tới sự xuất sắc trong thăm khám lâm sàng, đào
            tạo và nghiên cứu, nhằm mang đến dịch vụ chăm sóc sức khỏe tốt nhất
            cho người dân. Với mạng lưới rộng khắp, chúng tôi có hơn 900 giường
            bệnh trải đều trên 12 phòng khám, đáp ứng nhu cầu y tế đa dạng và
            khẩn cấp trên toàn quốc. Sau 5 năm đồng hành cùng sức khỏe cộng
            đồng, Fresh-X tự hào xây dựng uy tín vững chắc nhờ phương châm chăm
            sóc sức khỏe lấy bệnh nhân làm trung tâm, chi phí hợp lý và chất
            lượng không ngừng cải thiện. Sứ mệnh của chúng tôi không chỉ dừng ở
            việc chăm sóc sức khỏe mà còn góp phần vào sự phát triển bền vững và
            an sinh của đất nước. Hiện tại, với đội ngũ hơn 830 nhân viên tận
            tụy và chuyên nghiệp, Fresh-X đã phục vụ trên 5 triệu lượt khám
            ngoại trú trong năm qua, khẳng định vai trò tiên phong trong việc
            nâng cao chất lượng dịch vụ y tế tại Việt Nam.
          </p>
        </section>
      </div>
    </div>
    <div className="about-container">
      <article className="about-container__wrap">
        <img
          src="./assets/img/about/about1.png"
          alt=""
          className="about-container__img"
        />
        <section className="about-container__content">
          <div className="about-container__box">
            <h3 className="heading4">Mục tiêu</h3>
            <p className="desc1 about-container__desc">
              Vì mục tiêu nâng cao sức khỏe và hạnh phúc của mọi người dân Việt
              Nam.
            </p>
          </div>
          <div className="about-container__box">
            <h3 className="heading4">Tầm nhìn</h3>
            <p className="desc1 about-container__desc">
              Trở thành đơn vị dẫn đầu toàn quốc về lĩnh vực chăm sóc sức khỏe
              và là thương hiệu chăm sóc sức khỏe đáng tin cậy nhất ở Việt Nam.
            </p>
          </div>
          <div className="about-container__box">
            <h3 className="heading4">Sứ mệnh</h3>
            <p className="desc1 about-container__desc">
              Vận hành mạng lưới tích hợp các thương hiệu chăm sóc sức khỏe tại
              các thành phố lớn.
            </p>
          </div>
        </section>
      </article>
      <article className="about-container__wrap">
        <section className="about-container__content">
          <div className="about-container__box">
            <h3 className="heading4">Tên gọi của sự Tươi Mới và Đổi Mới</h3>
            <p className="desc1 about-container__desc">
              Bạn có biết không? "Fresh-X" là sự kết hợp độc đáo, mang ý nghĩa
              của sự "tươi mới" và "tiến bộ" trong lĩnh vực chăm sóc sức khỏe.
              "Fresh" thể hiện sự cam kết mang đến những giá trị mới mẻ, cải
              tiến liên tục, trong khi "X" tượng trưng cho yếu tố đột phá, sự
              không giới hạn và khát vọng đổi mới không ngừng. Fresh-X là định
              hướng và là cam kết cho tất cả những gì chúng tôi thực hiện, từ
              thăm khám đến phục vụ và nghiên cứu, nhằm xây dựng một tương lai
              khỏe mạnh và tươi sáng cho cộng đồng.
            </p>
          </div>
        </section>
        <img
          src="./assets/img/about/about2.png"
          alt=""
          className="about-container__img"
        />
      </article>
    </div>
    <div className="container">
      <div className="about-wrap">
        <article className="about-wrap__container">
          <h2 className="about-wrap__title">C</h2>
          <section className="about-wrap__content">
            <h3 className="about-wrap__heading">Cam kết</h3>
            <p className="about-wrap__sub-title">Về chất chất lượng dịch vụ</p>
            <p className="about-wrap__desc desc1">
              Chúng tôi cam kết cung cấp dịch vụ chăm sóc chất lượng với bệnh
              nhân là trung tâm cốt lõi
            </p>
          </section>
        </article>
        <article className="about-wrap__container">
          <h2 className="about-wrap__title">A</h2>
          <section className="about-wrap__content">
            <h3 className="about-wrap__heading">Trách nhiệm</h3>
            <p className="about-wrap__sub-title">Vì sức khỏe người bệnh</p>
            <p className="about-wrap__desc desc1">
              Chúng tôi xây dựng niềm tin với bệnh nhân và người nhà của họ
            </p>
          </section>
        </article>
        <article className="about-wrap__container">
          <h2 className="about-wrap__title">R</h2>
          <section className="about-wrap__content">
            <h3 className="about-wrap__heading">Tôn trọng</h3>
            <p className="about-wrap__sub-title">Vì cộng đồng</p>
            <p className="about-wrap__desc desc1">
              Chúng tôi luôn tôn trọng và công bằng với tất cả mọi người
            </p>
          </section>
        </article>
        <article className="about-wrap__container">
          <h2 className="about-wrap__title">E</h2>
          <section className="about-wrap__content">
            <h3 className="about-wrap__heading">Đồng hành</h3>
            <p className="about-wrap__sub-title">Với người bệnh</p>
            <p className="about-wrap__desc desc1">
              Chúng tôi luôn thấu hiểu và luộn tận tâm trong tất cả điều mình
              làm
            </p>
          </section>
        </article>
      </div>
    </div>
  </main>
</>

    )
}

export default About;