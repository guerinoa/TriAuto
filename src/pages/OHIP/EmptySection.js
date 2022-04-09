import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import EmptyProfile from '../../pages/patient/empty_profile';
import HandleStates from '../../components/handleStates';
import "./ohip.css";
import {Redirect} from 'react-router';
import "../../pages/patient/empty_profile.css";

function EmptySection() {
    const {setPatientProfile,patientProfileChange,addItem,updateItem} = HandleStates();
    const location = useLocation()
    const patientOhip = location.state.patientOhip
    const isUpdate = location.state.isUpdate
    const [updated, setUpdated] = useState(false)
    function addPatient() {
        addItem(patientOhip)
        setUpdated(true)
    }

    function updatePatient(){
        updateItem(patientOhip)
        setUpdated(true)
    }
    return (
        <div className = "emptySection" style = {{display:'flex', justifyContent:'center'}}>
        <div className = "emptyprof" >
       
        </div> 
        <div className = "RightPatient" >
            <EmptyProfile savedOhip = {patientOhip} patientProfileChange = {patientProfileChange} setPatientProfile={setPatientProfile}/>
            <div className = "BottomButton" style = {{display:'flex', justifyContent:'center'}} > {isUpdate ? <Button style = {{ width:'20%',height:'50%'}}  variant="contained" color="success" onClick={()=>updatePatient()} > Confirm </Button>  : <Button variant="contained" color="success"  onClick={()=>addPatient()}> Add Patient </Button>} </div>
            
        </div>    
            
            {updated &&<Redirect to={{
                        pathname: "/patientsection",
                        state: {
                                patientOhip:patientOhip,
                                isFemale: false                 
                        }
                        }}/>}
        
         </div> 
    )
}

export default EmptySection;