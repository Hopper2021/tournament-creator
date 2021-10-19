import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';

function CreateTournament() {
    const store = useSelector(store => store)
    const types = store.types;
    const kingdoms = store.kingdoms;
    const tournaments = store.tournaments; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [newTournament, setNewTournament] = useState({
        name: '', kingdom_id: '', type_id: ''
    })

    // Fetches kingdoms and types on page load for dropdowns
    useEffect(() => {
        console.log('Fetching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
        dispatch({ type: 'FETCH_TYPES' })
    }, [])

    // Dispatch new tournament data to tournament reducer
    const addNewData = (event) => {
        event.preventDefault();
        dispatch({ type: 'POST_NEW_TOURNAMENT', payload: newTournament })
        history.push(`/create/entrants`);
    }

    return(
        <div className="container">
            {/* Base Tournament Information Form */}
            {JSON.stringify(newTournament)}
            {JSON.stringify(tournaments.newTournament)}
            <h2 className="create-tournament-header">Complete Base Information</h2>
            <form className="create-tournament-form" onSubmit={addNewData}>
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

                <h2 className="header">Select Type</h2>
                {/* {JSON.stringify(types)} */}
                <div className="grid">
                    {types.map((type) => (
                        <div className="grid-col grid-col_3">
                            <Button className="type-button" variant="contained"
                                sx={{ bgcolor: grey[400], color: grey[900],
                                    fontSize: 18, fontWeight: 'heavy' }} 
                                key={type.id}
                                value={type.id} 
                                onClick={(event) => setNewTournament({...newTournament, type_id: event.target.value})}>
                                    {type.name}
                                <br/>
                                {/* TODO CONDITIONAL RENDERING FOR ICONS */}
                            </Button>
                        </div>
                    ))}
                </div>
                <Button type="submit" className="Button"
                    sx={{ bgcolor: red[900] }}
                    variant="contained"> 
                    Next
                </Button>
            </form>
        </div>
    )
}

export default CreateTournament;