import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import DisplayKingdomName from '../DisplayKingdomName/DisplayKingdomName';
import CreateScoresItem from '../CreateScoresItem/CreateScoresItem';
import { useParams } from 'react-router-dom';

function CreateTournamentEntrants() {
    const allParams = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const kingdoms = store.kingdoms;
    const entrants = store.entrants;
    const tournamentId = store.tournaments.newTournament.id;
    const [counter, setCounter] = useState(1);
    const [newEntrant, setNewEntrant] = useState({
        tourny_id: tournamentId, persona: '', kingdom_id: '', warriors: '', score: ''
    });
    
    useEffect(() => {
        dispatch({ type: 'FETCH_KINGDOMS' })
        dispatch({ type: 'FETCH_NEW_TOURNAMENT' }) // Grabs most recently created tournament // TODO BY THIS USER
        setNewEntrant({ tourny_id: tournamentId })
    }, [tournamentId]) // Attaches current tournament Id to entrant for database use

    const addEntrant = (event) => {
        event.preventDefault();
        const index = setCounter(counter + 1); // displays entrant number, which is one more than the index
        setNewEntrant({ tourny_id: tournamentId })
        // post the entrant to the server
        dispatch({ type: 'POST_ENTRANT', payload: newEntrant });

        dispatch({ type: 'ADD_ENTRANT', payload: newEntrant })
        setNewEntrant({
            tourny_id: tournamentId, persona: '', kingdom_id: '', warriors: '', score: ''
        })
    }

    const moveToScores = () => {
        // dispatch({ type: 'POST_ENTRANT', payload: entrant });
        history.push('/create/scores');
    }

    return (
        <div className="container">
            {JSON.stringify(store.tournaments.newTournament)}
            {JSON.stringify(store.entrants)}
        <h2 className="create-tournament-header">
            {store.tournaments.newTournament.name}
        </h2>
            <h2 className="create-tournament-header">
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
                    <DisplayKingdomName entrant={entrant} setNewEntrant={setNewEntrant}/>
                    <td>{entrant.warriors}</td>
                </tr>
                ))}
            </table>
            <Button onClick={moveToScores}
                sx={{ bgcolor: red[900] }}
                id="create-tournament-button"
                variant="contained">
                    Start Tournament
            </Button>
        </div>
    )
}

export default CreateTournamentEntrants;