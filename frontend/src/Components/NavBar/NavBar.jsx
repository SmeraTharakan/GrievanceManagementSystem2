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
            <nav className="menu-bar">
            <div className='icon'>
            {isLoggedIn && (
            <>
            <ul>
              <li>
                <button className="hamburger-icon" onClick={toggleSidebar}>
                  ☰
                </button>
              </li>
            </ul>
            </>)}
                <img src={Logo} className='logo'/>
                <div className='gms'>GMS</div>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {isLoggedIn ? (
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                ) : (
                    <li><Link to="/login?action=login">Login</Link></li>
                )}
            </ul>
            </nav>
        </div>
    )
}

export default NavBar