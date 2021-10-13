const tournamentReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_MY_TOURNAMENTS':
            return action.payload;
        default:
            return state;
    }
}

export default tournamentReducer;