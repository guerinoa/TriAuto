import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from 'react-router-dom';
import PatientProfile from '../../pages/patient/patient_profile';
import EmptyProfile from '../../pages/patient/empty_profile';
import HandleStates from '../../components/handleStates';
import Complaint from '../Complaint/Complaint';
import {Redirect} from 'react-router';
import "./ohip.css";


function OhipSubmission() {
    const {patientUser,setPatientProfile, getPatientProfile,patientProfileChange,addItem,updateItem} = HandleStates();
    const [patientOhip, setOHIP] = useState(0)
    const [ohipFound, setOhipFound] = useState(false)
    const [ohipNotFound, setNotOhipFound] = useState(false)
    const [isFemale, setIsFemale] = useState(false)

    useEffect(() => {
        getPatientProfile(patientOhip)
      }, [patientOhip])

    function handleSubmit() {
       
        {patientUser.length > 0 ? setOhipFound(true) : setNotOhipFound(true) } 
      }
      /* 
    function wrapper(bool) {
        
        setOhipFound(true)
        if (bool){  addItem(patientOhip);}
        else { updateItem(patientOhip)
              setPatientisUpdating(false); }
    

    }
    function wrapper2(){
        setPatientisUpdating(true)
        setOhipFound(false)
    }


    function showPatient(bool) {
        if (bool) {
            return(
                <div> 
                {patientUser.map(items => <PatientProfile  patient = {items} /> )} 
                <Button style={{marginLeft:100}}  onClick={()=>wrapper2()}> Update </Button>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/complaint",
                        state: {pO: patientOhip}
                        }}>
                        <Button>Next</Button>
                    </Link> 
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/ohip",
                        }}>
                     <Button>Back</Button>
                    </Link> 
                </div> 
                ) 
        }
        else {return (
                    <div style = {{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                            <div className = "emptyprof" style = {{display:'flex', flex:1, justifyContent:'center'}}>
                           
                            </div> 
                        <EmptyProfile savedOhip = {patientOhip} patientProfileChange = {patientProfileChange} setPatientProfile={setPatientProfile}/>
                        {!patientisUpdating ? <Button style={{marginLeft:100}}  onClick={()=>wrapper(true)}> Add Patient </Button>  : <Button style={{marginLeft:100}}  onClick={()=>wrapper(false)}> Confirm </Button>  }
                    </div> )
             }
     }
   */ 
    return (
        <div className = 'mainForm' style = {{display: 'flex', flexDirection:'column'}} >  
            <div className = "ohipbox" style = {{display: 'flex', flexDirection:'column', width: '50%', height: '50%'}} > 
                    <div className = "ohipform" style = {{display: 'flex', flex:1, justifyContent:'center', alignItems:'flex-end'}}> 
                    <Grid id="field1"  item xs={8} spacing={2}>
                    <FormControl>
                        <InputLabel htmlFor="firstName">OHIP</InputLabel>
                        <Input id="firstName" aria-describedby="my-helper-text" onChange={e => setOHIP(e.target.value)} />
                        <FormHelperText id="my-helper-text">Please enter your 12 digit OHIP number and Version</FormHelperText>
                    </FormControl>
                    </Grid>
                    </div>  
                        {ohipFound  &&  <Redirect to={{
                                pathname: "/patientsection",
                                state: {
                                        patientOhip:patientOhip,
                                        isFemale:isFemale                  
                                }
                                }}/>}
                        {ohipNotFound  &&  <Redirect to={{
                                pathname: "/emptysection",
                                state: {
                                patientOhip:patientOhip,
                                isUpdate: false                  
                                }
                                }}/>}
                    <div className = "buttonSubmit" style = {{display: 'flex', justifyContent:'center',alignItems:'flex-start', flex:1}}>  <Button onClick={() => handleSubmit(true)}>Submit</Button>  </div>
                    

        </div> 
    </div>
    )
}

export default OhipSubmission;