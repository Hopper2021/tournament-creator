import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post newly created entrants to database
function* postEntrant(action) {
    try {
        const entrant = action.payload.newEntrant;
        const tournament = action.payload.tournament;
        yield axios.post( '/api/tournament/create/entrant', entrant )
        yield put({ type: 'FETCH_TOURNAMENT_ENTRANTS', payload: tournament })
    } catch (error) {
        console.log('Error in POST new entrants - ', error);
        alert('Something went wrong! Unable to create entrant.')
    }
}

function* updateScore(action) {
    try {
        console.log('action.payload in update score saga - ', action.payload);
        const entrantInfo = action.payload;
        yield axios.put( '/api/tournament/score', entrantInfo )
    } catch (error) {
        console.log('Error in UPDATE score - ', error);
        alert('Something went wrong! Unable to update score.')
    }
}

function* entrantSaga() {
    yield takeLatest( 'POST_ENTRANT', postEntrant )
    yield takeLatest( 'UPDATE_SCORE', updateScore )
}

export default entrantSaga;