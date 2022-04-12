import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import {Redirect} from 'react-router';
import "./ohip.css";
import Axios from 'axios';

function OhipSubmission() {
    const [ohipFound, setOhipFound] = useState(false)
    const [patientProfile, setPatientProfile] = useState(
        {
            OHIP:0,
            FirstName: '',
            LastName: '',
            PatientSex: 'F',
            patientDOB: '',
            PatientPhoneNumber: '',
            PatientAddress: '',
            PatientEmail: '',
            PatientHeight: '',
            PatientWeight: '',
            PatientAllergies: '',
            PatientMedication: '',
            PatientExistingConditions: ''
        }
      );

    const getPatientProfile = () => {
                Axios.get(`http://localhost:8080/patientList/${patientProfile.OHIP}`).then((response)=> {
                    setPatientProfile(response.data[0])
                    console.log(response.data.length)
                    {response.data.length > 0 ? setOhipFound(true) : addPatient() } 
                    console.log(response.data[0])
              });
        }

    const handleChange = (prop) => (event) => {
        setPatientProfile({ ...patientProfile, [prop]: event.target.value });
      };

    function handleSubmit() {
        getPatientProfile()
      }
    
    function addPatient() {   
        Axios.post('http://localhost:8080/patientList/create',{
            patientProfile: patientProfile
            }).then(()=>
            {
              console.log("added!")
              console.log(patientProfile)
            } 
            );
         
            setOhipFound(true)
    }

    return (
        <div className = 'mainForm' style = {{display: 'flex', flexDirection:'column'}} >  
            <div className = "ohipbox" style = {{display: 'flex', flexDirection:'column', width: '50%', height: '50%'}} > 
                    <div className = "ohipform" style = {{display: 'flex', flex:1, justifyContent:'center', alignItems:'flex-end'}}> 
                    <Grid id="field1"  item xs={8} spacing={2}>
                    <FormControl>
                        <InputLabel htmlFor="firstName">OHIP</InputLabel>
                        <Input id="firstName" aria-describedby="my-helper-text" onChange={handleChange('OHIP')} />
                        <FormHelperText id="my-helper-text">Please enter your 12 digit OHIP number and Version</FormHelperText>
                    </FormControl>
                    </Grid>
                    </div>  
                        {ohipFound  &&  <Redirect to={{
                                pathname: "/currentpatient",
                                state: {                                  
                                    patientProfile: patientProfile,
                       
                                }
                                }}/>}
                    <div className = "buttonSubmit" style = {{display: 'flex', justifyContent:'center',alignItems:'flex-start', flex:1}}>  <Button onClick={() => handleSubmit(true)}>Submit</Button> </div>
                    

        </div> 
    </div>
    )
}

export default OhipSubmission;