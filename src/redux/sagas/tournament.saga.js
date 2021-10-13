import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMyTournaments() {
    try {        
        const response = yield axios.get( '/api/tournament' )
        yield put({ type: 'SET_MY_TOURNAMENTS', payload: response.data })
    } catch (error) {
        console.log('My Tournaments GET failed.');
        alert('Something went wrong. Please try again later.');
    }
}

function* tournamentSaga() {
    yield takeLatest( 'FETCH_MY_TOURNAMENTS', fetchMyTournaments )
}

export default tournamentSaga;