import useReduxStore from '../../hooks/useReduxStore';
import moment from 'moment';
import Paper from '@mui/material/Paper';
// Client side url params
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function tournamentDetail() {
    const tournament = useSelector(store => store.tournaments.selectedTournament);
    const dispatch = useDispatch();
    // This destructured param matched the /:id listed on the route in App.jsx
    const allParams = useParams();
    const tournamentId = allParams.id;

    useEffect(() => {
        console.log('tournamentId in Tournament Detail - ', tournamentId);
        dispatch({ type: 'FETCH_TOURNAMENT_DETAILS', payload: { id: tournamentId } })
    },[tournamentId])

    return(
        <div>
            {JSON.stringify(tournament)}
            <Paper key={tournament.id} id="my-tournament-paper" elevation={8}>
                <h4 id="my-tournament-name">{tournament.tournament_name}</h4>
                <div id="my-tournament-details">
                    <p><u>Date:</u> {moment(tournament.date).format('MMMM Do YYYY')}</p>
                    <p><u>Kingdom:</u> {tournament.kingdom_name}</p>
                    <p><u>Organizer:</u> {tournament.organizer_persona}</p>
                    <p><u>Type:</u> {tournament.type}</p>
                </div>
            </Paper>
        </div>
    )
}

export default tournamentDetail;