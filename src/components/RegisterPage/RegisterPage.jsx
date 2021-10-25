import React from 'react';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import background from '../LoginPage/login2.jpeg';


function RegisterPage() {
  const history = useHistory();

  return (
    <div 
    className="container" 
    style={{ backgroundImage: `url(${background})`,
    backgroundPosition: '-150px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: 600 }}
    >
      <h2 className="welcome-back">Welcome</h2>
      <RegisterForm />

      <p className="registered-question">Already registered?</p>
      <center>
        <Button
          type="button"
          variant="contained"
          className="btn btn_asLink"
          sx={{ bgcolor: red[900], fontSize: 18 }}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login Here
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
