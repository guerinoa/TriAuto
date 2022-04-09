import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './Loading.css'

const Loading = () => {

    const [redirect, setRedirect] = useState(null);


    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            axios.get('http://localhost:8080/vitalsList/beginCollectionFront')
            .then(response => {
                setRedirect(response);
            });
        }, 5000)
        
        return () => clearInterval(intervalId); //This is important
        
    },[]);


    return (
        <div id="wrapper">
            {redirect && (
                <Redirect to={{
                    pathname: "/collection"
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