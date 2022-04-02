import React from 'react'
import {useState, useEffect} from 'react' 


//One function for the updating inputs. 
export const PatientProfile = (props) => { 
    return (
        <div className = "patientProfile " style = {{display:'flex', padding:20, flexDirection:'column', border:'1px solid', alignItems:'center'}}>
                <div className="OHIP" style = {{display:'flex', paddingRight:20 }}>
                <div> <label>OHIP Number: </label> {props.patient.OHIP} </div> 
                </div>
                <div className="FirstName" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>First Name: </label> {props.patient.FirstName} </div> 
                </div>
                <div className="LastName" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Last Name: </label> { props.patient.LastName } </div>   
                </div>
     
                <div className="PatientSex" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>Sex: </label> {props.patient.PatientSex } </div>  
                </div>
                <div className="PatientDOB" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Date of Birth: </label> {props.patient.patientDOB } </div>   
                </div>
                
                <div className="PatientPhoneNumber" style = {{display:'flex', paddingRight:20 }}>
                <div> <label>Phone Number: </label> {props.patient.PatientPhoneNumber} </div> 
                </div>
                {/*For now keep as Address --> may need to change i.e. province, postal code */}
                <div className="PatientAddress" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>Address: </label> {props.patient.PatientAddress } </div> 
                </div>
                <div className="PatientEmail" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Email: </label> {props.patient.PatientEmail } </div>   
                </div>
                <div className="PatientHeight" style = {{display:'flex', paddingRight:20 }}>
                <div> <label>Height: </label> {props.patient.PatientHeight} </div>
                </div>
                <div className="PatientWeight" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>Weight: </label> {props.patient.PatientWeight } </div>  
                </div>
                <div className="PatientAllergies" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Allergies: </label> { props.patient.PatientAllergies } </div>  
                </div>
                
                <div className="PatientMedication" style = {{display:'flex', paddingRight:20 }}>
                <div> <label>Medication: </label> {props.patient.PatientMedication} </div> 
                </div>
                <div className="PatientExistingConditions" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>Existing Conditions: </label> {props.patient.PatientExistingConditions} </div>  
                </div>
        
        </div>
        )
}


export default PatientProfile