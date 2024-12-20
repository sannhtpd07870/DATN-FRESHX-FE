// Import các dependencies cần thiết
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import useAuthService from '../../services/authService';

// Modal Login Component
const LoginModal = ({ isOpen, onClose, onSwitchModal }) => {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const { postLogin } = useAuthService();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    // Xử lý login với Google
    try {
      // Gọi API login Google
      // Nếu thành công:
      navigate('/admin'); // hoặc '/user' tùy role
    } catch (error) {
      message.error('Đăng nhập thất bại');
    }
  };

  const handleEmailPhoneClick = () => {
    setIsEmailLogin(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userData = await postLogin(email, password);
      if (userData) {
        // Kiểm tra role và chuyển hướng
        if (userData.roles.includes('ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/user'); 
        }
      }
    } catch (error) {
      message.error('Đăng nhập thất bại');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-login signIn">
      <div className="modal-login__container">
        <div className="modal-login__close" onClick={onClose}>
          <img src="./assets/icons/close2.svg" alt="" />
        </div>

        {!isEmailLogin ? (
          // Modal login chính
          <>
            <div className="modal-login__content">
              <h2 className="heading4">Đăng nhập vào Fresh-X</h2>
              <p className="modal-login__desc">
                Mỗi người nên sử dụng riêng một tài khoản
              </p>
            </div>

            <div className="modal-login__action">
              <button className="modal-login__btn" onClick={handleGoogleLogin}>
                <img src="./assets/icons/google.svg" alt="" />
                <p>Đăng nhập với Google</p>
              </button>

              <button className="modal-login__btn" onClick={handleEmailPhoneClick}>
                <img src="./assets/icons/user.svg" alt="" />
                <p>Sử dụng Email / số điện thoại</p>
              </button>
            </div>

            <div className="modal-login__bot">
              <p>
                Chưa có tài khoản?
                <span onClick={() => onSwitchModal('signup')}>Đăng ký ngay</span>
              </p>
              <p onClick={() => onSwitchModal('forgot')}>Quên mật khẩu?</p>
            </div>
          </>
        ) : (
          // Form đăng nhập email
          <form onSubmit={handleSubmit}>
            <div className="modal-login__wrap">
              <input
                name="email" 
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="modal-login__wrap">
              <input
                name="password"
                type="password" 
                placeholder="Mật khẩu"
                required
              />
            </div>

            <button type="submit" className="modal-login__btn-large">
              Đăng nhập
            </button>
          </form>
        )}
      </div>
      <div className="modal__overlay" onClick={onClose} />
    </div>
  );
};

// Các modal khác tương tự...

// Component chính quản lý các modal
const AuthModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null); 
  };

  return (
    <>
      <button onClick={() => handleOpenModal('login')}>
        Đăng nhập
      </button>

      <LoginModal 
        isOpen={activeModal === 'login'}
        onClose={handleCloseModal}
        onSwitchModal={handleOpenModal}
      />

      {/* Render các modal khác */}
    </>
  );
};

export default AuthModals;