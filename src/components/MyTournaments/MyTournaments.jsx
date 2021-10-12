import React from 'react';
import { useSelector } from 'react-redux';

function MyTournaments(){
    const myTournaments = useSelector( store => store.tournamentReducer )
    
    return(
        <>
        <p>{JSON.stringify(myTournaments)}</p>
        </>
    )
}

export default MyTournaments;