import { combineReducers } from 'redux';

const tournamentReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_MY_TOURNAMENTS':
            return action.payload;
        default:
            return state;
    }
}

const selectedEntrants = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_TOURNAMENT_ENTRANTS':
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

const blankTournament = {
    name: '',
    kingdom_id: '',
    type_id: ''
};

const newTournament = (state = {}, action) => {
    switch ( action.type ) {
        case 'POST_NEW_TOURNAMENT':
            return action.payload;
        case 'SET_NEW_TOURNAMENT':
            return action.payload;
        default:
            return state;
    }    
}

export default combineReducers({
    tournamentReducer,
    selectedTournament, 
    selectedEntrants,
    newTournament,
});