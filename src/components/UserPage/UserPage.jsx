import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector( (store) => store.user );
  const store = useSelector(store => store)
  const history = useHistory();

  const moveToEdit = () => {
    history.push('/user/edit');
  }

  return (
    <div className="container">
      <h2 className="create-tournament-header">Welcome, {user.persona}!</h2>
      <div id="avatar-div">
        <Avatar 
          id="avatar"
          sx={{ width: 200, height: 200, mx: "auto" }} >
          <PersonIcon sx={{ width: 200, height: 200 }}/>
        </Avatar>
      </div>
      <Button variant='contained' sx={{ float: 'right', mb: 2, bgcolor: red[900] }}
        onClick={moveToEdit}>
        Edit
      </Button>
      <table id="entrants">
        <tr>
          <td>Username:</td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td>Kingdom:</td>
          <td>Polaris</td>
        </tr>
        <tr>
          <td>Park:</td>
          <td>Stoneborn Keep</td>
        </tr>
        <tr>
          <td>Tournaments:</td>
          <td>4</td>
        </tr>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
