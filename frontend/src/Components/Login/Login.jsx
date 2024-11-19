import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';
import './Login.css';
import user_icon from '../../assets/person.png';
import password_icon from '../../assets/password.png';
import email_icon from '../../assets/email.png';

const Login = () => {
    const { user,login ,signup} = useAuth();
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

    const handleLogin = async (e) => {
        try {
            await login(email, password);
            console.log("Success");
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            console.error(error)
        }
    };

    const handleSignUp = async () => {
        try {
            await signup(name,email, password);
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <div className='login'>
                <div className='login-text'>{action === 'login' ? 'Log In' : 'Sign Up'}</div>
                <div className='underline'></div>
            </div>
            
            <div className='input-container'>
                {action === 'signup' && (
                    <div className='input-field'>
                        <img src={user_icon} alt='user icon' />
                        <input
                            type='username'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                
                <div className='input-field'>
                    <img src={email_icon} alt='email icon' />
                    <input
                        type='email'
                        placeholder='Email id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className='input-field'>
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
