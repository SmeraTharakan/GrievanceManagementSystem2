// src/AuthProvider.jsx

import React, { createContext, useState, useContext } from 'react';
import api from '../Api/api.jsx'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await api.post('api/auth/login', { email,password });
            setIsLoggedIn(true);
            const { token, id , username ,role} = response.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', id);
            setUser({ email, id, username,role });
            navigate('/grievance');
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await api.post('/api/auth/signup', { username, email, password });
            const { token, id ,role } = response.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', id);
            setUser({ email, id, username,role});
            setIsLoggedIn(true);
            navigate('/grievance');
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
