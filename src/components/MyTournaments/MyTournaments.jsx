import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import moment from 'moment';
import Paper from '@mui/material/Paper';

function MyTournaments(){
    const store = useReduxStore();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_TOURNAMENTS' });
    }, [dispatch]);

    const viewTournamentDetail = () => {
        history.push(`/detail/`); // TODO ADD TOURNAMENT.ID FROM PROPS - FROM TOURNAMENTDETAILS REDUCER
    }

    return(
        <>
        {/* <p>{JSON.stringify(store.tournaments)}</p> */}
            {store.tournaments.map((tournament) => (
            <div id="my-tournament-container">
                <Paper id="my-tournament-paper" key={tournament.id} elevation={8}
                    onClick={viewTournamentDetail}>
                    <h4 id="my-tournament-name">{tournament.tournament_name}</h4>
                    <div id="my-tournament-details">
                        <p><u>Date:</u> {moment(tournament.date).format('MMMM Do YYYY')}</p>
                        <p><u>Kingdom:</u> {tournament.kingdom_name}</p>
                        <p><u>Organizer:</u> {tournament.organizer_persona}</p>
                        <p><u>Type:</u> {tournament.type}</p>
                    </div>
                </Paper>
            </div>
            ))}
            {/* <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box> */}
        </>
    )
}

export default MyTournaments;