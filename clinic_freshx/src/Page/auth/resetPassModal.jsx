import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Modal } from "antd";
import "./loginModal.css";

const ResetPassModal = ({  isActive, onClose}) => {
  
  // Google Login Handler
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success: ", decodedToken);
  };
return(<>
<div className={`modal-login resetPass ${isActive ? "active" : ""} `}>
  <div className="modal-login__container">
    <div className="modal-login__close" onClick={onClose}>
      <img src="./assets/icons/close2.svg" alt="" />
    </div>
    <div className="modal-login__col">
      <img src="./assets/img/Logo.png" alt="" className="modal-login__logo" />
      <div className="modal-login__content">
        <h2 className="heading4">Bạn quên mật khẩu sao?</h2>
        <p className="modal-login__desc button-small">
          Nhập Username hoặc email của bạn và chúng tôi sẽ gửi mã khôi phục mật
          khẩu cho bạn
        </p>
      </div>
      <form className="modal-login__form">
        <div className="modal-login__wrap">
          <label className="desc1" htmlFor="email-login">
            Nhập mật khẩu mới
          </label>
          <input
            id="email-login"
            placeholder="Nhập mật khẩu mới"
            type="email"
            className="modal-login__input button-small"
          />
        </div>
        <div className="modal-login__wrap">
          <input
            id="email-login"
            placeholder="Nhập lại mật khẩu"
            type="email"
            className="modal-login__input button-small"
          />
        </div>
        <a
          href="./index-login.html"
          className="modal-login__btn-large button-small"
        >
          Đăng nhập ngay
        </a>
      </form>
    </div>
  </div>
  <div className="modal__overlay" />
</div>
</>)

}

export default ResetPassModal;