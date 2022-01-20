
import './App.css';
import {useState} from 'react'; 
import Axios from 'axios';
import ReadItems from './components/ReadItems';
import HandleStates from './components/handleStates';
import AddItems from './components/AddItems';
import CSVReport from './components/CSVReport';


// The combinations of all modules get called here. This is the main page. 
function App() {
  const {iItems, newiItems, setiItems, setnewiItems, itemList, showClicked, handleChange,handleChange2, addItem, getItemList, deleteItem, updateItem}=HandleStates();

  return (
    <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}> 
        <h1> Simple Patient Database </h1>
        <AddItems addItem ={addItem }handleChange= {handleChange} /> 
         <CSVReport itemList = {itemList} /> 
        <div style={{padding:20}}>    
        <ReadItems getItemList={getItemList} deleteItem={deleteItem} updateItem = {updateItem} itemList={itemList} showClicked={showClicked} handleChange= {handleChange2} />
        </div>   
   
    </div>
  );
}

export default App;
