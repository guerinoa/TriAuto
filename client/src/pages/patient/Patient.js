import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './Patient.css';
import { Link } from 'react-router-dom';
import PatientProfile from './patient_profile';

let socket;
const CONNECTION_PORT = 'localhost:4000'



function UserForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [CONNECTION_PORT])

    function handleSubmit() {
        socket.emit("submit", {'firstname': firstName, 'lastname': lastName, 'age': 5})
      }
    
  
    return (
    <form sx={{ flexDirection: "row"}} id='childForm'>
        <Grid id="form" container spacing={2}>
        <Grid id="field1" item xs={12}>
            <FormControl>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input id="firstName" aria-describedby="my-helper-text" onChange={e => setFirstName(e.target.value)} />
                <FormHelperText id="my-helper-text">Helper text.</FormHelperText>
            </FormControl>
        </Grid>
        <Grid id="field2" item xs={12}>
            <FormControl>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input id="lastName" onChange={e => setLastName(e.target.value)} />
            </FormControl>
        </Grid>
        <Grid id="submitButton" item xs={12}>
            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/wait",
            }}>
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Link>
        </Grid>
        </Grid> 
        <PatientProfile /> 
    </form>
    )
}

export default UserForm;