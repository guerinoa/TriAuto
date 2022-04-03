import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import PatientProfile from '../../pages/patient/patient_profile';
import HandleStates from '../../components/handleStates';
import {Redirect} from 'react-router';
import "./ohip.css";
import "../../pages/patient/patient_profile.css";

function PatientSection() {
    const location = useLocation()
    const {patientUser,getPatientProfile} = HandleStates();
    const patientOhip = location.state.patientOhip
    const isFemale = true
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        getPatientProfile(patientOhip)       
    
      }, [])

    function onUpdate() { 
        setIsUpdate(true)
    }
    function onNext(){
        setIsDone(true)
    }
    return (
        <div className ="patientSection" >
         <div  className={`${isFemale? "femaleDiv": "maleDiv" }`} style = {{display:'flex', flex:1, justifyContent:'center'}}>
       
         </div> 
         <div className = "rightPatient" >
                {patientUser.map(items => <PatientProfile  patient = {items} /> )} 
                <div className = "bottomButton"  > <Button style ={{width:'20%',height:'50%'}} variant="contained" color="primary" onClick={()=>onUpdate()} > Update </Button>
                <Button style ={{marginLeft:'20px', width:'20%',height:'50%'}} variant="contained" color="success" onClick={()=>onNext()} >Next </Button>
                
                
                 </div> 
        </div> 
{/*
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
                    </Link> */}

        {isUpdate &&  <Redirect to={{
            pathname: "/emptysection",
            state: {
                    patientOhip:patientOhip,
                    isUpdate: isUpdate                 
            }
            }}/>}
        {isDone &&  <Redirect to={{
            pathname: "/complaint",
            state: {
                    patientOhip:patientOhip,
                    isUpdate: isUpdate                 
            }
            }}/>}
    </div> 
    )
}

export default PatientSection;