import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import './Sidebar.css';
import { useTheme } from '@mui/material/styles';


const Item = ({ title, to, icon, isActive }) => {
  return (
    <div className={`sidebar-item ${isActive ? 'active' : ''}`}>
      <Link to={to} className="sidebar-link">
        <i className={`item-icon ${icon}`}></i>
        <span className="item-title">{title}</span>
      </Link>
    </div>
  );
};

const SideBar = ({ isOpen, onClose }) => {
  const theme = useTheme();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const userDataCookie = Cookies.get('userData');
    if (userDataCookie) {
      setUser(JSON.parse(userDataCookie));
    }
  }, []);

  // Xử lý click outside
  const handleOverlayClick = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`} style={{ backgroundColor: theme.palette.mode === 'dark' ? '#201f1f' : '#f0f0f0' }}>
        <div className="sidebar-header">
          <button
            className="toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle Sidebar"
          >
            <i className={`fa-solid ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
          </button>

          {!isCollapsed && (
            <div className="profile-section">
              <img
                src="../../assets/img/Logo.png"
                alt="Profile"
                className="admin_logo"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/fK8VeRo2eeeMzk8pBeg4bvUeq8y0jfTUNSyXDHPna5TCxkW6TA.jpg"
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info">
                <span className="profile-name">
                  {userData.userName || 'User Name'}
                </span>
                <span className="profile-role">
                  {userData.userRole || 'Role'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-menu">
  {/* Dashboard Section */}
  <div className="sidebar-section">
    <h4 className="sidebar-section-title">Bảng điều khiển</h4>
    <Item 
      title="Trang chủ" 
      to="/admin" 
      icon="fa-solid fa-house" 
      isActive={location.pathname === '/admin'} 
    />
  </div>



  {/* Admin Section */}
  <div className="sidebar-section">
    <h4 className="sidebar-section-title">Quản trị viên</h4>
    <Item 
      title="Yêu cầu khách hàng" 
      to="/admin/customer" 
      icon="fa-solid fa-envelope-open" 
      isActive={location.pathname === '/admin/customer'} 
    />
    <Item 
      title="Loại thuốc" 
      to="/admin/drugtype" 
      icon="fa-solid fa-pills" 
      isActive={location.pathname === '/admin/drugtype'} 
    />
    <Item 
      title="Bác sĩ" 
      to="/admin/doctor" 
      icon="fa-solid fa-user-md" 
      isActive={location.pathname === '/admin/doctor'} 
    />
    <Item 
      title="Phòng ban" 
      to="/admin/department" 
      icon="fa-solid fa-building" 
      isActive={location.pathname === '/admin/department'} 
    />
    <Item 
      title="Danh mục thuốc" 
      to="/admin/drugcatalog" 
      icon="fa-solid fa-book-medical" 
      isActive={location.pathname === '/admin/drugcatalog'} 
    />
    <Item 
      title="Nhà cung cấp" 
      to="/admin/supplier" 
      icon="fa-solid fa-truck" 
      isActive={location.pathname === '/admin/supplier'} 
    />
  </div>

  {/* Other Section */}
  <div className="sidebar-section">
    <h4 className="sidebar-section-title">Khác</h4>
    <Item 
      title="Tiếp tân" 
      to="/admin/receptionist" 
      icon="fa-solid fa-user-tie" 
      isActive={location.pathname === '/admin/receptionist'} 
    />
    <Item 
      title="Bệnh nhân" 
      to="/admin/patient" 
      icon="fa-solid fa-user-injured" 
      isActive={location.pathname === '/admin/patient'} 
    />
    <Item 
      title="Hiệu thuốc" 
      to="/admin/pharmacy" 
      icon="fa-solid fa-prescription-bottle" 
      isActive={location.pathname === '/admin/pharmacy'} 
    />
  </div>
</div>
{isOpen && (
  <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
)}

{isOpen && (
  <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
)}

        {isOpen && (
          <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
        )}

      </nav>
      {isOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
    </>
  );
};

export default SideBar;
