import React from 'react'
import {useState} from 'react'; 
import Axios from 'axios';

// Here are the inputs for adding items into the inventorylist database. 

function AddItems(props) {

    return (
        <div style={{display:'flex', alignItems: 'center', flexDirection:'column'}}> 
        <div className="App" style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <div className= "listItems" style ={{display:'flex', padding: 20}}> 
                  <label style={{padding:20}}> First name: </label>
                  <input 
                    type = "text" 
                    name = "firstname"
                    onChange = {event=>props.handleChange(event)}
                    />       
            </div>
            <div className= "listItems" style ={{display:'flex',padding: 20}}> 
                <label style={{padding:20}} > Last name: </label>
                <input 
                    type = "text"
                    name= "lastname"
                    onChange = {event=>props.handleChange(event)}
                    />
            </div>

            <div className= "listItems" style ={{display:'flex',padding: 20}}> 
                <label style={{padding:20}} > Age: </label>
                <input 
                type = "number"
                name = "age"
                onChange = {event=>props.handleChange(event)}
                /> 
            </div>
            <div className= "listItems" style ={{display:'flex',padding: 20}}> 
                <label style={{padding:20}} > Risk Level: </label>
                <input 
                type = "number"
                name = "risklevel"
                onChange = {event=>props.handleChange(event)}
                /> 
            </div>
       
        </div>
        <button onClick={props.addItem} style={{padding:10, width:200, height: 50}}> Add Item</button> 
        </div>
      );
}

export default AddItems
