import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import moment from 'moment';

function MyTournaments(){
    const store = useReduxStore();
    const dispatch = useDispatch();

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
                    <p>Date: {moment(tournament.date).format('MMMM Do YYYY')}</p>
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