import React from 'react'
import Cover from '../../assets/cover.png'
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); 

  const handleSignUp = () => {
    navigate("/login?action=signup");
  };
  return (
    <>
    <div id='welcome-container'>
      <img src={Cover} id='img-home'/>
      <div id='welcome'>
        <h1>Welcome to GMS!</h1>
        <br/>
        <p>Your platform to easily submit, track, and resolve grievances with efficiency and transparency.</p>
        <button id='signup' onClick={handleSignUp}>Sign Up</button>
      </div>
      
    </div>
    </>
  );
}

export default Home;
