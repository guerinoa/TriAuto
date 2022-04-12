import * as React from 'react';
import Button from '@mui/material/Button';
import { IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import HandleComplaints from '../../components/handleComplaints';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Card from 'react-card-component';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../components/FormDialog';
import ImageMap from './imageMap'
import AddComplaint from './AddComplaint';
import {Redirect} from 'react-router';
import Axios from 'axios';
import './complaint.css';
import { DataGridPro } from '@mui/x-data-grid-pro';
function Complaint() {
    const location = useLocation()
    const cP = location.state.pO
    const complaintList1 = location.state.complaintList
    const [isPressed,setIsPressed] = useState(false)
    const [isBeingCollected,setIsBeingCollected] = useState(false)
    const [selectedIDs, setSelectedIds] = useState(new Set())
    const [changeMade, setChangeMade] = useState(false)
    const [dummyList, setDummyList] = useState([])
    const [loading, setLoading] = useState(false)
         
    useEffect(() => {
        getPatientComplaint();
      }, [])

    function press() {
        setIsPressed(true)
    }

    function beginCollection() {

        // Get visit id of most recent vist
        Axios.post('http://localhost:8080/vitalList/collection', {ohip: cP}).then(function (response) {
            console.log(response);
        })

        setLoading(true)

        Axios.post('http://localhost:8080/vitalList/createVital',{
            patientOhip: cP
            }).then(()=>
            {
              console.log("added!")
            } 
            );
        
        setIsBeingCollected(true)
    }
    
    const deleteItem = (ohipNum,id)=> {
        Axios.delete(`http://localhost:8080/complaintList/delete/${id}`)
      }
      
    const getPatientComplaint = () => {
        Axios.get(`http://localhost:8080/complaintList/${cP}`).then((response)=> {
            console.log(response.data)
            setDummyList(response.data); 
            
        });
    }

    function deleteComplaint() {
       selectedIDs.map(idToDelete => dummyList.map(complaints => complaints.ComplaintID === idToDelete && deleteItem(complaints.OHIP,idToDelete)))
       selectedIDs.map(idToDelete => setDummyList(dummyList.filter(complaint => idToDelete != complaint.ComplaintID)))
       setChangeMade(true)

    }
    console.log(dummyList)
    const columns = [
        { field: 'ComplaintID', headerName: 'ComplaintID',},
        { field: 'OHIP', headerName: 'OHIP',  width: 120},
        { field: 'VisitID',
            headerName: 'VisitID',
            type: 'number',
            width: 60,
        },
        {
            field: 'PatientComplaint',
            headerName: 'Complaint',
            disableClickEventBubbling: true,
            width: 100,

        },
        {
            field: 'PatientCtasLevel',
            headerName: 'Ctas Level',
            disableClickEventBubbling: true,
            width: 100,

        },
        {
            field: 'ComplaintEvent',
            headerName: 'Complaint Event',
            disableClickEventBubbling: true,
            width: 150,
        },
        {
            field: 'PatientPainLevel',
            headerName: 'Pain Level',
            disableClickEventBubbling: true,
            width: 100,

        },
        {
            field: 'PatientSymptomList',
            headerName: 'Symptoms',
            disableClickEventBubbling: true,

        },
        {
            field: 'PatientComments',
            headerName: 'Comments',
            disableClickEventBubbling: true,
        },
    ]  
    return (
       <> 
       <div id = 'complaintTable' style={{ width: '100%' }}>

        <DataGrid
  
            getRowId={row => row.ComplaintID}
            rows= {dummyList}
            columns={columns}
            autoHeight
            pageSize={20}
            rowsPerPageOptions={[5]}
            checkboxSelection
            fullWidth = {true}
            onSelectionModelChange={(ids) => {
                setSelectedIds(ids);        
            }}
                />
        </div>
        <div id="wrapper">
        <Button style={{marginRight: 20}} variant = "contained" color = "primary" onClick = {()=>deleteComplaint()}> Delete</Button>


        {dummyList.length < 3 ? <Button style={{marginRight: 20}} variant = "contained" color = "secondary" onClick = {()=>press()}> Add Complaint </Button> : <Button style={{marginRight: 20}} variant = "contained" disabled> Add Complaint </Button> } 

        <br></br>
        
            {dummyList.length > 0 ? <Button variant = "contained" color = "success" onClick = {()=>beginCollection()}> Begin Collection </Button> : <Button variant = "contained" disabled> Begin Collection </Button>  }
        </div>   
       
            {isPressed && 
            <div id = "mapImage"  style = {{display:'flex', height: '90vh',flexDirection:'row', justifyContent:'center',backgroundColor :'White'}}>
            <div style={{display:'flex', alignItems:'center'}}>
                    <Redirect to={{
                    pathname: "/imagemap",
                    state: {
                            patientOhip:cP,     
                            complaintList: dummyList,     
                            fillcolor: '#00ff194c'    
                    }
                    }}/>
            </div> 
            </div> }

         {isBeingCollected  && <Redirect to={{
                    pathname: "/begincollection",
                    state: {
                        patientOhip:cP,      
                    }
                    }}/>

            } 

          {/*   {loading && (
                <Redirect to={{
                    pathname: "/loading",
                    state: {
                        patientOhip:cP, 
                        visit: complaintList.slice(-1)[0].VisitID   
                    }
                    } }/>  
                    
            )} */} 

        </> 
        
    )
}

export default Complaint;