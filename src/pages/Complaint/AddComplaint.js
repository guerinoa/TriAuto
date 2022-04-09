import * as React from 'react';
import { FormControl, Grid, TextField, Container} from '@mui/material';
import { useState, useEffect } from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Card from 'react-card-component';
import ImageMap from './imageMap'
import HandleComplaints from '../../components/handleComplaints';


function AddComplaint(props) {

    function chiefComplaint() {
        return(
                <form sx={{ flexDirection: "row", height:'200px'}} >
                    
                    <label > Please enter any other comments: </label> 
                    <TextField 
                        label="Extra Comments" 
                        variant = "filled" 
                        color = "primary" 
                        fullWidth
                        required />   
        
                </form>     
        )
    }
 

    return (
        <div style={{display:'flex', alignItems:'center'}}>
            <ImageMap patientComplaint = {props.patientComplaint} /> 
        </div> 
        /*
        <div id="addcomp">
        <AwesomeSlider animation="cubeAnimation">
        <div>
            {ImageMap()}
        </div>
    
        <div className = "cardClass" style = {{display:'flex', flexDirection:'row', alignItems:'center',backgroundColor :'BlanchedAlmond'}}> 
            <div style = {{display:'flex', flexDirection:'row'}}> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Cardiovascular</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Respitory</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Ears</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Mouth, Throat,Neck</div></Card>      
            </div> 
            <div style = {{display:'flex', flexDirection:'row'}}> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px",}} background={"Plum"} hoverType={"zoom"}><div style = {{display: 'flex', justifyContent:'center'}}>Nose</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Eyes</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Skin</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Digestive</div></Card>      
            </div> 
            <div style = {{display:'flex', flexDirection:'row'}}> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Genitals or OBGYN</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Bones and Joints</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Neurological</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Mental Health</div></Card>      
            </div> 
            <div style = {{display:'flex', flexDirection:'row'}}> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Environmental</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Substance Misuse</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>Trauma</div></Card> 
            <Card style={{"width":"150px","height":"150px", "margin":"25px"}} background={"Plum"} hoverType={"zoom"}><div>General or Unknown</div></Card>      
            </div> 
        </div>
        <div style={{backgroundColor :'lightcoral'}}> {chiefComplaint()}</div>
        <div>
            <button style={{marginLeft:100}}  onClick={()=>getPatientComplaint()} > Click </button>
            {complaintList.map(items => <li> {items.OHIP}</li> )} 
 
            </div>
        <div> hello :</div>
      </AwesomeSlider> 
      </div> 
      */
    
    )
}

export default AddComplaint;