import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import CreateScoresItem from '../CreateScoresItem/CreateScoresItem';

function CreateScores () {
    const store = useSelector(store => store)
    const tournamentName = useSelector(store => store.tournaments.newTournament.name)
    const entrants = useSelector(store => store.entrants)

    return (
        <div className="container">
            <h2 className="create-tournament-header">{tournamentName}</h2>
            {/* {JSON.stringify(store.tournaments.newTouranment)}
            {JSON.stringify(store.entrants)} */}
            <table className="scores">
                <tr>
                    <th id="th-number">#</th>
                    <th id="th-persona">Persona</th>
                    <th id="th-score">Score</th>
                    {/* <th>Highest Streak</th> */}
                </tr>
                {entrants.map((entrant, index) => (
                    <CreateScoresItem entrant={entrant} index={index}/>
                ))}
            </table>
        </div>
    )
}

export default CreateScores; 