import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CreateScoresItem({ entrant, index }) {
    const dispatch = useDispatch();
    const entrants = useSelector(store => store.entrants)
    const [newScore, setNewScore] = useState(0);

    const handleMinus = () => { 
        if ( newScore > 0 ) {
            setNewScore(newScore - 1);
        }
    }

    const handlePlus = () => {
        if ( newScore >= 0 ) {
            setNewScore(newScore + 1); 
        }
    }

    return(
        <tr>
            {/* {JSON.stringify(entrant.score)} */}
            <td id="index-table-data">{index + 1}</td>
            <td id="persona-table-data">{entrant.persona}</td>
            <td id="score-table-data">
            <DoDisturbOnIcon onClick={handleMinus}
                sx={{ fontSize: 50 }}/>
                <span id="score-counter">{newScore}</span>
            <AddCircleIcon onClick={handlePlus}
                sx={{ fontSize: 50 }}/>
            </td>
        </tr>
    )
}

export default CreateScoresItem;