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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CreateIcon from '@mui/icons-material/Create';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Typography from '@mui/material/Typography';

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
            <h2 id="my-tournaments-header">
                {tournament.tournament_name}
            </h2>
            <p id="my-tournaments-divider">____________________________________</p>
            <Table component={Paper} elevation={9}>
                <TableRow sx={{ bt: grey[900] }}>
                    <TableCell sx={{ width: '20ch' }}>
                        <EventIcon sx={{ mb: -1, mr: 1 }}/>
                        {moment(tournament.date).format('MMMM Do YYYY')}
                    </TableCell>
                    <TableCell>
                        <DataUsageIcon sx={{ mb: -1, mr: 1 }}/>
                        {tournament.type}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <AssignmentIndIcon sx={{ mb: -1, mr: 1 }}/>
                        {tournament.organizer_persona}
                    </TableCell>
                    <TableCell>
                        <LocationOnIcon sx={{ mb: -1, mr: 1 }}/>
                        {tournament.kingdom_name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <EmojiPeopleIcon sx={{ mb: -1, mr: 1 }}/>
                        {entrants.length}
                    </TableCell>
                    <TableCell>
                        <EmojiEventsIcon sx={{ mb: -1, mr: 1 }}/> 
                        {entrants[0].persona}
                    </TableCell>
                </TableRow>
            </Table>
            <TableContainer id="my-tournament-paper" component={Paper} elevation={8}>
            <h4 id="my-tournament-name"> Placements </h4>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><EmojiEventsIcon/></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                Score</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                Warriors</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entrants.map((entrant, index) => (
                        <TableRow sx={{'&:nth-of-type(odd)': {
                            backgroundColor: grey[300] }}}>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                {placement( index + 1 )}</TableCell>
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
                <DeleteForeverIcon/>  Delete Tournament
            </Button>
        </div>
    )
}

export default tournamentDetail;