import * as React from 'react';
import Button from '@mui/material/Button';

function SubQuestions(props) {
    const FOREIGNBODY = 503
    const VISUALDISTURBANCE = 504 
    function OpthaSubQ() {
        return(
            
            <form sx={{ flexDirection: "row", height:'200px'}} >
            <label > Are you experiencing Vision Loss? </label> 
            <Button onClick={() => {props.setCtasVal(1);props.setSubQNeeded(false)}}>Full</Button> 
            <Button onClick={() =>  {props.setCtasVal(2);  props.setSubQNeeded(false) }}>Partial</Button> 
            <Button onClick={()=> {props.setCtasVal(5);  props.setSubQNeeded(false) }}> None </Button> 
            </form>  
        )
    }
    return (
            <div>
                {props.cedisVal === FOREIGNBODY || props.cedisVal === VISUALDISTURBANCE && OpthaSubQ()}
          </div> 
    )
}

export default SubQuestions