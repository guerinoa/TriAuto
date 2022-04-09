import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './collection.css'

function Collection() {

    // Two measurements the patient needs to manually enter
    const [bloodPressure, setBloodPressure] = useState(0);
    const [heartRate, setHeartRate] = useState(0);

    const handleChangePressure = (e) => {
        setBloodPressure(e.target.value);
    }

    const handleChangeHeart = (e) => {
        setHeartRate(e.target.value);
    }

    const handleSubmit = () => {
        alert("blood pressure: " + bloodPressure + " and heart rate: " + heartRate);
        // Send data to backend
        axios.post('http://localhost:8080/vitalsList/vitalSignValues', {bloodPressure: {bloodPressure}, heartRate: {heartRate}}).then(function (response) {
            console.log(response);
        })
        // 
    }

    return (
        <div id="wrapper">
            <h2>
                Running Measurement Routine...
            </h2>
            <h3>
                When complete enter blood pressure and heart rate values from screen.
            </h3>

            <Box id="box"
            component="form" 
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                <TextField label="Blood Pressure" required={true} type='number' value={bloodPressure}  onChange={handleChangePressure}/>
                <TextField label="Heart Rate" required={true} type='number' value={heartRate}  onChange={handleChangeHeart}/>
                <br></br>
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </div>
      );
}

export default Collection;