import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link,useLocation } from 'react-router-dom';
import PatientProfile from '../../pages/patient/patient_profile';
import EmptyProfile from '../../pages/patient/empty_profile';
import HandleStates from '../../components/handleStates';
import Complaint from '../Complaint/Complaint';




function PatientSection() {
    const location = useLocation()
    const {patientUser,getPatientProfile,patientProfileChange,addItem,updateItem} = HandleStates();
    const [showClicked, setShowClicked] = useState(false);
    const [patientisUpdating, setPatientisUpdating] = useState(false)
    const patientOhip = location.state.patientOhip
    const ohipFound1 = location.state.ohipFound
    const [ohipFound, setOhipFound] = useState(ohipFound1)
    /*const [patientUser, setPatientUser] = useState (patientList.filter(patient  => patient.OHIP === patientOhip))*/
 
    useEffect(() => {
        getPatientProfile(patientOhip)
        
      }, [])
      console.log(patientOhip)
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
                <button style={{marginLeft:100}}  onClick={()=>wrapper2()}> Update </button>
                <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/complaint",
                state: {pO: patientOhip}
                 }}>
                <Button>Next</Button>
            </Link> 
                </div> 
                ) 
        }
        else {return (
                    <div>
                        <EmptyProfile savedOhip = {patientOhip} patientProfileChange = {patientProfileChange}/>
                    <div>
                        {!patientisUpdating ? <button style={{marginLeft:100}}  onClick={()=>wrapper(true)}> Add Patient </button>  : <button style={{marginLeft:100}}  onClick={()=>wrapper(false)}> Confirm </button> }
                    </div>
                    </div> )
             }
     }

    return (
    <div sx={{ flexDirection: "row"}} id='childForm'>

                {showPatient(ohipFound)}
                <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/complaint",
                state: {pO: patientOhip}
                 }}>
                <Button>Next</Button>
        </Link> 

    </div>
    )
}

export default PatientSection;