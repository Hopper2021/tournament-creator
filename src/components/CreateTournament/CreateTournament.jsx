import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function CreateTournament() {
    const types = useSelector(store => store.types);
    const kingdoms = useSelector(store => store.kingdoms);
    const tournaments = useSelector(store => store.tournaments); 
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
        dispatchFetch();
        history.push(`/create/entrants`);
    }

    const dispatchFetch = () => {
        dispatch({ type: 'FETCH_NEW_TOURNAMENT' })
    }

    return(
        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' }, }}
        noValidate
        autoComplete="off"
        >
        <div className="container">
             {/* Base Tournament Information Form */}
            <h2 className="create-tournament-header">
                Complete Base Information
            </h2>
            <form className="create-tournament-form" 
            onSubmit={addNewData}>
                {/* Tournament Name Input */}
                <TextField required text="text" className="create-tournament-input"
                    label="Tournament Name"
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
                
                {/* Streaks are a stretch goal */}

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

                <h2 className="header">
                    Select Type
                </h2>
                {/* Type button select */}
                <div className="grid">
                    {types.map((type) => (
                        <div className="select-type">
                            <Button className="type-button" variant="contained"
                                sx={{ bgcolor: grey[400], color: grey[900],
                                    fontSize: 16, m: .4, mb: 4 }} 
                                key={type.id}
                                value={type.id} 
                                onClick={(event) => setNewTournament({...newTournament, type_id: event.target.value})}>
                                    {type.name}
                                <br/>
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
        </Box>
    )
}

export default CreateTournament;