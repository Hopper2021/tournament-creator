import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector( (store) => store.user );
  const store = useSelector(store => store)
  return (
    <div className="container">
      <h2 className="create-tournament-header">Welcome, {user.username}!</h2>
      <div id="avatar-div">
        <Avatar 
          id="avatar"
          sx={{ width: 200, height: 200, mx: "auto" }} >
          <PersonIcon sx={{ width: 200, height: 200 }}/>
        </Avatar>
      </div>
      <Button variant='contained' sx={{ float: 'right', mb: 2 }}>
        Edit
      </Button>
      <table id="entrants">
        <tr>
          <td>Id:</td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>Persona:</td>
          <td>{user.persona}</td>
        </tr>
        <tr>
          <td>Kingdom:</td>
          <td>Polaris</td>
        </tr>
        <tr>
          <td>Park:</td>
          <td>Stoneborn Keep</td>
        </tr>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
