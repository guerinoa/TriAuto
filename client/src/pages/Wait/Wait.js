import React, {useEffect, useState, useRef} from 'react'
import { useLocation, Link } from 'react-router-dom';
import '../../pages/Role/Role.css';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './Wait.css';
import {myRiskLevel} from './riskalgorithm'
import Axios from 'axios';


function Wait() {

    const location = useLocation()
    const age = location.state.age
    const patientOhip = location.state.patientOhip
    const ctascedisList = location.state.ctascedisList
   //const bloodoxygen = location.state.bloodoxygen
    //const temp = location.state.temp
    const heartrate = location.state.heartrate
    const sysbloodpressure = location.state.sysbloodpressure
    const diabloodpressure = location.state.diabloodpressure 
    const[time,setTimer] = useState(false)
    useEffect(() => {
        
        setInterval(() => {
            setTimer(true)
        },3000);
      }, [])

      useEffect(() => {
        updateVitals()
      }, [])
    const initials = []

   
    const riskLevels= ctascedisList.map(item => [...initials, myRiskLevel(98,36,heartrate,item.PatientComplaint,age,sysbloodpressure,diabloodpressure,item.PatientCtasLevel)]) 
    const minRisk = Math.min(...riskLevels)
    const updateVitals =()=> {
        Axios.put('http://localhost:8080/vitalList/riskLevelUpdate',{
          OHIP: patientOhip,
          RiskLevel : minRisk
            })       
      }

        return (

            <div className = 'main' style = {{display: 'flex', flexDirection:'column'}} >  
            <div className = "collectionbox" style = {{display: 'flex', flexDirection:'column', width: '50%', height: '60%'}} > 
                    <div className = "collectionform" style = {{display: 'flex', height:'100%', alignItems:'center', justifyContent:'center'}}> 
                
                        <Box sx={{width:'75%'}}>
                            
                             {!time ? <>
                                <h2>
                                Please wait for risk level...
                                </h2>
                             <LinearProgress /> </>: 
                             <h2>
                             Your risk level is: <br/>
                             {minRisk}
                      
                            </h2>   } 
                         
                        </Box>


                    </div>  
                
                   
                   
              

        </div> 
    </div>
    )

}

export default Wait;