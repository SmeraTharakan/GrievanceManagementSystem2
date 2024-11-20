
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Api/api.jsx'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');
        const role=localStorage.getItem('role')

        if (token && userId && role) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    const login = async (email, password) => {
        try {
            const response = await api.post('api/auth/login', { email,password });
            console.log(response.data);
            const { token, id , username ,role} = response.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', id);
            localStorage.setItem('role',role);
            setIsLoggedIn(true);
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
            localStorage.setItem('role',role);
            setIsLoggedIn(true);
            navigate('/grievance');
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ login, signup, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
