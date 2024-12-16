import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from './axiosInstance';
import { message } from "antd";
const useAuthService = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { login, logout, user } = useContext(UserContext);
    const token = user.token;

    const setAuthToken = (accessToken, expiresInMilliseconds) => {
        const expiresDate = new Date(Date.now() + expiresInMilliseconds);
        Cookies.set('authToken', accessToken, {
            expires: expiresDate,
            secure: true,
            sameSite: 'Strict'
        });
    };
    
    const postLogin = async (email, password) => {
        try {
            const res = await axios.post('api/account/login', { email, password });
    
            console.log('Response from login API:', res); // Log the entire response data
    
            if (res.data && res.data.status == true && res.data.statusCode == 200) {
                console.log("res", res);
                const accessToken = res.data.data.accessToke;
                const userEmail = res.data.data.user.email; // Get user email from the response
                setUserData(res.data.data.user);
                setAuthToken(accessToken, 6000000); // 10 minutes expiry time
                login({
                    isAuthenticated: true,
                    token: accessToken,
                    email: userEmail
                });
                message.success("Đăng Nhập Thành công")
                return res.data.data.user; // Return user data when login is successful
            } else {
                setUserData(null);
                return false; // Return false when login fails
            }
        } catch (err) {
            console.error('Error during login:', err);
            message.error(err.response.data.data[0].message)
            setError(err);
            setUserData(null);  
            return false; // Return false if there's an error
        }
    };

    const getLogout = async () => {
                logout();
                // Xóa cookies khi logout
                Cookies.remove('authToken');
                Cookies.remove('refreshToken');
                return true;

    };
    // Hàm để làm mới token
    const reLogin = async (refreshToken) => {
        try {
            const response = await axios.post('/refresh', { refresh_token: refreshToken });
            const accessToken = response.data.authorization.access_token;
            const newRefreshToken = response.data.authorization.refresh_token;
            const expiresInMilliseconds = 600000; // 10 minutes
            // Cập nhật token mới trong cookies
            console.log("Setting auth token:", accessToken);
            Cookies.set('refreshToken', newRefreshToken, {
                expires: new Date(Date.now() + 60 * 1000), // 1 minute
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });
        console.log("Auth token saved in cookies");

            return accessToken; // Trả về token mới
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Ném ra lỗi nếu không thể làm mới token
        }
    };

    return { user: userData, error, postLogin, getLogout, reLogin };
};

export default useAuthService;
