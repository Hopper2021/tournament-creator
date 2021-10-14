import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMyTournaments() {
    try {        
        const response = yield axios.get( '/api/tournament' )
        yield put({ type: 'SET_MY_TOURNAMENTS', payload: response.data })
    } catch (error) {
        console.log('My Tournaments GET failed - ', error);
        alert('Something went wrong! Please try again later.');
    }
}

function* fetchTournamentDetails(action) {
    try {
        const tournament = action.payload;
        console.log('tournament id in saga - ', tournament.id)
        const tournamentDetails = yield axios.get( `/api/tournament/details/${tournament.id}` )
        console.log('response - ', tournamentDetails);
        yield put({ type: 'SET_TOURNAMENT_DETAILS', payload: tournamentDetails.data })
    } catch (error) {
        console.log('Tournament details GET failed - ', error);
        alert('Something went wrong! Please try again later.')
    }
}

function* tournamentSaga() {
    yield takeLatest( 'FETCH_MY_TOURNAMENTS', fetchMyTournaments ),
    yield takeLatest( 'FETCH_TOURNAMENT_DETAILS', fetchTournamentDetails )
}

export default tournamentSaga;