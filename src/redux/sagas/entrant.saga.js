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
        alert('Something went wrong! Unable to create entrant.')
    }
}

// function* fetchSelectedEntrants(action) {
//     try {
//         console.log('Tournament id in selected entrants saga - ', action.payload );
        
//         const tournamentId = action.payload;
//         const selectedEntrants = yield axios.post( '/api/tournament/fetchSelectedEntrants', tournamentId )
//         yield put({ type: 'FETCH_ENTRANTS', payload: selectedEntrants.data })
//     } catch (error) {
//         console.log('Error in POST new entrants - ', error);
//         alert('Something went wrong! Unable to fetch entrants.')
//     }
// }

function* entrantSaga() {
    yield takeLatest( 'POST_ENTRANT', postEntrant )
    // yield takeLatest( 'FETCH_ENTRANTS', fetchSelectedEntrants )
}

export default entrantSaga;