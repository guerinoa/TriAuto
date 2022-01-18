import './App.css';
import {useState, useEffect} from 'react' 

import { AddInventoryItem } from './Components/AddInventoryItem'
import { InventoryItem } from './Components/inventoryItem'
import CSVReport from './Components/CSVReport';
import HandleState from './Components/handleState';

function App() {
  const {inventoryItems, iItems, handleChange, handleSubmit, handleChangeEdit, handleDelete,readList,isReading,isEditing1,isEdit}=HandleState();

  return (
      <div>
        <h1> Simple Inventory Tracking List</h1> 
          {inventoryItems.map((items,index) => <InventoryItem key={index} ind={index} itemn={items} onChange= {handleChangeEdit} isEditing1 = {isEditing1} isEdit={isEdit} onDel = {handleDelete}/>)}
          <AddInventoryItem itemm={iItems} onSubmit={handleSubmit} onChange = {handleChange} /> 

          {readList ? <div> <button onClick = {() => isReading(false)}> Close </button> {inventoryItems.map((items,index) => <li key={index}> {items.item}, {items.price}</li>) } </div> 
                            : (isEditing1 ? "Can't read while editing!" 
                                        : <button onClick = {()=>isReading(true)}> Read Inventory List </button> ) }
          {isEditing1 ? "Can't export while editing!" : <CSVReport inventoryItems = {inventoryItems} />     }      
      </div>
  )
}

export default App;
