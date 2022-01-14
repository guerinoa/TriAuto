import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket;
const CONNECTION_PORT = 'localhost:4000'

function UserForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [CONNECTION_PORT])

    function handleSubmit() {
        socket.emit("submit", {'firstName': firstName, 'lastName': lastName})
        alert('A name was submitted: ' + firstName + ' ' + lastName);
      }
  
    return (
    <form sx={{ flexDirection: "row"}} id='childForm'>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <FormControl>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input id="firstName" aria-describedby="my-helper-text" onChange={e => setFirstName(e.target.value)} />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input id="lastName" onChange={e => setLastName(e.target.value)} />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Button onClick={() => handleSubmit()}>Submit</Button>
        </Grid>
        </Grid>
    </form>
    )
}

export default UserForm;