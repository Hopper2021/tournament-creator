import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyTournamentsItem from '../MyTournamentsItem/MyTournamentsItem';

function MyTournaments(){
    const tournaments = useSelector(store => store.tournaments.tournamentReducer);
    const dispatch = useDispatch();

    // Grabs all tournaments made by the logged in user
    useEffect(() => {
        dispatch({ type: 'FETCH_MY_TOURNAMENTS' });
    }, []);

    return (
        <div>
            {/* {JSON.stringify(tournaments)} */}
            {tournaments.map(tournament => (
            <div key={tournament.id} id="my-tournament-container">
                <MyTournamentsItem key={tournament.id} tournament={tournament}/>
            </div>
            ))}
        </div>
    )
}

export default MyTournaments;