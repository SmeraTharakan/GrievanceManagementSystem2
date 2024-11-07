
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Login from './Login/Login.jsx'
import NavBar from './NavBar/NavBar.jsx'
import Grievance from './Grievance/Grievance.jsx'
import { AuthProvider } from './Auth/AuthProvider.jsx';

function App() {

  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grievance" element={<Grievance />} />
        </Routes>
      </AuthProvider>
      
    </Router>
  )
}

export default App
