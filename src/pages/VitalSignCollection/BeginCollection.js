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
    
      useEffect(() => {
        getAge();
        getCEDISCTAS();
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
                            <h3 style={{marginTop:'20px', marginBottom:'20px'}}>Please input your vital signs:    </h3> 
                         <div>
                            <FormControl sx={{ m: 1, width: '13ch' }} variant="outlined">
                            <OutlinedInput
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientBloodPressureSys}
                                onChange={handleChange('PatientBloodPressureSys')}
                                endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
                                aria-describedby="outlined-patientbloodpressuresys-helper-text"
                                inputProps={{
                                'aria-label': 'PatientBloodPressureSys',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Systolic</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '13ch' }} variant="outlined">
                            <OutlinedInput 
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientBloodPressureDia}
                                onChange={handleChange('PatientBloodPressureDia')}
                                endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
                                aria-describedby="outlined-patientbloodpressuredia-helper-text"
                                inputProps={{
                                'aria-label': 'PatientBloodPressureDia',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Diastolic</FormHelperText>
                            </FormControl>
                            </div>
                            <div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                disabled = {isSubmit? true : false} 
                                value={vitalSigns.PatientBloodOxygen}
                                onChange={handleChange('PatientBloodOxygen')}
                                endAdornment={<InputAdornment position="end">SpO2</InputAdornment>}
                                aria-describedby="outlined-patientbloodoxygen-helper-text"
                                inputProps={{
                                'aria-label': 'PatientBloodOxygen',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Blood Oxygen</FormHelperText>
                            </FormControl>
                            </div> 
                            <div>

                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
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
                            <div>

                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                disabled = {isSubmit? true : false} 
                                value ={vitalSigns.PatientTemperature}
                                onChange={handleChange('PatientTemperature')}
                                endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                                aria-describedby="outlined-patienttemperature-helper-text"
                                inputProps={{
                                'aria-label': 'PatientTemperature',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Temperature</FormHelperText>
                            </FormControl>

                            </div>
                    
                     </Box>
                    
                    </div>  
                
                    <div className = "buttonSubmit" style = {{display: 'flex', backgroundColor: 'rgb(231, 230, 230)',justifyContent:'center',alignItems:'flex-start'}}>  <Button disabled = {isSubmit ? true : false} onClick = {()=> updateVitals()}>Submit</Button>  <Button  disabled = {isSubmit ? false : true} onClick = {()=> setSubmit(false)}>Update</Button> <Button  disabled = {isSubmit ? false : true} onClick = {()=> setNext(true)}>Next</Button></div>
                   
                   
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