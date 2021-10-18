import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import UserPage from '../UserPage/UserPage';

function UserPageEdit () {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const kingdoms = useSelector(store => store.kingdoms);
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

    const submitInfo = () => {
        console.log('Updated info - ', userInfo );
        dispatch({ type: 'UPDATE_USER', payload: userInfo })
    }

    return (
        <div>
        { editPage && 
        <form onSubmit={submitInfo}>
            <Button variant='contained' sx={{ float: 'right', mb: 2 }}
            type="submit"
            onClick={toggleEdit}>
                Done
            </Button>
            {JSON.stringify(userInfo)}
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
                <select required className="user-edit-input"
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
                        placeholder="Park Name"
                        onChange={(event) => setUserInfo({...userInfo, park: event.target.value})}
                    />
                </td>
            </tr>
            </table>
        </form>
        }
        { !editPage && 
            <UserPage />
        }
        </div>
    )
}
 export default UserPageEdit;