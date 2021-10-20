import { combineReducers } from 'redux';

const entrantList = (state = [], action) => {
    switch ( action.type ) {
        case 'ADD_ENTRANT':
            return [...state, action.payload];
        case 'ADD_SCORES':
            return [...state, action.payload]
        default:
            return state;
    }
}

const scoreReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_ENTRANT_SCORE':
            return action.payload;
        default:
            return state;
    }
}

// const selectedEntrants = (state = [], action) => {
//     switch ( action.type ) {
//         case 'FETCH_ENTRANTS':
//             return [...state, action.payload]
//         default:
//             return state;
//     }
// }

export default combineReducers({
    entrantList,
    scoreReducer,
    // selectedEntrants
});

