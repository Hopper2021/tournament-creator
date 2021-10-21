import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import DisplayKingdomName from '../DisplayKingdomName/DisplayKingdomName';
import { useParams } from 'react-router-dom';

function CreateTournamentEntrants() {
    const dispatch = useDispatch();
    const history = useHistory();
    const kingdoms = useSelector(store => store.kingdoms);
    const entrants = useSelector(store => store.tournaments.selectedEntrants);
    const tournament = useSelector(store => store.tournaments.newTournament);
    // displays entrant number, which is one more than the index
    // This is only used for live score keeping
    const [counter, setCounter] = useState(1);
    // Sets the stage for the information needed by entrant table AND tournament_entrant table
    const [newEntrant, setNewEntrant] = useState({
        tourny_id: tournament.id, persona: '', kingdom_id: '', warriors: '', score: ''
    });
    
    useEffect(() => {
        // Grabs all kingdoms to display the name each time the id is referenced
        dispatch({ type: 'FETCH_KINGDOMS' })
        // Grabs most recently created tournament
        dispatch({ type: 'FETCH_NEW_TOURNAMENT' })
        // Grabs entrants associated with most recently made tournament
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: tournament })
        setNewEntrant({ tourny_id: tournament.id })
    }, [tournament.id]) // Attaches current tournament Id to entrant for database use

    const addEntrant = (event) => {
        // Prevents auto reload of form
        event.preventDefault();
        // post the entrant to the server
        dispatch({ type: 'POST_ENTRANT', payload: {newEntrant, tournament} });
        // updates counter for table
        const index = setCounter(counter + 1);
        console.log('tournament in addEntrant button - ', tournament);
        // Resets newEntrant useState
        setNewEntrant({
            tourny_id: tournament.id, persona: '', kingdom_id: '', warriors: '', score: ''
        })
    }

    const moveToScores = () => {
        history.push('/create/scores');
    }

    return (
        <div className="container">
            {/* {JSON.stringify(store.tournaments.newTournament)} */}
            {/* {JSON.stringify(store.tournaments.selectedEntrants)} */}
            {/* {JSON.stringify(store.tournaments.selectedEntrants)} */}
        <h2 className="create-tournament-header">
            {tournament.name}
        </h2>
            <h2 className="create-tournament-header">
                Entrant # {counter}
            </h2>
            <form 
            className="create-tournament-form"
            onSubmit={addEntrant}>
                {/* Persona Input */}
                <input required 
                    type="text" 
                    className="create-tournament-input"
                    value={newEntrant.persona}
                    placeholder="Persona"
                    onChange={(event) => setNewEntrant({...newEntrant, persona: event.target.value})}
                />
                {/* Kingdom dropdown select */}
                <select required 
                    className="create-tournament-select"
                    value={newEntrant.kingdom_id}
                    onChange={(event) => setNewEntrant({...newEntrant, kingdom_id: event.target.value})}>
                        <option value="" disabled selected>Kingdom</option>
                        {kingdoms.map((kingdom) => (
                            <option value={kingdom.id}>{kingdom.name}</option>
                        ))}
                </select>
                {/* Warriors input */}
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