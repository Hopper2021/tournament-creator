import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchTypes() {
    try {
        const types = yield axios.get('/api/tournament/types')
        console.log('Types in fetchTypes saga - ', types );
        
        yield put({ type: 'SET_TYPES', payload: types.data })
    } catch (error) {
        console.log('Error in fetching Kingdoms - ', error);
        alert('Something went wrong! Unable to get tournament types.')
    }
}

function* typeSaga() {
    yield takeLatest( 'FETCH_TYPES', fetchTypes )
}

export default typeSaga;