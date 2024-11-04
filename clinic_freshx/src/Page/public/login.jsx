import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthService from '../../services/authService';
import { UserContext } from '../../services/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { postLogin } = useAuthService();
  const { checkUserRole } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await postLogin(email, password);
      if (result) {
        const role = checkUserRole();
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'user') {
          navigate('/user');
        } else {
          navigate('/');
        }
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
