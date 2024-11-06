import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../Api/api.jsx';
import './Login.css';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    

    const params = new URLSearchParams(location.search);
    const action = params.get('action') || 'login'; 

    const handleActionChange = (newAction) => {
        navigate(`/login?action=${newAction}`);
    };

    const handleLogin = async () => {
        try {
            const response = await api.post('api/auth/login', { email,password });
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            console.log("Login successful:", token);
            navigate('/grievance'); 
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.log(err);
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await api.post('api/auth/signup', { username:name, email:email,password:password });
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            console.log("Signup successful:", token);
            navigate('/'); 
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action === 'login' ? 'Log In' : 'Sign Up'}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action === 'signup' && (
                    <div className='input'>
                        <img src={user_icon} alt='user icon' />
                        <input
                            type='username'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                
                <div className='input'>
                    <img src={email_icon} alt='email icon' />
                    <input
                        type='email'
                        placeholder='Email id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className='input'>
                    <img src={password_icon} alt='password icon' />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='submit-container'>
                {action === 'login' ? (
                    <>
                        <button className='submit' onClick={handleLogin}>Log In</button>
                        <p>
                            New member?{' '}
                            <a href='#' onClick={() => handleActionChange('signup')}>
                                Sign Up
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <button className='submit' onClick={handleSignUp}>Sign Up</button>
                        <p>
                            Already a member?{' '}
                            <a href='#' onClick={() => handleActionChange('login')}>
                                Log In
                            </a>
                        </p>
                    </>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
