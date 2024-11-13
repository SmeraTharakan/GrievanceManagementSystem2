
import React,{ useState } from 'react';
import './SideBar.css';
import { useAuth } from '../../Auth/AuthProvider';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const {logout,user} = useAuth();
  const location = useLocation();


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
        <li className={location.pathname === "/profile" ? "active" : ""} > 
          <Link to="/profile">Profile</Link>
        </li>
        <li className={location.pathname === "/grievance" ? "active" : ""}>
          <Link to="/grievance">Grievances</Link>
        </li>
        {user.role === 'ASSIGNEE' && (
          <li className={location.pathname === "/assignment" ? "active" : ""}>
            <Link to="/assignment">Assignments</Link>
          </li>
        )}
        {user.role === 'SUPERVISOR' && (
          <li className={location.pathname === "/assign" ? "active" : ""}>
            <Link to="/assign">Assign Grievances</Link>
          </li>
        )}
        <li>
          <div onClick={handleLogout} className="logout-btn">Logout</div>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default SideBar;
