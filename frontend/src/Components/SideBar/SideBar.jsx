
import React,{ useState } from 'react';
import './SideBar.css';
import { useAuth } from '../../Auth/AuthProvider';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const {logout,user} = useAuth();


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
        {user.role === 'ASSIGNEE' && (
          <li><Link to="/assignment">Assignments</Link></li>
        )}
        {user.role === 'SUPERVISOR' && (
          <li><Link to="/assign">Assign Grievances</Link></li>
        )}
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </div>
    </div>
  );
};

export default SideBar;
