import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import UserPageEdit from '../UserPageEdit/UserPageEdit';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector( (store) => store.user);
  const kingdoms = useSelector(store => store.kingdoms);
  const [editPage, setEditPage] = useState(false);
  const [userInfo, setUserInfo] = useState({
    persona: '', kingdom_id: '', park: ''
})

  // Fetches kingdoms page load for dropdown
  useEffect(() => {
      dispatch({ type: 'FETCH_KINGDOMS' })
  }, [])

  const toggleEdit = () => {
    setEditPage(!editPage); 
    console.log('On edit page? - ', editPage);
  }

  const submitInfo = (event) => {
    event.preventDefault();
    console.log('Updated info - ', userInfo );
    dispatch({ type: 'UPDATE_USER', payload: userInfo })
    setEditPage(!editPage); 
  }
  
  const displayName = () => {
    for (let i=0; i<kingdoms.length; i++) {
        if ( kingdoms[i].id == user.kingdom_id ) {
            return kingdoms[i].name;
        }
    }
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
                    <input className="user-edit-input"
                        placeholder={user.persona}
                        onChange={(event) => setUserInfo({...userInfo, persona: event.target.value})}
                    />
                </td>
            </tr>
            <tr>
                <td>Kingdom:</td>
                <td>
                <select className="user-edit-input"
                        value={userInfo.kingdom_id}
                        onChange={(event) => setUserInfo({...userInfo, kingdom_id: event.target.value})}>
                        <option value="" disabled selected>Home Kingdom</option>
                            {kingdoms.map((kingdom) => (
                                <option 
                                    key={kingdom.id}
                                    value={kingdom.id}>
                                        {kingdom.name}
                                </option>
                            ))}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Park:</td>
                <td>
                    <input className="user-edit-input"
                        placeholder={user.park}
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
