import React from 'react'
import {useState, useEffect} from 'react' 
import HandleState from './handleState';

export const InventoryItem = (props) => {
    
    /*Local edit functions to ensure only specific row in list is allowed to edit */
    const [isEditing,setIsEditing] = useState(false);
    function edit(event,bool){
        setIsEditing(bool); 
        props.isEdit(bool)
    };


    /*inventoryList array is distributed to the following div for editing and deletion purposes.*/
    /*If new field added to inventory items, simply add another div below the price div.  */
    return (
        <div className = "inventItem " style = {{display:'flex', flexDirection:'row'}}>
                
                <div className="item" style = {{display:'flex', paddingRight:20}}>
                        Item: {isEditing ?<input type ="text" name ="item" placeholder = "Item" value ={props.itemn.item}  onChange = {event=>props.onChange(event,props.ind)}  /> :  props.itemn.item} 
                </div>
                <div className="price" style = {{display:'flex',paddingRight:20}}>
                    Price: {isEditing ? <input  type ="text" name ="price" placeholder = "Price" value ={props.itemn.price} onChange = {event=>props.onChange(event,props.ind)} /> :  props.itemn.price } 
                </div>

                
                {isEditing ? <button onClick={event =>edit(event,false)}> Done Editing </button> : <button onClick={event=>edit(event,true)}>  Edit </button> }
                {isEditing ? "can't delete while editing!": <button onClick={event=>props.onDel(event,props.ind)}>  Delete </button> }
        </div>
        )
}


