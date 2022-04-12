import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid, TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { useState, useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import {Redirect} from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./currentpatient.css";


function CurrentPatient() {
    const location = useLocation()
    const moment= require('moment')
    const patientProfile = location.state.patientProfile
    const [patient, setUpdatePatient] = useState(patientProfile);
    const [isSubmit, setSubmit] = useState(false)
    const [isNext, setNext] = useState(false)
  
    const handleChange = (prop) => (event) => {
        setUpdatePatient({ ...patient, [prop]: event.target.value });
      };

    const updatePatient =()=> {
        setSubmit(false)
        Axios.put('http://localhost:8080/patientList/update',{
          patientProfile: patient,
            }).then((response)=> {
                    console.log(patient)
                  }
               );        
      }


     return (
    <div className = 'main' style = {{display: 'flex', flexDirection:'column'}} >  
    <div className = "collectionbox" style = {{display: 'flex',justifyContent:'center', width: '50%', height: '90%'}} > 
            <div className = "collectionform" style = {{display: 'flex',  flexDirection:'column',height:'100%'}}> 
                <Box sx={{ display: 'flex', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center',flexDirection:'column', flexWrap: 'wrap' }}> 
                    <h3 style={{marginTop:'20px', marginBottom:'20px'}}>Welcome to TriAuto </h3> 
                    <FormControl sx={{ m: 1, width:'100%'}} variant="outlined">
                            <InputLabel htmlFor="ohip">OHIP</InputLabel>
                            <OutlinedInput
                             id="OHIP" 
                             disabled 
                             value={patientProfile.OHIP}
                             aria-describedby="my-helper-text" 
                           
                             label="OHIP"
                             />
                    </FormControl>
                    <div style = {{display: 'flex', width: '100%' , alignItems: 'center', flexDirection:'row'}}> 
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <OutlinedInput
                             id="firstName" 
                             disabled ={isSubmit? false : true}  
                             value={patient.FirstName}
                             aria-describedby="my-helper-text" 
                             onChange={handleChange('FirstName')} 
                             label="First Name"
                             />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="LastName">Last Name</InputLabel>
                            <OutlinedInput
                             id="LastName" 
                             disabled ={isSubmit? false : true}  
                             value={patient.LastName}
                             aria-describedby="my-helper-text" 
                             onChange={handleChange('LastName')} 
                             label="Last Name"
                             />
                    </FormControl>
                    </div>
                    <div style = {{display: 'flex',flexDirection:'row'}}> 
                    <FormControl sx={{ m: 1, width: '50%' }} >
                        <InputLabel id="simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            disabled ={isSubmit? false : true}  
                            value={patient.PatientSex}
                            label= 'Gender'
                            sx={{ width: 220 }}
                            onChange={handleChange('PatientSex')}
                        >
                            <MenuItem value={'F'}>F</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                        
                        </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '50%' }} >
                                <TextField
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        disabled ={isSubmit? false : true}
                                        value={moment(patient.patientDOB).format('YYYY-MM-DD')}
                                        onChange={handleChange('patientDOB')}
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                        </FormControl>
                    </div> 
                    <div style = {{display: 'flex',width: '100%' ,flexDirection:'row'}}> 
                    <FormControl sx={{ m: 1,width: '100%'  }} >
                            <InputLabel htmlFor="PhoneNumber">Phone Number</InputLabel>
                            <OutlinedInput
                             id="PhoneName" 
                             disabled ={isSubmit? false : true}  
                             value={patient.PatientPhoneNumber}
                             aria-describedby="my-helper-text" 
                             onChange={handleChange('PatientPhoneNumber')} 
                             label="Phone Number"
                             />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '100%'  }} >
                        <InputLabel htmlFor="Address">Address</InputLabel>
                            <OutlinedInput
                             id="Address" 
                             disabled ={isSubmit? false : true}  
                             value={patient.PatientAddress}
                             aria-describedby="my-helper-text" 
                             onChange={handleChange('PatientAddress')} 
                             label="Address"
                             />
                        </FormControl>
                    </div>
                    <FormControl sx={{ m: 1}} fullWidth  variant="outlined">
                            <InputLabel htmlFor="Email">Email</InputLabel>
                            <OutlinedInput
                             id="Email" 
                             type = "email"
                             disabled ={isSubmit? false : true}  
                             value={patient.PatientEmail}
                             aria-describedby="my-helper-text" 
                             onChange={handleChange('PatientEmail')} 
                             label="Email"
                             />
                    </FormControl>
                    <div>
                            <FormControl sx={{ m: 1, width: '13ch' }} variant="outlined">
                            <OutlinedInput
                                disabled ={isSubmit? false : true}  
                                value={patient.PatientWeight}
                                onChange={handleChange('PatientWeight')}
                                endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                aria-describedby="my-helper-text"
                                inputProps={{
                                'aria-label': 'Weight',
                                }}
                            />
                            
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '13ch' }} variant="outlined">
                            <OutlinedInput 
                                disabled ={isSubmit? false : true}  
                                value={patient.PatientHeight}
                                onChange={handleChange('PatientHeight')}
                                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                aria-describedby="my-helper-text"
                                inputProps={{
                                'aria-label': 'Height',
                                }}
                            />
                            </FormControl>
                            </div>
                            <FormControl sx={{ m: 1}} fullWidth >
                            
                                <TextField
                                        id="Allergies"
                                        type="textarea"
                                        disabled ={isSubmit? false : true}
                                        value={patient.PatientAllergies}
                                        onChange={handleChange('PatientAllergies')}
                                        label="Allergies"
                                    />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1}} >  
                            <TextField
                                    id="Medication"
                                    type="textarea"
                                    disabled ={isSubmit? false : true}
                                    value={patient.PatientMedication}
                                    onChange={handleChange('PatientMedication')}
                                    label="Medication"
                                />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} >  
                            <TextField
                                    id="Existing Conditions"
                                    type="textarea"
                                    disabled ={isSubmit? false : true}
                                    value={patient.PatientExistingConditions}
                                    onChange={handleChange('PatientExistingConditions')}
                                    label="Comments"
                                />
                    </FormControl>
                                
             </Box>
                    <div className = "buttonSubmit" style = {{display: 'flex', backgroundColor: 'rgb(231, 230, 230)',justifyContent:'center',alignItems:'flex-start'}}>  <Button disabled = {isSubmit ? false : true} onClick = {()=> updatePatient()}>Submit</Button>  <Button  disabled = {isSubmit ? true : false} onClick = {()=> setSubmit(true)}>Update</Button> <Button  disabled = {isSubmit ? true : false} onClick = {()=> setNext(true)}>Next</Button></div>
        
                    {isNext &&  <Redirect to={{
                    pathname: "/complaint",
                    state: {
                            pO:patient.OHIP,
                         
                    }
                    }}/>}
                

</div> 
</div>
</div>
  )
}




export default CurrentPatient