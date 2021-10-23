import React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
// Client side url params
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

function tournamentDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tournament = useSelector(store => store.tournaments.selectedTournament);
    const entrants = useSelector(store => store.tournaments.selectedEntrants)
    // This destructured param matched the /:id listed on the route in App.jsx
    const allParams = useParams();
    const tournamentId = allParams.id;

    useEffect(() => {
        console.log('tournamentId in Tournament Detail - ', tournamentId);
        dispatch({ type: 'FETCH_TOURNAMENT_DETAILS', payload: { id: tournamentId } })
        dispatch({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: { id: tournamentId } })
    },[tournamentId])

    const handleDelete = () => {
        // Sends id to use as params to delete selected tournament
        dispatch({ type: 'DELETE_TOURNAMENT', payload: tournamentId })
        pushHistory();
    }

    const pushHistory = () => {
        history.push('/info');
    }

    /* Takes in the index provided and adds st, nd, or rd 
        based on the number provided. This is purely for display purposes */
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
        <div class="container">
            {/* {JSON.stringify(entrants)} */}
            <Paper key={tournament.id} id="my-tournament-paper" elevation={8}>
                <h4 id="my-tournament-name">
                    {tournament.tournament_name}
                </h4>
                <div id="my-tournament-details">
                    {/* Moment.js is making the passed in date user friendly and pretty! */}
                    <p><u>Date:</u> {moment(tournament.date).format('MMMM Do YYYY')}</p>
                    <p><u>Kingdom:</u> {tournament.kingdom_name}</p>
                    <p><u>Organizer:</u> {tournament.organizer_persona}</p>
                    <p><u>Type:</u> {tournament.type}</p>
                </div>
            </Paper>
            <TableContainer id="my-tournament-paper" component={Paper} elevation={8}>
            <h4 id="my-tournament-name"> Placements </h4>
                <Table sx={{ fontSize: 16 }}>
                    <TableHead sx={{ lineHeight: 1 }}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Warriors</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entrants.map((entrant, index) => (
                        <TableRow sx={{'&:nth-of-type(odd)': {
                            backgroundColor: grey[300] }}}>
                            <TableCell>{placement( index + 1 )}</TableCell>
                            <TableCell>{entrant.persona}</TableCell>
                            <TableCell align='center'>{entrant.score}</TableCell>
                            <TableCell align='center'>{entrant.warriors}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained"
            sx={{ ml: 5, mt: 2, bgcolor: red[900], float: 'right' }}
            onClick={handleDelete}>
                Delete Tournament
            </Button>
        </div>
    )
}

export default tournamentDetail;