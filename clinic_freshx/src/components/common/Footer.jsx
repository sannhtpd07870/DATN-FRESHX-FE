const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer-container">
                        <section className="footer-container__content">
                            <h3 className="footer-container__heading">Làm chủ sức khỏe của bạn</h3>
                            <p className="desc1">
                                Bằng cách nuôi dưỡng những thói quen lành mạnh và nắm lấy sự cân bằng, bạn sẽ mở khóa
                                được nguồn năng lượng của bạn và tận hưởng một cuộc sống tràn đầy sức sống và mục đích
                            </p>
                        </section>
                        <button className="footer-container__btn button-large">
                            Nhận báo giá của bạn
                        </button>
                    </div>

                    <div className="footer__top">
                        <section className="footer-left">
                            <h2 className="heading2">Hành trình hỗ trợ sức khỏe của bạn</h2>
                            <p className="desc1">
                                Các nguồn lực y tế toàn diện, lời khuyên của chuyên gia và cộng đồng hỗ trợ của chúng tôi ở đây để hướng dẫn bạn từng bước.
                            </p>

                            <form action="" className="footer-form">
                                <input
                                    type="text"
                                    className="footer-form__input"
                                    placeholder="Nhập email của bạn"
                                />
                                <button className="footer-form__btn button-large">Gửi</button>
                            </form>
                        </section>

                        <div className="footer-right">
                            <div className="footer-right__menu">
                                <h3 className="footer-right__title button-large">Về Fresh-X</h3>
                                <ul>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Về chúng tôi</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Ứng tuyển</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Bài viết</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Liên hệ</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer-right__menu">
                                <h3 className="footer-right__title button-large">Dành cho nhân viên</h3>
                                <ul>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Kết nối sức khỏe</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Chương trình hỗ trợ nhân viên</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Cổng thông tin sức khỏe</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Dịch vụ sử dụng lao động</a>
                                    </li>
                                    <li className="footer-right__item">
                                        <a href="#!" className="footer-right__link button-small">Hỗ trợ nhân viên</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="footer-bot">
                    <div className="container">
                        <div className="footer-bot__container">
                            <p className="footer-bot__copyright desc2">
                                Bản quyền © 2024 thuộc về phòng khám Fresh-X
                            </p>

                            <div className="footer-bot__socials">
                                <a href="#!" className="footer-bot__social">
                                    <img src="./assets/icons/fb.svg" alt="" />
                                </a>
                                <a href="#!" className="footer-bot__social">
                                    <img src="./assets/icons/tw.svg" alt="" />
                                </a>
                                <a href="#!" className="footer-bot__social">
                                    <img src="./assets/icons/ins.svg" alt="" />
                                </a>
                                <a href="#!" className="footer-bot__social">
                                    <img src="./assets/icons/link.svg" alt="" />
                                </a>
                            </div>

                            <a href="#!" className="footer-bot__link desc2">
                                Các điều khoản & Điều kiện
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Footer;