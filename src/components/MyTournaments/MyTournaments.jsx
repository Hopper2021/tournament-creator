import React from 'react';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function MyTournaments(){
    const myTournaments = useSelector( store => store.tournamentReducer )
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({ type: 'FETCH_MY_TOURNAMENTS' });
    }, [dispatch]);

    return(
        <>
        {/* <p>{JSON.stringify(myTournaments)}</p> */}
        <div>
            {myTournaments.map((tournament) => (
                <p>{tournament.name}</p>
            ))}
        </div>
        </>
    )
}

export default MyTournaments;