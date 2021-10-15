const kingdomReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_KINGDOMS':
            return action.payload;
        default:
            return state;
    }
}

export default kingdomReducer;