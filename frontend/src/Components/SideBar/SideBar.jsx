
import React,{ useState } from 'react';
import './SideBar.css';
import { useAuth } from '../../Auth/AuthProvider';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const {logout} = useAuth();
  const location = useLocation();
  const role=localStorage.getItem('role');


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
        {role === 'ASSIGNEE' && (
          <li className={location.pathname === "/assignment" ? "active" : ""}>
            <Link to="/assignment">Assignments</Link>
          </li>
        )}
        {role === 'SUPERVISOR' && (
          <li className={location.pathname === "/assign" ? "active" : ""}>
            <Link to="/assign">Assign Grievances</Link>
          </li>
        )}
        {role === 'ADMIN' && (
          <li className={location.pathname === "/assign" ? "active" : ""}>
            <Link to="/assign">Grievances and Assignments</Link>
          </li>
        )}
        {role === 'ADMIN' && (
          <li className={location.pathname === "/users" ? "active" : ""}>
            <Link to="/users">Users</Link>
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
