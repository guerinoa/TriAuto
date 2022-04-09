import React from 'react'
import {useState, useEffect} from 'react' 
import "./patient_profile.css";
import Moment from 'react-moment'

export const PatientProfile = (props) => { 
     const moment= require('moment')
    return (
     <div className = "MainDiv" style= {{display: 'flex', justifyContent: 'center'}}> 
        <div className = "patientProfile " style = {{display:'flex', flex:2, flexDirection:'column', alignItems:'center'}}>
                <div className = "welcome" style ={{display:'flex', marginBottom:'20px', alignItems:'center'}}> <h1>Welcome Back </h1> </div>
                <div className="OHIP1"> <h3>OHIP Number: {props.patient.OHIP} </h3> </div>
                <div className = "MiddlePart"> 
                         <div className = "LeftSide" style = {{display:'flex', flexDirection:'column', margin:'20px'}}>
                                   <div className = "NameInfo" style ={{display:'flex'}}>
                                        <div className="infobox">
                                             <h3><span> First Name </span> {props.patient.FirstName} </h3>  
                                        </div> 
                                        <div className="infobox">
                                             <h3><span> Last Name: </span>{props.patient.LastName} </h3>  
                                        </div>
                                   </div> 
                                   <div className ="NumberEmail" style = {{display: 'flex'}}> 
                                        <div className="infobox">
                                             <h3><span> Mobile: </span>{props.patient.PatientPhoneNumber} </h3> 
                                        </div>
                                        <div className="infobox" >
                                             <h3><span> Email: </span> {props.patient.PatientEmail} </h3> 
                                        </div>
                                   </div> 
                                   <div className= "HeightWeight" style ={{display:'flex'}}>
                                        <div className="infobox" >
                                             <h3><span> Height: </span> {props.patient.PatientHeight} </h3>
                                        </div>
                                        <div className="infobox" >
                                             <h3><span> Weight: </span> {props.patient.PatientWeight} </h3>
                                        </div>
                                   </div> 
                         </div>
                         <div className = "RightSide" style ={{display: 'flex', flexDirection: 'column'}}> 
                              <div className="patientSex" style = {{display:'flex'}}>
                                   <h3>Sex: {props.patient.PatientSex} </h3> 
                              </div>
                              <div className="patientDOB" style = {{display:'flex'}}>
                                   <h3>Date of Birth: <br/> <span> {moment(props.patient.patientDOB).format('MMMM Do YYYY')} </span>  </h3> 
                              </div>
                         </div>
               </div> 
                <div className="infobox" >
                    <h3> <span> Address: </span>{props.patient.PatientAddress} </h3> 
                </div>
                <div className="infobox" >
                    <h3><span> Allergies: </span> {props.patient.PatientAllergies} </h3> 
                </div>
                <div className="commentInfo" style = {{display:'flex' }}>
                    <h3><span> Medication: </span>  {props.patient.PatientMedication} </h3>  
                </div>
                <div className="commentInfo" style = {{display:'flex' }}>
                    <h3><span> Comments: </span> {props.patient.PatientExistingConditions} </h3>  
                </div>
        </div>
     </div>
        )
}


export default PatientProfile