import React, { createContext, useState } from 'react';

const UserContext = createContext({ 
    isAuthenticated: false, 
    accessToken: "", 
    refreshToken: "",
    user: null 
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
            isAuthenticated: false,
            accessToken: "",
            refreshToken: "",
            user: null
        };
    });

    const login = (userData) => {
        console.log("userdata",userData)
        setUser({
            isAuthenticated: true,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            user: userData.user
        });
        localStorage.setItem('user', JSON.stringify({
            isAuthenticated: true,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            user: userData.user
        }));
    };

    const logout = () => {
        setUser({
            isAuthenticated: false,
            accessToken: "",
            refreshToken: "",
            user: null
        });
        localStorage.removeItem('user');
    };

    const checkUserRole = () => {
        if (!user.isAuthenticated) return 'public';
        console.log("user",user)
        return user.user?.includes('admin') ? 'admin' : 'user';
    };

    return (
        <UserContext.Provider value={{ user, login, logout, checkUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
