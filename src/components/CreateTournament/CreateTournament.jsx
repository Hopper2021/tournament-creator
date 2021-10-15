import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateTournament() {
    const store = useSelector(store => store)
    const tournament = store.tournaments.tournamentReducer;
    const types = store.types;
    const kingdoms = store.kingdoms;
    const dispatch = useDispatch();
    const history = useHistory();

    const [newKingdom, setNewKingdom] = useState('');
    const [newName, setNewName] = useState('');

    // Fetches kingdoms and types on page load for dropdowns
    useEffect(() => {
        console.log('Fetching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
        dispatch({ type: 'FETCH_TYPES' })
    }, [])

    // Dispatch new tournament data to tournament reducer
    const addNewData = (event) => {
        event.preventDefault();
        console.log('Add new Name - ', newName );
        console.log('Add new Kingdom - ', newKingdom );
        dispatch({ type: 'SET_NEW_NAME', payload: newName })
        dispatch({ type: 'SET_NEW_KINGDOM', payload: newKingdom })
        history.push('/create/entrants');
    }

    return(
        <div className="container"> {/* Create Tournament Form */}
            {/* {JSON.stringify(newData)} */}
            {JSON.stringify(store.tournaments.newTournament)}
            <h2 className="create-tournament-header">Create Tournament</h2>
            <form className="create-tournament-form" onSubmit={addNewData}>
                {/* Tournament Name Input */}
                <input required text="text" className="create-tournament-input"
                    placeholder="Tournament Name"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
                {/* Tournament Kingdom Drop Down Select */}
                <select required className="create-tournament-select"
                    value={newKingdom}
                    onChange={(event) => setNewKingdom(event.target.value)}>
                    <option value="" disabled selected>Tournament Location</option>
                        {kingdoms.map((kingdom) => (
                            <option 
                                key={kingdom.id}
                                value={kingdom.id}>
                                    {kingdom.name}
                            </option>
                        ))}
                </select>
                {/* <select
                    className="create-tournament-select"
                    value={newTournament.type_id}
                    onChange={(event) => setNewTournament({...newTournament, type_id: event.target.value})}>
                <option value="" disabled selected>Tournament Type</option>
                    {types.map((type) => ( 
                        <option value={type.id}>{type.name}</option> 
                    ))}
                </select> */}

                <br/>
                <Button type="submit" className="Button"
                    variant="contained"> 
                    Next
                </Button>
            </form>
        </div>
    )
}

export default CreateTournament;