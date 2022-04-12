import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Error = () => {

    return (
        <div>
            <h1>
                Error in collection. Nurse notified, please wait.
            </h1>
        </div>
      );
}

export default Error;