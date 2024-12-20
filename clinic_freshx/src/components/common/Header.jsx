import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from '../../Page/auth/loginModal';
import { Button, Modal } from 'antd';
const Header = () => {
  const location = useLocation();
  const [isModalActive, setIsModalActive] = useState(false);

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'navbar__item--active' : '';
  };

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="header__inner">
            {/* Header Top Left */}
            <div className="header-top__left">
              <a href="mailto:trunghoang.240500@gmail.com" className="header-top__wrap">
                <img src="./assets/icons/Message.svg" alt="Email" />
                <p className="button-small header-top__text">FreshX@gmail.com</p>
              </a>

              <a href="tel:0823240040" className="header-top__wrap">
                <img src="./assets/icons/phone.svg" alt="Phone" />
                <p className="button-small header-top__text">0823240040</p>
              </a>
            </div>

            <div className="header-top__right">
              {/* Search */}
              <form className="header-search">
                <img src="./assets/icons/Search.svg" alt="Search" className="header-search__icon" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="header-search__input"
                />
              </form>

              <div className="header-top__action">
                <Link to="/book">
                  <img
                    src="./assets/icons/calendar.svg"
                    alt="Booking"
                    className="header-top__booking"
                  />
                </Link>
                {/* <span className="header-top__separate"></span>
                <div className="header-top__language">
                  <div className="header-top__flags">
                    <img
                      src="./assets/img/flag-vi.png"
                      alt="Vietnamese Flag"
                      className="header-top__flag"
                    />
                  </div>
                  <img src="./assets/icons/ArrowDownsvg.svg" alt="Dropdown" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bot">
        <div className="container">
          <div className="header__inner">
            <Link to="/">
              <img src="./assets/img/Logo.png" alt="Logo" className="header-bot__logo" />
            </Link>

            <nav className="navbar">
              <ul className="navbar__list">
                <li className={`navbar__item ${isActive('/')}`}>
                  <Link to="/" className="navbar__link button-small">Trang chủ</Link>
                  <span className="navbar__separate"></span>
                </li>
                <li className={`navbar__item ${isActive('/specialty')}`}>
                  <Link to="/specialty" className="navbar__link button-small">Chuyên Khoa</Link>
                  <span className="navbar__separate"></span>
                </li>
                <li className={`navbar__item ${isActive('/medical')}`}>
                  <Link to="/medical" className="navbar__link button-small">Gói Khám</Link>
                  <span className="navbar__separate"></span>
                </li>
                <li className={`navbar__item ${isActive('/about')}`}>
                  <Link to="/about" className="navbar__link button-small">Về Fresh-X</Link>
                  <span className="navbar__separate"></span>
                </li>
                <li className={`navbar__item ${isActive('/pharmacy-info')}`}>
                  <Link to="/pharmacy-info" className="navbar__link button-small">Thông tin dược</Link>
                  <span className="navbar__separate"></span>
                </li>
              </ul>
            </nav>
            <button className="header__btn" onClick={handleOpenModal}>
          Đăng nhập
        </button>
          </div>
        </div>
        <LoginModal isActive={isModalActive} onClose={handleCloseModal} />
      </div>
      
    </>
  );
};

export default Header;