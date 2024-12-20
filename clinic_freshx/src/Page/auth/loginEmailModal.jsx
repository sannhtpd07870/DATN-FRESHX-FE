import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import useAuthService from "../../services/authService"; // Adjust the import path as needed
import "./loginModal.css";

const LoginEmailModal = ({ isActive, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { postLogin } = useAuthService();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await postLogin(email, password);
            console.log("suscess", success.roles[0])
            if (success.roles[0]== 'admin') {
                navigate('/admin');
            }
            else if (success.roles[0] == 'user') {
              navigate('/user');
            }
        } catch (err) {
            console.error('Error during login:', err);
            message.error("Lỗi đăng nhập");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`modal-login modal-login email ${isActive ? "active" : ""}`}>
                <div className="modal-login__container">
                    <div className="modal-login__close" onClick={onClose}>
                        <img src="./assets/icons/close2.svg" alt="Close" />
                    </div>
                    <div className="modal-login__col">
                        <img src="./assets/img/Logo.png" alt="Logo" className="modal-login__logo" />
                        <div className="modal-login__content">
                            <h2 className="heading4">Đăng nhập vào Fresh-X</h2>
                            <p className="modal-login__desc button-small">
                                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng sẽ bị khóa.
                            </p>
                        </div>
                        <form className="modal-login__form" onSubmit={handleSubmit}>
                            <div className="modal-login__wrap">
                                <input
                                    id="email-login"
                                    placeholder="Email hoặc Username"
                                    type="email"
                                    className="modal-login__input button-small"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-login__wrap">
                                <div className="password-container">
                                    <input
                                        id="password-login"
                                        placeholder="Mật khẩu"
                                        type={showPassword ? "text" : "password"}
                                        className="modal-login__input button-small"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="show-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Ẩn" : "Hiện"}
                                    </button>
                                </div>
                            </div>
                            <div className="modal-login__checkbox">
                                <input type="checkbox" id="checkUser" />
                                <label className="button-small" htmlFor="checkUser">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="modal-login__btn-large button-small"
                                disabled={loading}
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
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
        </>
    );
};

export default LoginEmailModal;
