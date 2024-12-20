const Book =() => {
    return(
        <main>
  {/* Hero */}
  <div className="hero--other1">
    <img src="./assets/img/hero/bg-other1.png" alt="" className="hero__image" />
    <div className="hero--overlay">
      <h1 className="hero__title heading1">Đăng Ký Khám</h1>
    </div>
  </div>
  <div className="container">
    <div className="action">
      <button
        data-target="#modal1"
        className="open-modal action__text button-large"
      >
        Liên hệ
      </button>
      <span className="action__separate" />
      <button
        href="./book.html"
        className="action__text action__text--active button-large"
      >
        Đặt lịch hẹn
      </button>
      <span className="action__separate" />
      <a href="./doctor.html" className="action__text button-large">
        Tìm Bác sĩ
      </a>
    </div>
    {/* Book */}
    <form action="" className="book">
      <div className="book__container">
        <h2 className="heading2">Nội dung chi tiết đặt lịch hẹn</h2>
        <div className="form">
          <div className="form__row">
            {/* Cơ sở */}
            <div className="form-group">
              <label
                htmlFor="facilityInput"
                className="form-group__label heading4"
              >
                Cơ sở
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap">
                <input
                  id="facilityInput"
                  type="text"
                  className="form-group__input"
                  placeholder="Chọn cơ sở"
                  data-input="facilityDrop"
                  readOnly=""
                />
                <button
                  id="facilityBtn"
                  type="button"
                  className="form-group__btn"
                  data-drop-button="facilityDrop"
                >
                  <img src="./assets/icons/arrowDown2.svg" alt="" />
                </button>
              </div>
              <div
                id="facilityDrop"
                className="form-drop"
                data-drop="facilityDrop"
              >
                <p className="form-drop__text desc2">Chọn cơ sở</p>
                <p className="form-drop__text desc2">Fresh-X Hà Nội</p>
                <p className="form-drop__text desc2">Fresh-X Vinh</p>
                <p className="form-drop__text desc2">Fresh-X Đồng Hới</p>
                <p className="form-drop__text desc2">Fresh-X Đồng Hà</p>
                <p className="form-drop__text desc2">Fresh-X Huế</p>
                <p className="form-drop__text desc2">Fresh-X Đà Nẵng</p>
                <p className="form-drop__text desc2">Fresh-X Hội An</p>
                <p className="form-drop__text desc2">Fresh-X Quảng Ngải</p>
                <p className="form-drop__text desc2">Fresh-X Quy Nhơn</p>
                <p className="form-drop__text desc2">Fresh-X Vũng Tàu</p>
                <p className="form-drop__text desc2">Fresh-X Tp.Hồ Chí Minh</p>
                <p className="form-drop__text desc2">Fresh-X Cần Thơ</p>
              </div>
            </div>
            {/* Chuyên khoa */}
            <div className="form-group">
              <label
                htmlFor="specialtyInput"
                className="form-group__label heading4"
              >
                Chuyên khoa
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap">
                <input
                  type="text"
                  className="form-group__input"
                  placeholder="Chọn chuyên khoa"
                  id="specialtyInput"
                  data-input="specialtyDrop"
                  readOnly=""
                />
                <button
                  type="button"
                  className="form-group__btn"
                  id="specialtyBtn"
                  data-drop-button="specialtyDrop"
                >
                  <img src="./assets/icons/arrowDown2.svg" alt="" />
                </button>
              </div>
              <div
                id="specialtyDrop"
                className="form-drop"
                data-drop="specialtyDrop"
              >
                <p className="form-drop__text desc2">Chuyên khoa 1</p>
                <p className="form-drop__text desc2">Chuyên khoa 2</p>
                <p className="form-drop__text desc2">Chuyên khoa 3</p>
              </div>
            </div>
            {/* Bác sĩ */}
            <div className="form-group">
              <label
                htmlFor="doctorInput"
                className="form-group__label heading4"
              >
                Bác sĩ
              </label>
              <div className="form-group__wrap">
                <input
                  type="text"
                  className="form-group__input"
                  placeholder="Chọn Bác sĩ muốn khám"
                  id="doctorInput"
                  data-input="doctorDrop"
                  readOnly=""
                />
                <button
                  type="button"
                  className="form-group__btn"
                  id="doctorBtn"
                  data-drop-button="doctorDrop"
                >
                  <img src="./assets/icons/arrowDown2.svg" alt="" />
                </button>
              </div>
              <div id="doctorDrop" className="form-drop" data-drop="doctorDrop">
                <p className="form-drop__text desc2">Bác sĩ A</p>
                <p className="form-drop__text desc2">Bác sĩ B</p>
                <p className="form-drop__text desc2">Bác sĩ C</p>
              </div>
            </div>
            {/* Checkbox */}
            <div className="form-group--checkbox">
              <input
                id="check"
                type="checkbox"
                className="form-group__input--checkbox"
              />
              <label htmlFor="check" className="form-group__text button-small">
                Đặt hẹn cho người khác
              </label>
            </div>
          </div>
          <div className="form__row">
            {/* Chọn ngày khám  */}
            <div className="form-group">
              <label className="form-group__label heading4">
                Chọn ngày khám
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap">
                {/* Input để hiển thị ngày đã chọn */}
                <input
                  type="text"
                  className="form-group__input"
                  placeholder="dd/mm/yy"
                  id="appointmentDate"
                  readOnly=""
                />
                {/* Nút để mở lịch */}
                <button
                  type="button"
                  className="form-group__btn"
                  id="calendarBtn"
                >
                  <img src="./assets/icons/calendar2.svg" alt="Chọn ngày" />
                </button>
              </div>
            </div>
            <div className="form-group">
              <p className="form-group__text desc2">
                <span className="form-group__note">*</span>Lưu ý: Tổng đài viên
                Fresh-X sẽ gọi lại cho quý khách để xác nhận thông tin thời gian
                dựa theo đăng ký và điều chỉnh nếu cần thiết.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="book__container">
        <h2 className="heading2">Thông tin khách hàng</h2>
        <div action="" className="form">
          <div className="form__row">
            {/* Họ và tên */}
            <div className="form-group form-group--radio">
              <div className="form-group__container">
                <label
                  htmlFor="fullName"
                  className="form-group__label heading4"
                >
                  Họ và tên
                  <span className="form-group__note">*</span>
                </label>
                <div className="form-group__wrap">
                  <input
                    id="fullName"
                    type="text"
                    className="form-group__input"
                    placeholder="Họ và tên của bạn"
                  />
                </div>
              </div>
              <div className="form-group__radio-container">
                <div className="form-group__radio-wrap">
                  <input
                    className="form-group__radio"
                    type="radio"
                    name="sex"
                    id="male"
                  />
                  <label
                    htmlFor="male"
                    className="form-group__text button-small"
                  >
                    Nam
                  </label>
                </div>
                <div className="form-group__radio-wrap">
                  <input
                    className="form-group__radio"
                    type="radio"
                    name="sex"
                    id="female"
                  />
                  <label
                    htmlFor="female"
                    className="form-group__text button-small"
                  >
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="phone" className="form-group__label heading4">
                Số điện thoại
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap form-group__wrap--error">
                <input
                  id="phone"
                  type="tel"
                  className="form-group__input"
                  placeholder="Số điện thoại của bạn"
                />
                <div className="form-group__error" id="phoneError">
                  Số điện thoại không hợp lệ. Vui lòng nhập lại.
                </div>
              </div>
            </div>
          </div>
          <div className="form__row">
            {/* Ngày tháng năm sinh  */}
            <div className="form-group">
              <label htmlFor="birthDay" className="form-group__label heading4">
                Ngày tháng năm sinh
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap">
                <input
                  id="birthDay"
                  type="text"
                  className="form-group__input"
                  placeholder="dd/mm/yy"
                />
                <button type="button" className="form-group__btn">
                  <img src="./assets/icons/calendar2.svg" alt="" />
                </button>
              </div>
            </div>
            {/* Email  */}
            <div className="form-group">
              <label htmlFor="email" className="form-group__label heading4">
                Email
                <span className="form-group__note">*</span>
              </label>
              <div className="form-group__wrap form-group__wrap--error">
                <input
                  id="email"
                  type="email"
                  className="form-group__input"
                  placeholder="Email của bạn"
                />
                <div className="form-group__error" id="emailError">
                  Email là bắt buộc nếu số điện thoại không hợp lệ.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lý do khám */}
        <div className="form__bot">
          <div className="form-group">
            <label htmlFor="reason" className="form-group__label heading4">
              Lý do khám
              <span className="form-group__note">*</span>
            </label>
            <div className="form-group__wrap form-group__wrap--textarea">
              <textarea
                className="form-group__textarea"
                name=""
                id="reason"
                placeholder="Triệu chứng của bạn"
                defaultValue={""}
              />
            </div>
          </div>
          {/* Checkbox */}
          <div className="form-group--checkbox form-group--checkbox-bot">
            <input
              id="check2"
              type="checkbox"
              className="form-group__input--checkbox"
              placeholder="Chọn Bác sĩ muốn khám"
            />
            <label htmlFor="check2" className="form-group__text button-small">
              Tôi đã đọc và xác nhận
              <span className="form-group__term">Điều khoản dịch vụ</span>
              của Phòng khám.
              <span className="form-group__note">*</span>
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="book__btn btn">
        Gửi thông tin
      </button>
    </form>
  </div>
</main>
    )
}

export default Book;