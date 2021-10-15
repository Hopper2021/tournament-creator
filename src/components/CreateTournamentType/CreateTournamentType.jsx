import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateTournamentType() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(store => store.types)
    const [tournamentType, setTournamentType] = useState({ type_id: '' })

    useEffect(() => {
        dispatch({ type: 'FETCH_TYPES' })
    },[])

    const handleClick = (event) => {
        console.log('Type Id in handle-click - ', event.target.value);
        setTournamentType(event.target.value)
        dispatch({ type: 'SET_NEW_TYPE', payload: tournamentType });
        history.push('/create/data')
    }

    return(
        <>
            <h3>Tournament Type</h3>
            {JSON.stringify(types)}
            <div className="grid">
                {types.map((type) => (
                    <div className="grid-col grid-col_5">
                        <button
                            className="type-button"
                            value={type.id} 
                            onClick={(event) => handleClick(event)}>
                            {type.name}
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CreateTournamentType;