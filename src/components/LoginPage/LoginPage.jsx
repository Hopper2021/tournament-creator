import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import background from './login1.jpeg';
import { red, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="container" style={{ backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: 600 }}>
      <h2 className="welcome-back">Welcome Back!</h2>
      <LoginForm />

      <center>
        <Button
          variant="contained"
          type="button"
          
          sx={{ bgcolor: red[900], mt: 3, fontSize: 18 }}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
