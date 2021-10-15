const entrantList = (state = [], action) => {
    switch ( action.type ) {
        case 'ADD_ENTRANT':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default entrantList;

