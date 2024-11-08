import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicRouter from './Router/Public_router';
import UserRouter from './Router/User_router';
import AdminRouter from './Router/Admin_router';
import { UserContext } from './services/UserContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import ThemeTransition from './components/common/ThemeTransition';
import ThemeBottom from './components/common/ThemeBottom';
const App = () => {
  const [theme, colorMode] = useMode();
  const { user, checkUserRole } = useContext(UserContext);

  // Kiểm tra xem checkUserRole có tồn tại không
  if (!checkUserRole) {
    console.error('checkUserRole is not defined in UserContext');
    return null; // hoặc hiển thị một thông báo lỗi
  }

 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeBottom />
        <ThemeTransition>
          <Router>
            <Routes>
            {/* Public routes */}
            <Route path="/*" element={<PublicRouter />} />

            {/* User routes */}
            <Route
              path="/user/*"
              element={
                checkUserRole() === 'user' ? <UserRouter /> : <Navigate to="/" replace />
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                checkUserRole() === 'admin' ? <AdminRouter /> : <Navigate to="/" replace />
              }
            />

            {/* Redirect based on user role */}
            <Route
              path="/dashboard"
              element={
                (() => {
                  const role = checkUserRole();
                  if (role === 'admin') return <Navigate to="/admin" replace />;
                  if (role === 'user') return <Navigate to="/user" replace />;
                  return <Navigate to="/" replace />;
                })()
              }
            />
          </Routes>
        </Router>
        </ThemeTransition>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
