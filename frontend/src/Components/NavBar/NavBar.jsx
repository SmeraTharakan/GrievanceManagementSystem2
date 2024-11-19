import {React,useState} from 'react'
import Logo from '../../assets/logoGvm.png'
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../Auth/AuthProvider';
import SideBar from '../SideBar/SideBar.jsx'
import './NavBar.css'

const NavBar = () => {
    const { isLoggedIn ,logout} = useAuth();
    const [isSidebarVisible, setSidebarVisible] = useState(true); 

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

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
                <div className="left-nav">
                    {isLoggedIn && (
                        <div
                            className='menu-icon'
                            onClick={toggleSidebar}
                        >
                            {isSidebarVisible ? <div className='x-icon'>&#x2715; </div> : <div>&#9776;</div>}
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
            {isLoggedIn && isSidebarVisible && <SideBar/>}

        </div>
    )
}

export default NavBar