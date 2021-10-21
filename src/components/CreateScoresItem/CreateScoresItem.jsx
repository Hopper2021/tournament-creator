import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

function CreateScoresItem({ entrant, index }) {
    const dispatch = useDispatch();
    const tournament = useSelector(store => store.tournaments.newTournament)
    const [newScore, setNewScore] = useState(0);

    useEffect(() => {
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: tournament })
    }, [tournament])

    const handleMinus = () => { 
        if ( newScore > 0 ) {
            dispatch({ type: 'SET_ENTRANT_SCORE', 
                payload: {tournament_id: tournament.id, entrant_id: entrant.id, score: newScore - 1} }) // This updates the score for the database
            setNewScore(newScore - 1); // this changes the appearance on the DOM
        }
    }

    const handlePlus = () => {
        if ( newScore >= 0 ) {
            dispatch({ type: 'SET_ENTRANT_SCORE', 
                payload: {tournament_id: tournament.id, entrant_id: entrant.id, score: newScore + 1} })
            setNewScore(newScore + 1);
        }
    }

    return(
        <tr>
            <td id="index-table-data">{index + 1}</td>
            <td>{entrant.persona}</td>
            <td id="score-table-data">
            <DoDisturbOnIcon onClick={handleMinus}
                sx={{ fontSize: 50 }}/>
                <span id="score-counter"
                value={entrant.score}>
                    {newScore}
                </span>
            <AddCircleIcon onClick={handlePlus}
                sx={{ fontSize: 50 }}/>
            </td>
        </tr>
    )
}

export default CreateScoresItem;