import { useSelector } from 'react-redux';

function DisplayKingdomName ({entrant}) {
    const kingdoms = useSelector(store => store.kingdoms);

    const displayName = (entrant) => {
        console.log('Entrant kingdom_id - ', entrant.kingdom_id);
        for (let i=0; i<kingdoms.length; i++) {
            if ( kingdoms[i].id == entrant.kingdom_id ) {
                return <td>{kingdoms[i].name}</td>;
            }
        }
    }

    return (
        <>{displayName(entrant)}</>
    )
}

export default DisplayKingdomName;