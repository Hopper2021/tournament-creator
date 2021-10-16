import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

function CreateTournamentEntrants() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const kingdoms = store.kingdoms;
    const entrants = store.entrants;
    const kingdom_id = store.entrants.kingdom_id;
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        console.log('Fetching kingdoms in create tournament');
        dispatch({ type: 'FETCH_KINGDOMS' })
    }, [])

    const [newEntrant, setNewEntrant] = useState({
        persona: '', kingdom_id: '', warriors: ''
    });

    const addEntrant = (event) => {
        event.preventDefault();
        setCounter(counter + 1); // displays entrant number, which is one more than the index
        console.log(newEntrant); 
        dispatch({ type: 'ADD_ENTRANT', payload: newEntrant })
        setNewEntrant({
            persona: '', kingdom_id: '', warriors: ''
        })
    }

    const createTournament = () => {
        history.push('/create/scores');
    }

    // const displayKingdomName = (kingdom_id) => {
    //     let result;
    //     for ( let k=0; k<kingdoms.length; k++) {
    //         for ( let e=0; e<entrants.length; e++) {
    //             if ( k.id == e.kingdom_id ) {
    //                 return result = k.name;
    //             }
    //         }
    //     }
    //     return result;
    // }

    return (
        <div className="container">
            {JSON.stringify(kingdom_id)}
        {/* {JSON.stringify(entrants)}
        {JSON.stringify(newEntrant)} */}
        <h1 className="create-tournament-header">
            {store.tournaments.newTournament.name}
        </h1>
        <h2 className="create-tournament-header">Entrant # {counter}</h2>
        <form className="create-tournament-form"
            onSubmit={addEntrant}>
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
            <Button 
                sx={{bgcolor: red[900]}}
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
                <td>{displayKingdomName(entrant.kingdom_id)}</td>
                <td>{entrant.warriors}</td>
            </tr>
            ))}
        </table>
        <Button onClick={createTournament}
            sx={{bgcolor: red[900]}}
            id="create-tournament-button"
            variant="contained">
                Create Tournament
        </Button>
        </div>
    )
}

export default CreateTournamentEntrants;