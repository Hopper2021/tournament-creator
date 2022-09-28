import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch all categories
function* fetchCategories() {
    try {
        const categories = yield axios.get( '/api/tournament/category' )
        console.log('Categories in fetchCategories saga - ', categories );
        yield put({ type: 'SET_CATEGORIES', payload: categories.data })
    } catch (error) {
        console.log('My Tournaments GET failed - ', error);
        alert('Something went wrong! Please try again later.');
    }
}

// * NEXT IS TO POST CATEGORIES TO tournament_cateogory junction table * //

// function* postCategories(action) {
//     try {
//         const categories = action.payload.categories;
//         const tournament = action.payload.tournament;
//         console.log('Categories in post new Tournament saga - ', tournament );
        
//         yield axios.post( '/api/tournament/create', tournament, categories )
//         yield put({ type: 'FETCH_MY_TOURNAMENTS' })
//         yield put({ type: 'FETCH_NEW_TOURNAMENT' })
//     } catch (error) {
//         console.log('Error in POST new tournament - ', error);
//         alert('Something went wrong! Unable to create tournament.')
//     }
// }

function* categorySaga() {
    yield takeLatest( 'FETCH_CATEGORIES', fetchCategories )
}

export default categorySaga;