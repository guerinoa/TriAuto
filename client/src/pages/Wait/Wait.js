import React, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom';
import '../../pages/Role/Role.css';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './Wait.css';

function Wait() {

    return (
    <div id="waitPage">
        <h2>
            Please wait for risk level...
        </h2>
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    </div>
    )

}

export default Wait;