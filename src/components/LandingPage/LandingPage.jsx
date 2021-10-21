import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2 className="welcome-header">{heading}!</h2>
      <p>This app is meant to assist in live score tracking of 
        Amtgard tournaments and to provide an easy reference 
        point for past tournament information.</p>
      <p>Fill out the registration form to get started!</p>
          <RegisterForm /> 

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
  );
}

export default LandingPage;
