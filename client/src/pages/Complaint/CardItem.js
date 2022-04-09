import * as React from 'react';
import {TextField, Slider, Box} from '@mui/material';
import { useState, useEffect } from "react";

import 'react-awesome-slider/dist/styles.css';
import Card from 'react-card-component';
import HandleComplaints from '../../components/handleComplaints';
import { Face, Headache, Eyes, CedisCtasValues, marks} from './BodyData';
import Button from '@mui/material/Button';
import AwesomeSlider from 'react-awesome-slider';
import SubQuestions from './SubQuestions';
import { textAlign } from '@mui/system';
import './cardStyle.css';
import {Redirect} from 'react-router';
import Axios from 'axios';

function CardItem(props) {
    const [nextState, setNextState] = useState(false)
    const [area, setArea] = useState(props.area)
    const [cedisVal, setCedisVal] = useState(0) 
    const [subQNeeded, setSubQNeeded] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [next, setNext] = useState(false)
    const [isAdded, setAdded] = useState(false)
    const patientOhip = props.patientOhip; 
    const [complaintList, setComplaintList] = useState(props.complaintList)


    const [patientComplaint, setComplaint] = useState({
        OHIP: patientOhip,
        VisitID: 0,
        PatientComplaint: '',
        PatientCtasLevel: 0,
        ComplaintEvent: '',
        PatientPainLevel: 0,
        PatientSymptomList: '',
        PatientComments: '',
    });
    
    const complaintChange = (prop) => (event) => {
        setComplaint({ ...patientComplaint, [prop]: event.target.value });
      };

    const specificComplaintChange= (name,value) => {
        setComplaint({
        ...patientComplaint,  
        [name]:value
    })
    }
      const listChange= (list1,list2) => {
        setComplaint({
          ...patientComplaint,
          [list1[0]]:list2[0],
          [list1[1]]:list2[1],
          [list1[2]]:list2[2]
        })
        }

    function buttonPress(BodyPart){
        if(BodyPart === 'Face') { setArea(Face) }
        else if(BodyPart === 'Skin') {setArea(Face) }
        else if (BodyPart === 'HeadAche') { setArea(Headache) }
        else if (BodyPart === 'Mental Health/Neurological') { setArea(Face) }
        else if (BodyPart === 'Eyes'){ setArea(Eyes) } 
        else {
            setNextState(true)
            Object.entries(CedisCtasValues).map(([key,cvalue])=> {
                key === BodyPart && listChange(["PatientComplaint","PatientCtasLevel","ComplaintEvent"],[cvalue[0],cvalue[1],BodyPart])
                key === BodyPart && setCedisVal(cvalue[0])
                
                if(key === BodyPart && cvalue[1]===0) {setSubQNeeded(true)} 

            })

        }
    }

    const addComplaint =() => {
        Axios.post('http://localhost:8080/complaintList/create',{
            patientComplaint: patientComplaint
            })
        setNext(true)
    }
    const getPatientComplaint = () => {
        Axios.get(`http://localhost:8080/complaintList/${patientOhip}`).then((response)=> {
            setComplaintList(response.data); 
            setAdded(true)
            
        }); 
        setIsSubmit(true)

    }

    function PainAndSymptomsDisplay(){
        return (
            <div> 
                <div style={{ flexDirection: "row", height:'300px'}}>
                    <h2 style ={{marginBottom:0}}> Please rate your pain level: </h2> 
                        <Slider marks = {marks} min={1} max={10} name = "PatientPainLevel" valueLabelDisplay = "auto" value = {patientComplaint.PatientPainLevel} onChange= {complaintChange("PatientPainLevel")}
                                sx ={{
                                    ":hover":{
                                    boxShadow:0,
                                    color: 'error.main',
                                    bg: 'dark',
                                    }, width: 700, height: 15,  color: 'secondary.main', boxShadow:0    
                                }} />  
                </div>
                <form sx={{ flexDirection: "row", height:'200px'}} >
        
                <label > Please enter any other symptoms: </label> 
                <TextField label="Symptoms" name ="PatientSymptomList" variant = "filled" color = "primary" value = {patientComplaint.PatientSymptomList} onChange = {complaintChange("PatientSymptomList")} 
                    fullWidth
                    required />   
               
                </form>  
                <form sx={{ flexDirection: "row", height:'200px'}} >
                    
                    <label > Please enter any other comments: </label> 
                    <TextField 
                        label="Extra Comments" 
                        variant = "filled" 
                        name = "PatientComments"
                        color = "primary" 
                        value = {patientComplaint.PatientComments}
                        onChange  = {complaintChange("PatientComments")}
                        fullWidth
                        required />   
                <Button disabled = {!next ?false:true} onClick = {()=>addComplaint()} > Submit </Button>
                <Button color = "success" disabled = {!next ?true:false} onClick = {()=>getPatientComplaint()} > table </Button>
                </form>     
            </div> 
        )
    }

    
    return (
        
        <div>
          {!nextState ?  
          <div className = "cardClass" > 
           <div style = {{display:'flex', flexDirection:'row'}}> 
          {area.filter((item,index)=>index<5).map((items,index) =>  
                                       <Button  onClick = {()=>buttonPress(items)}><Card style={{"width":"145px","height":"145px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"} > <div className = {items} > {items} </div> </Card>  </Button> 
                                     ) } </div> 
         <div style = {{display:'flex', flexDirection:'row'}}> 
        {area.filter((item,index)=>index>4).map((items,index) =>  
        <Button  onClick = {()=>buttonPress(items)}><Card style={{"width":"145px","height":"145px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}> <div className = {items}>  {items} </div> </Card>  </Button> 
        ) } </div>
                                            
          </div>  : subQNeeded ? <SubQuestions cedisVal ={cedisVal} specificComplaintChange={specificComplaintChange} setSubQNeeded = {setSubQNeeded} /> : PainAndSymptomsDisplay() } 
            
          {(isSubmit === true && isAdded === true) && 
            <div style={{display:'flex', alignItems:'center'}}>
                    <Redirect to={{
                    pathname: "/complaint",
                    state: {
                        pO:patientOhip,
                        complaintList: complaintList              
                    }
                    }}/>
            </div> }
          </div> 
    )
}

export default CardItem;