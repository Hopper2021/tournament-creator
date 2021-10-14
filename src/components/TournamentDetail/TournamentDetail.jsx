import useReduxStore from '../../hooks/useReduxStore';
import moment from 'moment';
import Paper from '@mui/material/Paper';
// Client side url params
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function tournamentDetail() {
    const tournament = useSelector(store => store.tournaments.selectedTournament);
    const entrants = useSelector(store => store.tournaments.tournamentReducer)
    const store = useReduxStore();
    const dispatch = useDispatch();
    // This destructured param matched the /:id listed on the route in App.jsx
    const allParams = useParams();
    const tournamentId = allParams.id;

    useEffect(() => {
        console.log('tournamentId in Tournament Detail - ', tournamentId);
        dispatch({ type: 'FETCH_TOURNAMENT_DETAILS', payload: { id: tournamentId } })
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: { id: tournamentId } })
    },[tournamentId])

    const placement = (index) => {
        let j = index % 10,
            k = index % 100;
        if (j == 1 && k != 11) {
            return index + "st";
        }
        if (j == 2 && k != 12) {
            return index + "nd";
        }
        if (j == 3 && k != 13) {
            return index + "rd";
        }
        return index + "th";
    }

    return(
        <div>
            {/* {JSON.stringify(store.tournaments.tournamentReducer)} */}
            <Paper key={tournament.id} id="my-tournament-paper" elevation={8}>
                <h4 id="my-tournament-name">{tournament.tournament_name}</h4>
                <div id="my-tournament-details">
                    <p><u>Date:</u> {moment(tournament.date).format('MMMM Do YYYY')}</p>
                    <p><u>Kingdom:</u> {tournament.kingdom_name}</p>
                    <p><u>Organizer:</u> {tournament.organizer_persona}</p>
                    <p><u>Type:</u> {tournament.type}</p>
                </div>
            </Paper>
            <Paper id="my-tournament-paper">
                <div>
                    <h4 id="my-tournament-name"> Placements </h4>
                    <table id="my-tournament-details">
                        <tr>
                            <th>Placement</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {entrants.map((entrant, index) => (
                        <tr>
                            <td>{placement( index + 1 )}</td>
                            <td>{entrant.persona}</td>
                            <td>{entrant.score}</td>
                        </tr>
                        ))}
                    </table>
                </div>
            </Paper>
        </div>
    )
}

export default tournamentDetail;