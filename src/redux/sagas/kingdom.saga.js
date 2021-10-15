import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchKingdoms() {
    try {
        const kingdoms = yield axios.get('/api/tournament/kingdoms')
        console.log('Kingdoms in fetchKingdoms saga - ', kingdoms );
        
        yield put({ type: 'SET_KINGDOMS', payload: kingdoms.data })
    } catch (error) {
        console.log('Error in fetching Kingdoms - ', error);
        alert('Something went wrong! Unable to get kingdoms.')
    }
}

function* kingdomSaga() {
    yield takeLatest( 'FETCH_KINGDOMS', fetchKingdoms )
}

export default kingdomSaga;