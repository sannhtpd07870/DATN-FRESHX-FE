// axiosBase.js
import axios from 'axios';
import Cookies from 'js-cookie';

const apiDomain = 'https://your-api-domain.com'; // Replace with your API domain

const axiosInstance = axios.create({
  baseURL: apiDomain,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors to attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        const refreshResponse = await axios.post(`${apiDomain}/api/account/refresh-token`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        // Set new tokens with expiration time
        const accessTokenExpireTime = 60 * 15; // 15 minutes
        const refreshTokenExpireTime = 60 * 60 * 24 * 7; // 7 days

        Cookies.set('accessToken', newAccessToken, { expires: accessTokenExpireTime / (60 * 60 * 24) });
        Cookies.set('refreshToken', newRefreshToken, { expires: refreshTokenExpireTime / (60 * 60 * 24) });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Logout user or handle refresh token failure
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
