import React from 'react'
import Logo from '../../assets/logoGvm.png'
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../Auth/AuthProvider';
import './NavBar.css'

const NavBar = ({toggleSidebar}) => {
    const { isLoggedIn ,logout} = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            setError("Please try again.");
        }
    };

    return (
        <div>
            <header className="menu-bar">
                <div className='left-nav'>
                    {isLoggedIn && (
                        <div className="hamburger-icon" onClick={toggleSidebar}>
                        ☰
                        </div>
                    )}
                    <div className='icon-logo'>
                    <img src={Logo} className='g-logo' style={{ width: '50px', height: '50px',marginBottom: '10px'}}/>
                    <div className='gms'>GMS</div>
                    </div>
                </div>
                <div className='right-nav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isLoggedIn ? (
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                    ) : (
                        <li><Link to="/login?action=login">Login</Link></li>
                    )}
                </ul>
                </div>
            </header>
        </div>
    )
}

export default NavBar