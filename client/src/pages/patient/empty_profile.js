import React from 'react'
import {useState, useEffect} from 'react' 
import "./empty_profile.css";

//One function for the updating inputs. 
export const EmptyProfile = (props) => { 
     const [value, setValue] =useState("F")
     useEffect(() => {
          props.setPatientProfile ({
               OHIP: props.savedOhip,  
               PatientSex: value        
           })
        }, [])
  
     function dropDownChange(event) {
          console.log(event.target.value)
          setValue(event.target.value)
          props.patientProfileChange(event)
     }
    return (
        <div className = "MainDiv" style= {{display: 'flex', justifyContent: 'center'}}> 
        <div className = "EmptyProfile " style = {{display:'flex', flex:2, flexDirection:'column', alignItems:'center'}}>
                <div className = "welcome" style ={{display:'flex', marginBottom:'20px', alignItems:'center'}}> <h1>Welcome Patient </h1> </div>
                <div className="OHIP">
                 <h3>OHIP Number: {props.savedOhip} </h3>
                </div>
               <div className = "middlePart" style = {{display:'flex', margin:'20px'}}> 
                         <div className = "leftSide" style = {{display:'flex', flexDirection:'column', margin:'20px'}}>
                                   <div className = "nameInfo" style ={{display:'flex'}}>
                                        <div className="field">
                                             <input  type ="text" name ="FirstName" placeholder = "First Name"  onChange = {event=>props.patientProfileChange(event)} /> 
                                        </div>
                                        <div className="field">
                                             <input  type ="text" name ="LastName" placeholder = "Last Name"  onChange = {event=>props.patientProfileChange(event)} /> 
                                        </div>
                                   </div> 
                                   <div className ="numberEmail" style = {{display: 'flex'}}> 
                                   <div className="field">
                                   <input  type ="tel" name ="PatientPhoneNumber" placeholder = "Mobile No*" pattern= "[0-9]{3}-[0-9]{3}-[0-9]{4}"  onChange = {event=>props.patientProfileChange(event)} />
                                   </div>
                                   <div className="field" >
                                        <input  type ="text" name ="PatientEmail" placeholder = "Email"  onChange = {event=>props.patientProfileChange(event)} /> 
                                   </div>
                                   </div> 
                                   {/*For now keep as Address --> may need to change i.e. province, postal code */}
                         
                              
                                   <div className= "heightWeight" style ={{display:'flex'}}>
                                   <div className="field" >
                                        <input  type ="text" name ="PatientHeight" placeholder = "Height"  onChange = {event=>props.patientProfileChange(event)} />
                                   </div>
                                   <div className="field" >
                                        <input  type ="text" name ="PatientWeight" placeholder = "Weight"  onChange = {event=>props.patientProfileChange(event)} />
                                   </div>
                                   </div> 
                         </div>
                         <div className = "rightSide" style ={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin:'20px'}}> 
                              <div className="PatientSex" style = {{display:'flex'}}>
                                   <select  name ="PatientSex" value = {value} onChange = {event=>dropDownChange(event)}> <option value ="F">F </option><option value ="M"> M</option> </select> 
                              </div>
                              <div className="PatientDOB" style = {{display:'flex'}}>
                                   <input  type ="date" name ="patientDOB" placeholder = "Date of Birth"  onChange = {event=>props.patientProfileChange(event)} /> 
                              </div>
                         </div>
               </div> 
                <div className="field" >
                     <input  type ="text" name ="PatientAddress" placeholder = "Address"  onChange = {event=>props.patientProfileChange(event)} /> 
                </div>
                <div className="field" >
                  <input type ="text" name ="PatientAllergies" placeholder = "Allergy"  onChange = {event=>props.patientProfileChange(event)} /> 
                </div>
                
                <div className="comments" style = {{display:'flex' }}>
                     <input  type ="text" name ="PatientMedication" placeholder = "Medication" onChange = {event=>props.patientProfileChange(event)} /> 
                </div>
                <div className="comments" style = {{display:'flex'}}>
                     <input  type ="text" name ="PatientExistingConditions" placeholder = "Existing Conditions" onChange = {event=>props.patientProfileChange(event)} /> 
                </div>


        </div>   
        
        </div>
        )
}


export default EmptyProfile