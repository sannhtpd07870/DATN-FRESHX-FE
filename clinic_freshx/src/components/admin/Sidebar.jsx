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
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`} style={{ backgroundColor: theme.palette.mode === 'dark' ? '#0d0d0d' : '#f0f0f0' }}>
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
          <Item 
            title="Dashboard" 
            to="/" 
            icon="fa-solid fa-house"
            isActive={location.pathname === '/'} 
          />
          <Item 
            title="Manage User" 
            to="/user" 
            icon="fa-solid fa-users"
            isActive={location.pathname === '/user'} 
          />
          <Item 
            title="Contracts" 
            to="/contracts" 
            icon="fa-solid fa-file-contract"
            isActive={location.pathname === '/contracts'} 
          />
        </div>
      </nav>
      {isOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
    </>
  );
};

export default SideBar;
