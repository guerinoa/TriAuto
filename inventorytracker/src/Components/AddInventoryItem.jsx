import React from 'react'

/*The form field when adding input can be found here */
/*If fields are added, simply add inputs to the new field below, with the corresponding value and name changes.  */
/*Props used for arguments, for easy addition of fields, if changes made. */
export const AddInventoryItem =(props) => {
    return (
        <div>
            <form onSubmit = {props.onSubmit}>
                <input 
                    type ="text"
                    className = " "
                    placeholder='item'
                    name= "item"
                    value = {props.itemm.item}
                   onChange={props.onChange}
                  /> 
                    
                <input 
                    type ="text"
                    className = " "
                    placeholder='price'
                    name = "price"
                    value = {props.itemm.price}
                    onChange={props.onChange}
                    /> 
                <button type ="submit"  >Add </button> 
                    
            </form>
       
        </div>
    )
}

