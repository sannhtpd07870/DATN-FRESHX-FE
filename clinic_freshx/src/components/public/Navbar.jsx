import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/about">Giới Thiệu</Link></li>
                <li><Link to="/services">Dịch Vụ</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
 