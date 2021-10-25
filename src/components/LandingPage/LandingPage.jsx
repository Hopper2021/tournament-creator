import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import background from '../LoginPage/login1.jpeg';
import { red, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container"
    style={{ backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: 600 }}>
      <h2 className="welcome-header">{heading}!</h2>
          {/* <RegisterForm />  */}

          <center>
            <Button 
            variant="contained"
            sx={{ bgcolor: red[900], fontSize: 18, 
              borderRadius: 8, width: 270, mb: 3, mt: 52 }}
            onClick={() => history.push('/registration')}>
              Register
            </Button>
            <Button 
            variant="contained"
            sx={{ bgcolor: red[900], fontSize: 18, borderRadius: 8, width: 270 }}
            onClick={() => history.push('/login')}>
              Login
            </Button>
          </center>
        </div>
  );
}

export default LandingPage;
