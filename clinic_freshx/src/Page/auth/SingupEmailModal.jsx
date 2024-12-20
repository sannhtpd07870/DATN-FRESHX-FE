import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Modal } from "antd";
import "./loginModal.css";


const SingupEmailModal = ({  isActive, onClose}) => {
  
  // Google Login Handler
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success: ", decodedToken);
  };

  return(<>
  <div className={`modal-login sign-up phone ${isActive ? "active" : ""} `}>
  <div className="modal-login__container">
    <div className="modal-login__close" onClick={onClose}>
      <img src="./assets/icons/close2.svg" alt="" />
    </div>
    <div className="modal-login__col">
      <img src="./assets/img/Logo.png" alt="" className="modal-login__logo" />
      <div className="modal-login__content">
        <h2 className="heading4">Đăng ký tài khoản Fresh-X</h2>
        <p className="modal-login__desc button-small">
          Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
          dụng sẽ bị khóa.
        </p>
      </div>
      <form className="modal-login__form">
        <div className="modal-login__wrap">
          <label className="desc1" htmlFor="email-login">
            Tên của bạn?
          </label>
          <input
            id="email-signUp"
            placeholder="Email hoặc Username"
            type="text"
            className="modal-login__input button-small"
          />
        </div>
        <div className="modal-login__wrap">
          <button className="desc1 modal-login__text" htmlFor="email-login">
            Đăng ký với số điện thoại
          </button>
          <input
            id="email-signUp"
            placeholder="Email hoặc Username"
            type="email"
            className="modal-login__input button-small"
          />
        </div>
        <input
          id="email-signUp"
          placeholder="Mật khẩu"
          type="password"
          className="modal-login__input button-small"
        />
        <div className="modal-login__wrap-inline">
          <input
            id="email-login"
            placeholder="Nhập mã xác nhận"
            type="email"
            className="button-small"
          />
          <button className="modal-login__btn-small">Gửi mã</button>
        </div>
        <button className="modal-login__btn-large button-small">
          Đăng nhập ngay
        </button>
      </form>
      <div className="modal-login__bot">
        <p className="modal-login__text button-small">
          Bạn chưa có tài khoản?
          <span id="openSignUp" className="modal-login__link">
            Đăng ký ngay
          </span>
        </p>
        <p id="forgotPasswordLink" className="modal-login__link button-small">
          Bạn quên mật khẩu
        </p>
      </div>
    </div>
  </div>
  <div className="modal__overlay" />
</div>

  </>)
}

export default SingupEmailModal;