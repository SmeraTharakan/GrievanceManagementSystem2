
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Login from './Components/Login/Login.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'
import SideBar from './Components/SideBar/SideBar.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Grievance from './Components/Grievance/Grievance.jsx'
import Supervisor from './Components/Supervisor/Supervisor.jsx'
import {useAuth} from './Auth/AuthProvider.jsx';
import React, { useState } from 'react';

function App() {

  const {isLoggedIn } = useAuth();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
        <NavBar toggleSidebar={toggleSidebar}/>
        {isLoggedIn && isSidebarVisible && <SideBar/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assign" element={<Supervisor />} />
        </Routes>
      
    </>
  )
}

export default App
