
import React,{ useState } from 'react';
import './SideBar.css';
import { useAuth } from '../Auth/AuthProvider';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const {logout} = useAuth();


  const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            setError("Please try again.");
        }
  };


  return (
    <div>
    <div className="sidebar">
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/grievance">Grievances</Link></li>
        <li><Link to="/assigned">Assigned</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </div>
    </div>
  );
};

export default SideBar;
