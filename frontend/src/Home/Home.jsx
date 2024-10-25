import React from 'react'
import Cover from '../assets/cover2.png'
import './Home.css'

const Home = () => {
  return (
    <>
    <div id='welcome-flex'>
      <img src={Cover} id='img-home'/>
      <div id='welcome'>
        <h1>Welcome to GMS!</h1>
        <br/>
        <h2>Your platform to easily submit, track, and resolve grievances with efficiency and transparency.</h2>
        <button id='signup'>Sign Up</button>
      </div>
      
    </div>
    </>
  );
}

export default Home;
