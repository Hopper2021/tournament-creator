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

    let [newTournament, setNewTournament] = useState({
        name: '', kingdom_id: ''
    })

    // Fetches kingdoms and types on page load for dropdowns
    useEffect(() => {
        console.log('Fetching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
        dispatch({ type: 'FETCH_TYPES' })
    }, [])

    // Post new tournament to database
    const addNewTournament = () => {
        console.log('In add new tournament - ', newTournament.name);
        dispatch({ type: 'SET_NEW_NAME', payload: newTournament.name })
        dispatch({ type: 'SET_NEW_KINGDOM', payload: newTournament.kingdom_id })
        history.push('/create/entrants');
        setNewTournament({
            name: '', kingdom_id: ''
        })
    }

    return(
        <> {/* Create Tournament Form */}
            {JSON.stringify(newTournament)}
            <h2 className="create-tournament-header">Create Tournament</h2>
            <form className="create-tournament-form" onSubmit={addNewTournament}>
                {/* Tournament Name Input */}
                <input required text="text" className="create-tournament-input"
                    placeholder="Tournament Name"
                    value={newTournament.name}
                    onChange={(event) => setNewTournament({...newTournament, name: event.target.value})}
                />
                {/* Tournament Kingdom Drop Down Select */}
                <select required className="create-tournament-select"
                    value={newTournament.kingdom_id}
                    onChange={(event) => setNewTournament({...newTournament, kingdom_id: event.target.value})}>
                <option value="" disabled selected>Tournament Location</option>
                    {kingdoms.map((kingdom) => (
                        <option value={kingdom.id}>{kingdom.name}</option>
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
        </>
    )
}

export default CreateTournament;