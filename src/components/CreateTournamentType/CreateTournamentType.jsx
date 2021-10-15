import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateTournamentType() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(store => store.types)
    const [newType, setNewType] = useState({ type_id: '' })

    useEffect(() => {
        dispatch({ type: 'FETCH_TYPES' })
    },[])

    const handleClick = (event) => {
        console.log('Type Id in handle-click - ', event.target.value);
        setNewType(event.target.value)
        dispatch({ type: 'SET_NEW_TYPE', payload: newType });
        history.push('/create/data')
    }

    return(
        <div >
            <h2 className="create-tournament-header">Tournament Type</h2>
            {/* {JSON.stringify(types)} */}
            <div className="grid">
                {types.map((type) => (
                    <div className="grid-col grid-col_6">
                        <Button className="type-button" variant="contained"
                            key={type.id}
                            value={type.id} 
                            onClick={(event) => handleClick(event)}>
                                {type.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateTournamentType;