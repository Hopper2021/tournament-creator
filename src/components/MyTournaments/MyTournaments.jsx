import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyTournamentsItem from '../MyTournamentsItem/MyTournamentsItem';
// import { classNames } from 'MyTournaments.css';

function MyTournaments(){
    const tournaments = useSelector(store => store.tournaments.tournamentReducer);
    const dispatch = useDispatch();

    // Grabs all tournaments made by the logged in user
    useEffect(() => {
        dispatch({ type: 'FETCH_MY_TOURNAMENTS' });
    }, []);

    return (
        <div>
            {tournaments.map(tournament => (
            <div key={tournament.id} id="my-tournament-container">
                <MyTournamentsItem key={tournament.id} tournament={tournament}/>
            </div>
            ))}
            {console.log(tournaments)}
            <div>
                {tournaments <= 0 && (
                    <div>No tournaments to display.</div>
                )}
            </div>
        </div>
    )
}

export default MyTournaments;