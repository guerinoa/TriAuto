import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import './LandingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {

    return (
        <div id="landingPage">
        <FormControl component="fieldset" id="languageChoice" >
        <FormLabel component="legend" color='primary'>Pick a language:</FormLabel>

            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/role",
                state: { lang: "english" }
            }}>
                <Button id="button" value="english" variant="outlined">
                    English
                </Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/role",
                state: { lang: "french" }
            }}>
                <Button id="button" value="french" variant="outlined">
                    French
                </Button>
            </Link>
            

        </FormControl>

        </div>
    )
}

export default LandingPage;
