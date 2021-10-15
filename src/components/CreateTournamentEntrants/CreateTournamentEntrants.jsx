import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateTournamentEntrants() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const kingdoms = store.kingdoms;
    const [entrantList, setEntrantList] = useState([]);
    const [newEntrant, setNewEntrant] = useState({
        persona: '', kingdom_id: '', warriors: ''
    });

    return (
        <div className="container">
        <h2 className="create-tournament-header">Entrant #: 4</h2>
        <form className="create-tournament-form">
            {/* {JSON.stringify(store.tournaments.newTournament)} */}
            <input required type="text" className="create-tournament-input"
                value={newEntrant.persona}
                placeholder="Persona"
                onChange={(event) => setNewEntrant({...newEntrant, persona: event.target.value})}
            />
            <select required className="create-tournament-select"
                value={newEntrant.kingdom_id}
                onChange={(event) => setNewEntrant({...newEntrant, kingdom_id: event.target.value})}>
                <option value="" disabled selected>Tournament Location</option>
                    {kingdoms.map((kingdom) => (
                        <option value={kingdom.id}>{kingdom.name}</option>
                    ))}
            </select>
            <input type="number" className="create-tournament-input"
                placeholder="Orders of the Warrior"
                value={newEntrant.warriors}
                onChange={(event) => setNewEntrant({...newEntrant, warriors: event.target.value})}
            />
            <br />
            <Button variant="contained"
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
            <tr>
                <td>1</td>
                <td>Hopper</td>
                <td>Celestial Kingdom</td>
                <td>6</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sunshine</td>
                <td>Polaris</td>
                <td>10</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Morpheous</td>
                <td>Dragonspine</td>
                <td>8</td>
            </tr>
        </table>
        <Button 
            id="create-tournament-button"
            variant="contained">
            Create Tournament
        </Button>
        </div>
    )
}

export default CreateTournamentEntrants;