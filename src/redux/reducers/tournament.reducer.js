import { combineReducers } from 'redux';

const tournamentReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_MY_TOURNAMENTS':
            return action.payload;
        case 'SET_TOURNAMENT_ENTRANTS':
            return action.payload;
        // case 'SET_NEW_TOURNAMENT':
        //     return [...state, action.payload]
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

const defaultTournament = {
    name: '',
    kingdom_id: '',
    type_id: ''
}

const newTournament = (state = defaultTournament, action) => {
    switch ( action.type ) {
        case 'SET_NEW_TYPE':
            return {...state, type_id: action.payload.type_id};
        case 'SET_NEW_NAME':
            return {...state, name: action.payload.name};
        case 'SET_NEW_KINGDOM':
            return {...state, kingdom_id: action.payload.kingdom_id};
        default:
            return state;
    }    
}

export default combineReducers({
    tournamentReducer,
    selectedTournament, 
    newTournament,
});