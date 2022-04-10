import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import "./BeginCollection.css";
import Axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import {Redirect} from 'react-router';

function BeginCollection() {
    const location = useLocation()
    const patientOhip = location.state.patientOhip
    
    const [isSubmit, setSubmit] = useState(false)
    const [isNext, setNext] = useState(false)
    const [age, setAge] = useState('')
    const [patientCtasCedis, setCCList] = useState('')
    const [vitalSigns, setVitalSigns] = useState({
        PatientBloodPressureSys: '',
        PatientBloodPressureDia: '',
        PatientBloodOxygen: '',
        PatientHeartRate: '',
        PatientTemperature: '',
      });
    const [collection, setCollection] = useState(false)
    
      useEffect(() => {
        getAge();
        getCEDISCTAS();

        // Check if other vital signs have been collected by MCU
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            Axios.get('http://localhost:8080/vitalList/collectionReady')
            .then(response => {
                console.log(response)
                if (response.data == 1){
                    setCollection(true)
                } else {
                    setCollection(false)
                }
            });
        }, 5000)
        
        return () => clearInterval(intervalId); //This is important

      }, [])

      const handleChange = (prop) => (event) => {
        setVitalSigns({ ...vitalSigns, [prop]: event.target.value });
      };

      const getAge = () => {
        Axios.get(`http://localhost:8080/patientList/riskcalculateDOB/${patientOhip}`).then((response)=> {
            setAge(response.data[0].Age)
            console.log(response.data[0].Age)
       });
      }

      const getCEDISCTAS = () => {
        Axios.get(`http://localhost:8080/complaintList/riskcalculateCEDISCTAS/${patientOhip}`).then((response)=> {
            setCCList(response.data)
            console.log(response.data)
       });
      }

      const updateVitals =()=> {
          setSubmit(true)
        Axios.put('http://localhost:8080/vitalList/vitalUpdate',{
            vitalSigns: vitalSigns,
            ohipNum: patientOhip
              }).then((response)=> {
                  getVitalSign()
                    }
                 );        
        }
        const getVitalSign = () => {
              Axios.get(`http://localhost:8080/vitalList/vital/${patientOhip}`).then((response)=> {
                  setVitalSigns(response.data[0])
             });
          }
    return (
    
    
        <div className = 'main' style = {{display: 'flex', flexDirection:'column'}} >  
            <div className = "collectionbox" style = {{display: 'flex', flexDirection:'column', width: '50%', height: '60%'}} > 
                    <div className = "collectionform" style = {{display: 'flex', height:'100%', justifyContent:'center', alignItems:'flex-end'}}> 
                   <Box sx={{ display: 'flex', height:'100%', alignItems:'center', flexDirection:'column', flexWrap: 'wrap' }}> 
                            <h2 style={{marginTop:'10px'}}>Running measurement routine... </h2> 
                            <h3 style={ { marginBottom:'10px'}}>When complete enter blood pressure and heart rate values:    </h3> 
                            <div>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                type='number'
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientBloodPressureSys}
                                onChange={handleChange('PatientBloodPressureSys')}
                                endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
                                aria-describedby="outlined-patientbloodpressuresys-helper-text"
                                inputProps={{
                                'aria-label': 'PatientBloodPressureSys',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Systolic Blood Pressure</FormHelperText>
                            </FormControl>
                            </div>
                            <div>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput 
                                type='number'
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientBloodPressureDia}
                                onChange={handleChange('PatientBloodPressureDia')}
                                endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
                                aria-describedby="outlined-patientbloodpressuredia-helper-text"
                                inputProps={{
                                'aria-label': 'PatientBloodPressureDia',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Diastolic Blood Pressure</FormHelperText>
                            </FormControl>
                            </div>
                            <div>

                            <FormControl sx={{ m: 1}} variant="outlined">
                            <OutlinedInput
                                type='number'
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientHeartRate}
                                onChange={handleChange('PatientHeartRate')}
                                endAdornment={<InputAdornment position="end">BPM</InputAdornment>}
                                aria-describedby="outlined-patientheartrate-helper-text"
                                inputProps={{
                                'aria-label': 'PatientHeartRate',
                                }}
                            />
                            <FormHelperText id="outlined-patientheartrate-helper-text">Heart Rate</FormHelperText>
                            </FormControl>

                            </div> 
                    
                     </Box>
                    
                    </div>  
                
                    <div className = "buttonSubmit" style = {{display: 'flex', backgroundColor: 'rgb(231, 230, 230)',justifyContent:'center',alignItems:'flex-start'}}>  <Button variant='outlined' disabled={!collection} onClick = {()=> updateVitals()}>Submit</Button>  </div>
                   
                   
                    {isNext  && <Redirect to={{
                    pathname: "/wait",
                    state: {
                        patientOhip: patientOhip,
                        age:age, 
                        ctascedisList: patientCtasCedis,
                        bloodoxygen: vitalSigns.PatientBloodOxygen,
                        temp:vitalSigns.PatientTemperature,
                        heartrate:vitalSigns.PatientHeartRate,
                        sysbloodpressure:vitalSigns.PatientBloodPressureSys,
                        diabloodpressure:vitalSigns.PatientBloodPressureDia   
                    }                
                    
                    
                    }}/> } 

        </div> 
    </div>
   
        
    )
}

export default BeginCollection;