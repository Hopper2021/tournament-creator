import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import UserPageEdit from '../UserPageEdit/UserPageEdit';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const kingdoms = useSelector(store => store.kingdoms);
  const [editPage, setEditPage] = useState(false);
  const [userInfo, setUserInfo] = useState({
    persona: '', kingdom_id: '', park: ''
})

  // Fetches kingdoms page load for dropdown
  useEffect(() => {
      dispatch({ type: 'FETCH_KINGDOMS' })
  }, [])

  // Toggles conditional rendering of user info edit from edit button
  const toggleEdit = () => {
    setEditPage(!editPage); 
    console.log('On edit page? - ', editPage);
  }

  // Submits info to the edited and sends user back to profile page
  const submitInfo = (event) => {
    event.preventDefault();
    console.log('Updated info - ', userInfo );
    dispatch({ type: 'UPDATE_USER', payload: userInfo })
    setEditPage(!editPage); 
  }

  // Displays kingdom name based on the kingdom_id passed in
  const displayName = () => {
    for (let i=0; i<kingdoms.length; i++) {
        if ( kingdoms[i].id == user.kingdom_id ) {
            return kingdoms[i].name;
        }
    }
  }

  return (
    <div className="container">
      <h2 className="create-tournament-header">
        Welcome, {user.username}!
      </h2>
      <div id="avatar-div">
        <Avatar 
          id="avatar"
          sx={{ width: 200, height: 200, mx: "auto" }} >
          <PersonIcon sx={{ width: 200, height: 200 }}/>
        </Avatar>
      </div>
      { !editPage && 
      <Button variant='contained' sx={{ float: 'right', mb: 2, bgcolor: red[900] }}
        onClick={toggleEdit}>
        Edit
      </Button>
      }

      { !editPage && 
      <div>
        <table id="entrants"> 
          <tr>
            <td>Username:</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Persona:</td>
            <td>{user.persona}</td>
          </tr>
          <tr>
            <td>Kingdom:</td>
            <td>{displayName(user.kingdom_id)}</td> 
          </tr>
          <tr>
            <td>Park:</td>
            <td>{user.park}</td>
          </tr>
          <tr>
            <td>Tournaments:</td>
            <td>4</td>
          </tr>
        </table>
        <LogOutButton className="btn" /> 
      </div>
      }

      { editPage && 
      <div>
        <form onSubmit={submitInfo}>
          <Button variant='contained' sx={{ float: 'right', mb: 2, bgcolor: red[900] }}
            type="submit">
                Done
          </Button>
            {/* {JSON.stringify(userInfo)} */}
          <table id="entrants">
            <tr>
                <td>Persona:</td>
                <td>
                    <TextField className="user-edit-input"
                        sx={{ width: '15ch' }}
                        variant="standard"
                        label={user.persona}
                        onChange={(event) => setUserInfo({...userInfo, persona: event.target.value})}
                    />
                </td>
            </tr>
            <tr>
                <td>Kingdom:</td>
                <td>
                <TextField className="user-edit-input"select
                        sx={{ width: '15ch' }}
                        SelectProps={{ native: true }}
                        value={userInfo.kingdom_id}
                        label={displayName(userInfo.kingdom_id)}
                        variant="standard"
                        onChange={(event) => setUserInfo({...userInfo, kingdom_id: event.target.value})}>
                        <option value="" disabled selected></option>
                            {kingdoms.map((kingdom) => (
                                <option 
                                    key={kingdom.id}
                                    value={kingdom.id}>
                                        {kingdom.name}
                                </option>
                            ))}
                    </TextField>
                </td>
            </tr>
            <tr>
                <td>Park:</td>
                <td>
                    <TextField className="user-edit-input"
                        sx={{ width: '15ch' }}
                        variant="standard"
                        label={user.park}
                        onChange={(event) => setUserInfo({...userInfo, park: event.target.value})}
                    />
                </td>
            </tr>
          </table>
        </form>
      </div>
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
