import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CreateScoresItem({ entrant, index }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store)
    const [newScore, setNewScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [streakArray, setStreakArray] = useState([]);
    const [updateEntrant, setUpdateEntrant] = useState(entrant)

    const handleMinus = (event) => { 
        // console.log('Before update - ', entrant);
        const score = setNewScore(event.target.value); 
        setUpdateEntrant({...updateEntrant, score: score})
        console.log('After update - ', entrant);
        // dispatch({ type: 'SET_SCORE', payload: entrant })
    }

    const handlePlus = (event) => {
        // console.log('Before update - ', entrant);
        setNewScore(newScore + 1);
        setUpdateEntrant({...updateEntrant, score: newScore})
        console.log('After update - ', entrant);
        // dispatch({ type: 'SET_SCORE', payload: entrant })
        // To track streak, check if the index is the same as the last button pressed
        // If it is, update current streak state
        // If it is not, add last number to streakArray
        // Grab the highest from the array
        // Display that number as highest streak
        // setStreakArray([...streakArray, score]); 
        // console.log('Streak Array - ', streakArray);
        // TODO Add streak to the array and then grab the highest out of the array
    }

    const streakHandler = () => {
        console.log('In streak handler');
    }

    // const consecutiveOnes = () => {
    //     if ( array.length == 0 ) {
    //             return 0;
        
    //     let array = [5, 2];
    
    //     for (let i=0; i<array.length; i++ ) {
    //         if ( array[i] == 1 ) {
    //             if ( array[I] == array[ i + 1 ] ) {
    //                 let result;
    //             } array.max();
    //         }
    // }

    return(
        <tr>
            {JSON.stringify(entrant.score)}
            <td id="index-table-data">{index + 1}</td>
            <td id="persona-table-data">{entrant.persona}</td>
            <td id="score-table-data">
            <DoDisturbOnIcon value={newScore} onClick={(event) => handleMinus(event.target.value)}
                sx={{ fontSize: 50 }}/>
                <span id="score-counter">{newScore}</span>
            <AddCircleIcon value={newScore} onClick={(event) => handlePlus(event.target.vaule)}
                sx={{ fontSize: 50 }}/>
            </td>
            {/* <td>{streak}</td> */}
        </tr>
    )
}

export default CreateScoresItem;