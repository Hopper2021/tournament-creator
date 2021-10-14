import { combineReducers } from 'redux';

const tournamentReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_MY_TOURNAMENTS':
            return action.payload;
        default:
            return state;
    }
}

const selectedTournament = (state = {}, action) => {
    switch ( action.type ) {
        case 'SET_TOURNAMENT_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    tournamentReducer,
    selectedTournament, 
});