import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import './details.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';

const Details = () => {

    const location = useLocation();
    const [details, setDetails] = useState([]);
    const [riskLevel, setRiskLevel] = useState(5);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {

        var ohip = location.state.ohip
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:8080/nurseList/details/' + ohip )
            .then(response => {
                setDetails(response.data);
            })
        }, []);

    const toLanding=()=>{
        setRedirect('True');
    }

    const approve = () => {
        axios.post('http://localhost:8080/nurseList/approval', {risk: riskLevel, ohip: details[0].ohip}).then(function (response) {
            console.log(response);
        })
    }

    const onConfirm = () => {
        approve();
        toLanding();
    }

    const onCancel = () => {
        toLanding();
    }

    const onRiskChange = (e) => setRiskLevel(parseInt(e.target.value))

    return (
        <div id="patientInfo">
            {redirect && (
            <Redirect to={{
                pathname: "/nurselanding"
                }}/>
            )}
            <h1>Patient Profile</h1>
            {details.map((detail) => (
                <p>
                    First Name: {detail.firstname} <br></br>
                    Last Name: {detail.lastname} <br></br>
                    OHIP: {detail.ohip} <br></br>
                    Sex: {detail.patientsex} <br></br>
                    DOB: {detail.patientdob}<br></br>
                    Blood Pressure: {detail.PatientBloodPressure}<br></br>
                    Blood Oxygen: {detail.PatientBloodOxygen}<br></br>
                    Heart Rate: {detail.PatientHeartRate} <br></br>
                    Temperature: {detail.PatientTemperature}<br></br>
                    Phone Number: {detail.PatientPhoneNumber}<br></br>
                    Address: {detail.PatientAddress}<br></br>
                    Email: {detail.PatientEmail}<br></br>
                    Height: {detail.PatientHeight}<br></br>
                    Weight: {detail.PatientWeight}<br></br>
                    Allergies: {detail.PatientAllergies}<br></br>
                    Medication: {detail.PatientMedication}<br></br>
                    Conditions: {detail.PatientExistingConditions}<br></br>
                    Complaint: {detail.PatientComplaint}<br></br>
                    Pain level: {detail.PatientPainLevel}<br></br>
                    Symptoms: {detail.PatientSymptomList}<br></br>
                    Arrival Date: {detail.arrivaldate}

                    <h4>Approve or change the below risk level</h4>
                    <br/>
                    <div>
                        <TextField
                            required
                            type="number"
                            id="outlined-required"
                            label="Risk Level"
                            InputProps={{
                                inputProps: { 
                                    max: 5, min: 0
                                }
                            }}
                            defaultValue={detail.PatientRiskLevel}
                            style = {{width: 100}}
                            onChange={onRiskChange}
                            />
                    </div>
                </p>

                
            ))}

          <br>
          </br>
          <Button id="button1" variant="contained" onClick={onConfirm} >Confirm</Button>
          <Button id="button2" variant="outlined" onClick={onCancel} >Cancel</Button>

        </div>
  
    );
}

export default Details;