import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import DisplayKingdomName from '../DisplayKingdomName/DisplayKingdomName';

function CreateTournamentEntrants() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const kingdoms = store.kingdoms;
    const entrants = store.entrants;
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        console.log('Fetching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
    }, [])

    const [newEntrant, setNewEntrant] = useState({
        id: '', persona: '', kingdom_id: '', warriors: '', score: ''
    });

    const addEntrant = (event) => {
        event.preventDefault();
        const index = setCounter(counter + 1); // displays entrant number, which is one more than the index
        setNewEntrant({...newEntrant, id: index})
        console.log(newEntrant); 
        dispatch({ type: 'ADD_ENTRANT', payload: newEntrant })
        setNewEntrant({
            id: '', persona: '', kingdom_id: '', warriors: '', score: ''
        })
    }

    const createTournament = () => {
        history.push('/create/scores');
    }

    return (
        <div className="container">
        {JSON.stringify(store.tournaments.newTournament)}
        {JSON.stringify(store.entrants)}

            <h1 className="create-tournament-header">
                {store.tournaments.newTournament.name}
            </h1>
            <h2 className="create-tournament-header" >
                Entrant # {counter}
            </h2>
            <form 
            className="create-tournament-form"
            onSubmit={addEntrant}>
                <input required 
                    type="text" 
                    className="create-tournament-input"
                    value={newEntrant.persona}
                    placeholder="Persona"
                    onChange={(event) => setNewEntrant({...newEntrant, persona: event.target.value})}
                />
                <select required 
                    className="create-tournament-select"
                    value={newEntrant.kingdom_id}
                    onChange={(event) => setNewEntrant({...newEntrant, kingdom_id: event.target.value})}>
                        <option value="" disabled selected>Kingdom</option>
                        {kingdoms.map((kingdom) => (
                            <option value={kingdom.id}>{kingdom.name}</option>
                        ))}
                </select>
                <input 
                    type="number" 
                    className="create-tournament-input"
                    placeholder="Orders of the Warrior"
                    value={newEntrant.warriors}
                    onChange={(event) => setNewEntrant({...newEntrant, warriors: event.target.value})}
                />
                <br />
                <Button 
                    sx={{ bgcolor: red[900] }}
                    variant="contained"
                    type="submit">
                        Add Entrant
                </Button>
            </form>
            <table id="entrants">
                <tr>
                    <th>#</th>
                    <th>Persona</th>
                    <th>Kingdom</th>
                    <th>Warriors</th>
                </tr>
                {entrants.map((entrant, index) => (
                <tr key={entrant.id}>
                    <td>{index + 1}</td>
                    <td>{entrant.persona}</td>
                    <DisplayKingdomName entrant={entrant} />
                    <td>{entrant.warriors}</td>
                </tr>
                ))}
            </table>
            <Button onClick={createTournament}
                sx={{ bgcolor: red[900] }}
                id="create-tournament-button"
                variant="contained">
                    Start Tournament
            </Button>
        </div>
    )
}

export default CreateTournamentEntrants;