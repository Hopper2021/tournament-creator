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

// TODO Kingdom needs to be a drop down. Suggestions type in would be perfect
// TODO Kingdom_id needs to at least be name if not a drop down
// TODO USER_ID needs to be persona
// TODO Type_ID needs to be tournament_type name
    let [newTournament, setNewTournament] = useState({
        name: '', kingdom_id: '', user_id: '', type_id: ''
    })

    useEffect(() => {
        console.log('Fetiching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
        dispatch({ type: 'FETCH_TYPES' })
    }, [])

    // const handleNameChange = () => {

    // }

    // const handlePropertyChange = () => {
    //     if ( newTournament.name ) {
    //         setNewTournament({...newTournament, name: event.target.value})
    //     } else if ( newTournament.kingdom_id ) {
    //         setNewTournament({...newTournament, kingdom_id: event.target.value})
    //     } else if ( newTournament.user_id ) {
    //         setNewTournament({...newTournament, user_id: event.target.value})
    //     } else if ( newTournament.type_id ) {
    //         setNewTournament({...newTournament, type_id: event.target.value})
    //     }
    // }

    const addNewTournament = () => {
        console.log('In add new tournament');
        dispatch({ type: 'POST_NEW_TOURNAMENT ', payload: newTournament })
        setNewTournament({
            name: '', kingdom_id: '', user_id: '', type_id: ''
        })
    }

    return(
        <>
            {JSON.stringify(newTournament)}
            <h2 className="create-tournament-header">Create Tournament</h2>
            <form className="create-tournament-form" onSubmit={addNewTournament}>
                <input required text="text" className="create-tournament-input"
                    placeholder="Tournament Name"
                    value={newTournament.name}
                    onChange={(event) => setNewTournament({...newTournament, name: event.target.value})}
                />
                <select className="create-tournament-input"
                    value={newTournament.kingdom_id}
                    onChange={(event) => setNewTournament({...newTournament, kingdom_id: event.target.value})}>
                <option value="" disabled selected>Tournament Location</option>
                    {kingdoms.map((kingdom) => (
                        <option value={kingdom.id}>{kingdom.name}</option>
                    ))}
                </select>
                <input required text="text" className="create-tournament-input"
                    placeholder="Organizer Persona"
                    value={newTournament.user_id}
                    onChange={(event) => setNewTournament({...newTournament, user_id: event.target.value})}
                />
                <select 
                    className="create-tournament-input"
                    value={newTournament.type_id}
                    onChange={(event) => setNewTournament({...newTournament, type_id: event.target.value})}>
                <option value="" disabled selected>Tournament Type</option>
                    {types.map((type) => ( 
                        <option value={type.id}>{type.name}</option> 
                    ))}
                </select>

                <br/>
                <Button type="submit" className="button"
                    variant="contained"> 
                    Next
                </Button>
            </form>
        </>
    )
}

export default CreateTournament;