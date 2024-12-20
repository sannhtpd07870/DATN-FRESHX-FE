import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Modal } from "antd";
import "./loginModal.css";
import LoginEmail from "./loginEmailModal"
import SingupEmailModal from "./SingupEmailModal";
import ResetPassModal from "./resetPassModal";

const LoginModal = ({  isActive, onClose}) => {
  const [modalLogin, SetModalLogin] = useState(false);
  const [modalSingUp, setModalSingUp] = useState(false);
  const [modalResetPass, setModalResetPass] = useState(false);
  // Google Login Handler
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success: ", decodedToken);
  };

  const handleOpenModalSingin = () => {
    SetModalLogin(true);
    onClose
  };

  const handleCloseModalSingin = () => {
    SetModalLogin(false);

  };

  const handleOpenModalSingup = () => {
    setModalSingUp(true);
    onClose
  };

  const handleCloseModalSingup = () => {
    setModalSingUp(false);

  };

  
  const handleOpenModalResset = () => {
    setModalResetPass(true);
  };

  const handleCloseModalResset = () => {
    setModalResetPass(false);

  };
  
  return (
    <>
    <div className={`modal-login signInc ${isActive ? "active" : ""} `}>
  <div className="modal-login__container">
    <div className="modal-login__close" onClick={onClose}>
      <img src="./assets/icons/close2.svg" alt="" />
    </div>
    <div className="modal-login__col">
      <img src="./assets/img/Logo.png" alt="" className="modal-login__logo" />
      <div className="modal-login__content">
        <h2 className="heading4">Đăng nhập vào Fresh-X</h2>
        <p className="modal-login__desc button-small">
          Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
          dụng sẽ bị khóa.
        </p>
      </div>
      <div className="modal-login__action">
        {/* <a href="./index-login.html" className="modal-login__btn">
          <img src="./assets/icons/google.svg" alt="" />
          <p className="button-small">Đăng nhập với Google</p>
        </a> */}
              <GoogleLogin 
                style={{ 
                width:100,
                height:100  
            }}
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log("Google login failed")}
          />
        <a href="./index-login.html" className="modal-login__btn">
          <img src="./assets/icons/face.svg" alt="" />
          <p className="button-small">Đăng nhập với Facebook</p>
        </a>
        <div className="modal-login__btn open-login">
          <img src="./assets/icons/user.svg" alt="" />
          <p className="button-small" onClick={handleOpenModalSingin} >Sử dụng Email / số điện thoại</p>
        </div>
      </div>
      <div className="modal-login__bot">
        <p className="modal-login__text button-small">
          Bạn chưa có tài khoản?
          <span className="modal-login__link signup" onClick={handleOpenModalSingup}> Đăng ký ngay</span>
        </p>
        <p className="modal-login__link forgot button-small" onClick={handleOpenModalResset}>
          Bạn quên mật khẩu
        </p>
      </div>
    </div>
  </div>
  <div className="modal__overlay" />
</div>
<LoginEmail isActive={modalLogin} onClose={handleCloseModalSingin} />
<SingupEmailModal isActive={modalSingUp} onClose={handleCloseModalSingup} />
<ResetPassModal isActive={modalResetPass} onClose={handleCloseModalResset} />
</>
  );
};

export default LoginModal;
