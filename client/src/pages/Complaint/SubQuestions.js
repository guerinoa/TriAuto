import * as React from 'react';
import Button from '@mui/material/Button';

function SubQuestions(props) {
    const FOREIGNBODY = 503
    const VISUALDISTURBANCE = 504 

    function handleClick(ctas) {
        props.specificComplaintChange("PatientCtasLevel",ctas)
        props.setSubQNeeded(false)
    }

    function OpthaSubQ() {
        return(
            
            <form sx={{ flexDirection: "row", height:'200px'}} >
            <label > Are you experiencing Vision Loss? </label> 
            <Button onClick={() => handleClick(1)}>Full</Button> 
            <Button onClick={() =>  handleClick(2)}>Partial</Button> 
            <Button onClick={()=> handleClick(5)}> None </Button> 
            </form>  
        )
    }
    return (
            <div>
                
                {(props.cedisVal === FOREIGNBODY || props.cedisVal === VISUALDISTURBANCE) && OpthaSubQ()}
          </div> 
    )
}

export default SubQuestions