
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Login from './Login/Login.jsx'
import Grievance from './Grievance/Grievance.jsx'
import Logo from './assets/logoGvm.png'

function App() {

  return (
    <Router>
      <div>
        <nav className="menu-bar">
          <div className='icon'>
            <img src={Logo} className='logo'/>
            <div className='gms'>GMS</div>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login?action=login">Login</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grievance" element={<Grievance />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
