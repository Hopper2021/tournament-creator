const tournamentReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_MY_TOURNAMENTS':
            return action.payload;
        default:
            return state;
    }
}

export default tournamentReducer;