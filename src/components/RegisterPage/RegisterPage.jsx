import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="container">
      <h2 className="welcome-header">Welcome</h2>
      <p>This tournament creator app is meant to assist in live score tracking and to provide an easy reference point for past tournament information.</p>
      <p>Fill out the registration form below to get started.</p>
      <RegisterForm />

      <p>Already registered?</p>
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login Here
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
