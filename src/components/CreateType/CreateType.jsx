import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import GridOffIcon from '@mui/icons-material/GridOff';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';

function CreateTournamentType() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(store => store.types)
    const [newType, setNewType] = useState('')

    useEffect(() => {
        dispatch({ type: 'FETCH_TYPES' })
    },[])

    const handleClick = (event) => {
        event.preventDefault();
        console.log('newType in handle-click - ', newType);
        dispatch({ type: 'SET_NEW_TYPE', payload: newType });
        history.push('/create/data')
    }

    return (
        <div >
            <h2 className="create-tournament-header">Select Type</h2>
            {/* {JSON.stringify(types)} */}
            <div className="grid">
                {types.map((type) => (
                    <form className="grid-col grid-col_6"
                        onSubmit={handleClick}>
                        <Button className="type-button" variant="contained"
                            sx={{ bgcolor: grey[400], color: grey[900],
                                fontSize: 18, fontWeight: 'heavy' }} 
                            type="submit"
                            key={type.id}
                            value={type.id} 
                            onClick={(event) => setNewType(event.target.value)}>
                                {type.name}
                            <br/>
                            {/* TODO CONDITIONAL RENDERING FOR ICONS */}
                        </Button>
                    </form>
                ))}
            </div>
        </div>
    )
}

export default CreateTournamentType;