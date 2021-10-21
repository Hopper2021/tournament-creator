import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CreateScoresItem({ entrant, index }) {
    const dispatch = useDispatch();
    const tournament = useSelector(store => store.tournaments.newTournament)
    const [newScore, setNewScore] = useState(0);

    useEffect(() => {
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: tournament })
    }, [tournament])

    /* Subtracts 1 from newScore and dispatches updated score
       along with entrant information to tournament_entrant table */
    const handleMinus = () => { 
        // Prevents score from going below 0
        if ( newScore > 0 ) {
            dispatch({ type: 'UPDATE_SCORE',
                // This updates the score for the database
                payload: {tournament_id: tournament.id, entrant_id: entrant.id, score: newScore - 1} })
            // this changes the appearance on the DOM
            setNewScore(newScore - 1);
        }
    }

    /* Adds 1 to newScore and dispatches updated score
       along with entrant information to tournament_entrant table */
    const handlePlus = () => {
        if ( newScore >= 0 ) {
            dispatch({ type: 'UPDATE_SCORE', 
                payload: {tournament_id: tournament.id, entrant_id: entrant.id, score: newScore + 1} })
            setNewScore(newScore + 1);
        }
    }

    return(
        <tr>
            <td id="index-table-data">{index + 1}</td>
            <td>{entrant.persona}</td>
            <td id="score-table-data">
            <DoDisturbOnIcon onClick={handleMinus} // minus button
                sx={{ fontSize: 50 }}/>
                <span id="score-counter"
                value={entrant.score}>
                    {newScore}
                </span>
            <AddCircleIcon onClick={handlePlus} // plus button
                sx={{ fontSize: 50 }}/>
            </td>
        </tr>
    )
}

export default CreateScoresItem;