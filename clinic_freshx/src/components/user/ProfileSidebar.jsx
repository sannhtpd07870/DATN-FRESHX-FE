import React from 'react';

const ProfileSidebar = () => {
  return (
    <div className="col-4 col-xl-5 col-lg-6 col-md-12" style={{ height: '700px', width: '370px' }}>
      <aside className="profile__sidebar">
        {/* User */}
        <div className="profile-user">
          <img
            src="./assets/img/doctor/avt1.png"
            alt=""
            className="profile-user__avatar"
          />
          <h1 className="profile-user__name">
            Hoàng Bảo Trung
          </h1>
          <p className="profile-user__desc">
            Đăng ký: ngày 17/12/2024
          </p>
        </div>

        {/* Menu 1 */}
        <div className="profile-menu">
          <h3 className="profile-menu__title">
            Quản lý tài khoản
          </h3>
          <ul className="profile-menu__list">
            <li>
              <a
                href="./edit-personal-info.html"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/user.svg"
                    alt=""
                  />
                </span>
                Thông tin cá nhân
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/mail.svg"
                    alt=""
                  />
                </span>
                Địa chỉ
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/mail.svg"
                    alt=""
                    className="icon"
                  />
                </span>
                Email
              </a>
            </li>
          </ul>
        </div>

        {/* Menu 2 */}
        <div className="profile-menu">
          <h3 className="profile-menu__title">
            Đăng ký và gói
          </h3>
          <ul className="profile-menu__list">
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/protection.svg"
                    alt=""
                    className="icon"
                  />
                </span>
                Gói khám V.I.P
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/protection.svg"
                    alt=""
                    className="icon"
                  />
                </span>
                Bệnh sử
              </a>
            </li>
          </ul>
        </div>

        {/* Menu 3 */}
        <div className="profile-menu">
          <h3 className="profile-menu__title">
            Dịch vụ khách hàng
          </h3>
          <ul className="profile-menu__list">
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/help.svg"
                    alt=""
                    className="icon"
                  />
                </span>
                Hỗ trợ
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="profile-menu__link"
              >
                <span className="profile-menu__icon">
                  <img
                    src="./public/assets/icons/terms.svg"
                    alt=""
                    className="icon"
                  />
                </span>
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProfileSidebar;
