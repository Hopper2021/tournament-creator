const typeReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_TYPES':
            return action.payload;
        default:
            return state;
    }
}

export default typeReducer; 