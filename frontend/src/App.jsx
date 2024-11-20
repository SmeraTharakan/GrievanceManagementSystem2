
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Login from './Components/Login/Login.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Grievance from './Components/Grievance/Grievance.jsx'
import Supervisor from './Components/Supervisor/Supervisor.jsx'
import Users from './Components/Users/Users.jsx'
import Assignee from './Components/Assignee/Assignee.jsx'
import {useAuth} from './Auth/AuthProvider.jsx';
import React, { useState } from 'react';

function App() {


  return (
    <>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assign" element={<Supervisor />} />
          <Route path="/assignment" element={<Assignee />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      
    </>
  )
}

export default App
