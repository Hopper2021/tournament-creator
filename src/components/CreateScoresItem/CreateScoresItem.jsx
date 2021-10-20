import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CreateScoresItem({ entrant, index }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store)
    const tournament = store.tournaments.newTournament;
    const [newScore, setNewScore] = useState(0);
    const [entrantScore, setEntrantScore] = useState({
        tournament_id: tournament.id, entrant_id: entrant.id, score: newScore
    })

    const handleMinus = () => { 
        if ( newScore > 0 ) {
            setNewScore(newScore - 1);
        }
        dispatch({ type: 'SET_ENTRANT_SCORE', payload: entrantScore })
    }

    const handlePlus = () => {
        if ( newScore >= 0 ) {
            setNewScore(newScore + 1); 
        }
        dispatch({ type: 'SET_ENTRANT_SCORE', payload: entrantScore })
    }

    return(
        <tr>
            <td id="index-table-data">{index + 1}</td>
            <td>{entrant.persona}</td>
            <td id="score-table-data">
            <DoDisturbOnIcon onClick={handleMinus}
                sx={{ fontSize: 50 }}/>
                <span id="score-counter"
                value={entrant.score}
                onChange={(event) => setEntrantScore({...entrantScore, score: event.target.value})}>
                    {newScore}
                </span>
            <AddCircleIcon onClick={handlePlus}
                sx={{ fontSize: 50 }}/>
            </td>
        </tr>
    )
}

export default CreateScoresItem;