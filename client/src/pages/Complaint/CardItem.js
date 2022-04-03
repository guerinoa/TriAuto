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

function CardItem(props) {
    const [nextState, setNextState] = useState(false)
    const [area, setArea] = useState(props.area)
    const [value, setValue] = useState("")
    const [comments, setComments] = useState("")
    const [painVal, setPainValue] = useState("")
    const [cedisVal, setCedisVal] = useState(0) 
    const [ctasVal, setCtasVal]  = useState(0)
    const [subQNeeded, setSubQNeeded] = useState(false)
    const [complaintEvent, setComplaintEvent] = useState("") 
    const {setPatientComplaint, addItem} = HandleComplaints();
    const [itemAdded, setItemAdded] = useState(0)
    const [isSubmit, setIsSubmit] = useState(false)
    const patientOhip = props.patientComplaint.OHIP; 


    function buttonPress(BodyPart){
        if(BodyPart === 'Face') { setArea(Face) }
        else if(BodyPart === 'Skin') {setArea(Face) }
        else if (BodyPart === 'HeadAche') { setArea(Headache) }
        else if (BodyPart === 'Mental Health/Neurological') { setArea(Face) }
        else if (BodyPart === 'Eyes'){ setArea(Eyes) } 
        else {
            setNextState(true)
            Object.entries(CedisCtasValues).map(([key,cvalue])=> {
                key === BodyPart && setCedisVal(cvalue[0])
                key === BodyPart && setCtasVal(cvalue[1])
                if(key === BodyPart && cvalue[1]===0) {setSubQNeeded(true)} 
                key == BodyPart && setComplaintEvent(BodyPart)
            })

        }
    }
    useEffect(() => {   
        addItem(patientOhip) 
        console.log("item added")
        console.log(itemAdded)
      }, [itemAdded])

    const handleChange = e => {
        setValue(e.target.value)
    }
    const handleComments = e => {
        setComments(e.target.value)
    }
    const onPainChange = (event,newvalue) =>{
        setPainValue(newvalue)
    }

    function onSubmit() {
        setItemAdded(itemAdded + 1)
        setPatientComplaint({
            ...props.patientComplaint,
            VisitID: 0,
            PatientComplaint: cedisVal,
            PatientCtasLevel: ctasVal,
            ComplaintEvent: complaintEvent,
            PatientPainLevel: painVal,
            PatientSymptomList: value,
            PatientComments: comments,          
        })    
        setIsSubmit(true)
    }
    function PainAndSymptomsDisplay(){
        return (
            <div> 
                <div style={{ flexDirection: "row", height:'300px'}}>
                    <h2 style ={{marginBottom:0}}> Please rate your pain level: </h2> 
                        <Slider marks = {marks} min={1} max={10}  valueLabelDisplay = "auto" defaultValue = {0} onChange= {onPainChange}
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
                <TextField label="Symptoms" variant = "filled" color = "primary" value = {value} onChange = {handleChange} 
                    fullWidth
                    required />   
               
                </form>  
                <form sx={{ flexDirection: "row", height:'200px'}} >
                    
                    <label > Please enter any other comments: </label> 
                    <TextField 
                        label="Extra Comments" 
                        variant = "filled" 
                        Name = "PatientComments"
                        color = "primary" 
                        value = {comments}
                        onChange  = {handleComments}
                        fullWidth
                        required />   
                <Button onClick = {()=>onSubmit()} > Submit </Button>
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
                                       <Button  onClick = {()=>buttonPress(items)}><Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"} > <div className = {items} > {items} </div> </Card>  </Button> 
                                     ) } </div> 
         <div style = {{display:'flex', flexDirection:'row'}}> 
        {area.filter((item,index)=>index>4).map((items,index) =>  
        <Button  onClick = {()=>buttonPress(items)}><Card style={{"width":"150px","height":"150px", "margin":"25px"}} backgroundImage background={"Plum"} hoverType={"zoom"}> <div className = {items}>  {items} </div> </Card>  </Button> 
        ) } </div>
                                            
          </div>  : subQNeeded ? <SubQuestions cedisVal ={cedisVal} setCtasVal={setCtasVal} setSubQNeeded = {setSubQNeeded}/> : PainAndSymptomsDisplay() } 
            
          {isSubmit && 
            <div style={{display:'flex', alignItems:'center'}}>
                    <Redirect to={{
                    pathname: "/complaint",
                    state: {
                        pO:patientOhip                
                    }
                    }}/>
            </div> }
          </div> 
    )
}

export default CardItem;