import  { useHistory } from 'react-router-dom';
// Moment displays dates and times in a more user friendly manner
import moment from 'moment';
import Paper from '@mui/material/Paper';

function MyTournamentsItem({ tournament }) { 
    const history = useHistory();

    // Moves to the detail page by taking in the id of the clicked card
    const viewTournamentDetail = () => {
        console.log('tournament id - ', tournament.id);
        history.push(`/details/${tournament.id}`);
    }

    return (
        <div id="my-tournament-container">
            <Paper id="my-tournament-paper" elevation={8}
                onClick={viewTournamentDetail}>
                <h4 id="my-tournament-name">{tournament.tournament_name}</h4>
                <div id="my-tournament-details">
                    {/* moment is taking in the created date and making it look nice! */}
                    <p><u>Date:</u> {moment(tournament.date).format('MMMM Do YYYY')}</p>
                    <p><u>Kingdom:</u> {tournament.kingdom_name}</p>
                    <p><u>Organizer:</u> {tournament.organizer_persona}</p>
                    <p><u>Type:</u> {tournament.type}</p>
                </div>
            </Paper>
        </div>
    )
}

export default MyTournamentsItem; 