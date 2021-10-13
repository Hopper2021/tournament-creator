import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


function MyTournaments(){
    const store = useReduxStore();
    const dispatch = useDispatch();

    const getDate = () => {
        const newDate = getDate(tournament.date)
        console.log('New date - ', newDate);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_TOURNAMENTS' });
    }, [dispatch]);

    return(
        <>
        <p>{JSON.stringify(store.tournaments)}</p>
        <div>
            {store.tournaments.map((tournament) => (
                <div key={tournament.id}>
                    <h4>Name: {tournament.tournament_name}</h4>
                    <p>Date: {tournament.date}</p>
                    <p>Kingdom: {tournament.kingdom_name}</p>
                    <p>Organizer: {tournament.organizer_persona}</p>
                    <p>Type: {tournament.type}</p>
                </div>
            ))}
        </div>
        </>
    )
}

export default MyTournaments;