import React from 'react'
import {useState, useEffect} from 'react' 


//One function for the updating inputs. ReadItems module maps each element of the array to it's own 'inventoryItem' allowing for efficiency and modularity. 
export const InventoryItem = (props) => {
    
    return (
        <div> 
        <div className = "inventItem " style = {{display:'flex', padding:20, flexDirection:'column', border:'1px solid', alignItems:'center'}}>

                <div className="Firstname" style = {{display:'flex', paddingRight:20 }}>
                <div> <label>Firstname: </label> {props.items.firstname} </div> <div> <input style ={{marginLeft:30}} type ="text" name ="firstname" placeholder = "Firstname" onChange = {event=>props.handleChange(event)} /></div> 
                </div>
                <div className="Lastname" style = {{display:'flex',paddingRight:20}}>
                     <div> <label>Lastname: </label> { props.items.lastname} </div>  <div> <input style ={{marginLeft:30}} type ="text" name ="lastname" placeholder = "Lastname" onChange = {event=>props.handleChange(event)}  /> </div> 
                </div>
                <div className="Age" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Age: </label> { props.items.age } </div>   <div> <input style ={{marginLeft:30}} type ="text" name ="age" placeholder = "Age" onChange = {event=>props.handleChange(event)} /> </div> 
                </div>
                <div className="Risklevel" style = {{display:'flex',paddingRight:20}}>
                <div> <label>Risklevel: </label> { props.items.risklevel } </div>   <div> <input style ={{marginLeft:30}} type ="text" name ="risklevel" placeholder = "Risklevel" onChange = {event=>props.handleChange(event)} /> </div> 
                </div>

        </div>   
                <div>
                 
                <button style={{margin:20}}onClick={()=>props.deleteItem(props.id)}>  Delete </button> 
                <button style={{marginLeft:100}}  onClick={()=>props.updateItem(props.id)}>  Update </button> 
                </div>
        
        </div>
        )
}


export default InventoryItem