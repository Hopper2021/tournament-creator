import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch all tournaments created by logged in user
function* fetchMyTournaments() {
    try {        
        const response = yield axios.get( '/api/tournament' )
        yield put({ type: 'SET_MY_TOURNAMENTS', payload: response.data })
    } catch (error) {
        console.log('My Tournaments GET failed - ', error);
        alert('Something went wrong! Please try again later.');
    }
}

// Fetch base tournament details based on tournament clicked ( sends info to Detail Page )
function* fetchTournamentDetails(action) {
    try {
        const tournament = action.payload;
        console.log('tournament id in saga - ', tournament.id)
        const tournamentDetails = yield axios.get( `/api/tournament/details/${tournament.id}` )
        console.log('response - ', tournamentDetails);
        yield put({ type: 'SET_TOURNAMENT_DETAILS', payload: tournamentDetails.data })
    } catch (error) {
        console.log('Tournament details GET failed - ', error);
        alert('Something went wrong! Unable to get tournament details.')
    }
}

// Fetch tournament entrant information based on tournament click ( Sends into to Detail page )
function* fetchTournamentEntrants(action) {
    try {
        const tournament = action.payload;
        console.log('tournament id in saga - ', tournament.id)
        const tournamentDetails = yield axios.get( `/api/tournament/details/entrants/${tournament.id}` )
        console.log('response - ', tournamentDetails);
        yield put({ type: 'SET_TOURNAMENT_ENTRANTS', payload: tournamentDetails.data })
    } catch (error) {
        console.log('Tournament details GET failed - ', error);
        alert('Something went wrong! Unable to get entrant infromation.')
    }
}

// Post a new tournament to the database
function* postNewTournament(action) {
    try {
        const tournament = action.payload;
        console.log('Tournament in post new Tournament saga - ', tournament );
        
        axios.post( '/api/tournament/create', tournament )
        yield put({ type: 'FETCH_MY_TOURNAMENTS' })
    } catch (error) {
        console.log('Error in POST new tournament - ', error);
        alert('Something went wrong! Unable to create tournament.')
    }
}

function* tournamentSaga() {
    yield takeLatest( 'FETCH_MY_TOURNAMENTS', fetchMyTournaments ),
    yield takeLatest( 'FETCH_TOURNAMENT_DETAILS', fetchTournamentDetails )
    yield takeLatest( 'FETCH_TOURNAMENT_ENTRANTS', fetchTournamentEntrants )
    yield takeLatest( 'POST_NEW_TOURNAMENT', postNewTournament )
}

export default tournamentSaga;