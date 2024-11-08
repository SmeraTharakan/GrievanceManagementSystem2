
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Login from './Login/Login.jsx'
import NavBar from './NavBar/NavBar.jsx'
import SideBar from './SideBar/SideBar.jsx'
import Grievance from './Grievance/Grievance.jsx'
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
        </Routes>
      
    </>
  )
}

export default App
