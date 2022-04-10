import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './loading.css'

const Loading = () => {

    const [redirect, setRedirect] = useState(null);
    const location = useLocation()
    const patientOhip = location.state.patientOhip
    const visit = location.state.visit


    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            axios.get('http://localhost:8080/vitalList/beginCollectionFront')
            .then(response => {
                setRedirect(response);
            });
        }, 5000)
        
        return () => clearInterval(intervalId); //This is important
        
    },[]);


    return (
        <div id="wrapper2">
            {redirect && (
                <Redirect to={{
                    pathname: "/begincollection",
                    state: {
                        patientOhip: patientOhip,
                        visit: visit,      
                    }
                    }}/>
            )}
            <h2 style={{width: '100%'}}>
            Triauto is getting ready to collect your vital sign information
            </h2>
            <br></br>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </div>
      );
}

export default Loading;