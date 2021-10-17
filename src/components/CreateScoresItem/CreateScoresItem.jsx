import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState, useEffect } from 'react';

function CreateScoresItem({ entrant, index }) {
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [streakArray, setStreakArray] = useState([]);

    const handleMinus = () => {
        setScore(score - 1);
    }

    const handlePlus = (index) => {
        setScore(score + 1);
        console.log('New Score - ', score);
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
            <td>{index + 1}</td>
            <td>{entrant.persona}</td>
            <td className="score-table-data">
            <DoDisturbOnIcon onClick={() => handleMinus(index)}/>
                <span className="score">{score}</span>
            <AddCircleIcon onClick={() => handlePlus(index)}/>
            </td>
            {/* <td>{streak}</td> */}
        </tr>
    )
}

export default CreateScoresItem;