import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post newly created entrants to database
function* postEntrant(action) {
    try {
        const entrant = action.payload;
        yield axios.post( '/api/tournament/create/entrant', entrant )
        yield put({ type: 'FETCH_ENTRANTS' })
    } catch (error) {
        console.log('Error in POST new entrants - ', error);
        alert('Something went wrong! Unable to create entrants.')
    }
}

function* entrantSaga() {
    yield takeLatest( 'POST_ENTRANT', postEntrant )
}

export default entrantSaga;