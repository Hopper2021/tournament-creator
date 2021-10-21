import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import CreateScoresItem from '../CreateScoresItem/CreateScoresItem';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';

function CreateScores () {
    const dispatch = useDispatch();
    const history = useHistory();
    const tournament = useSelector(store => store.tournaments.newTournament);
    const entrants = useSelector(store => store.tournaments.selectedEntrants);
    const types = useSelector(store => store.types);

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRANTS' })
        dispatch({ type: 'FETCH_NEW_TOURNAMENT' })
        // Grabs entrants associated with most recently made tournament
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: tournament })
        dispatch({ type: 'FETCH_TYPES' })
    }, [])

    /* displays the name of the tournament type based on the 
       type_id in tournament passed from reduxStore */
    const displayName = () => {
        for (let i=0; i<types.length; i++) {
            if ( types[i].id == tournament.type_id ) {
                return <td>{types[i].name}</td>;
            }
        }
    }

    // Moves to detail page for current completed tournament based on params
    const moveToDetails = () => {
        history.push(`/details/${tournament.id}`);
    }

    return (
        <div className="container">
            <h2 className="create-tournament-header">
                {tournament.name}
            </h2>
            <h5 id="create-tournament-header">
                {displayName(tournament.type_id)}
            </h5>
            {/* {JSON.stringify(store.tournaments.newTouranment)} */}
            {/* {JSON.stringify(entrants)} */}
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
            <Button variant="contained" sx={{ float: "right", bgcolor: red[900] }}
            onClick={moveToDetails}>
                Show Placements!
            </Button>
        </div>
    )
}

export default CreateScores; 