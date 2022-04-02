import * as React from 'react';
import Button from '@mui/material/Button';
import { IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link,useLocation } from 'react-router-dom';
import PatientProfile from '../../pages/patient/patient_profile';
import EmptyProfile from '../../pages/patient/empty_profile';
import HandleComplaints from '../../components/handleComplaints';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Card from 'react-card-component';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../components/FormDialog';
import ImageMap from './imageMap'
import AddComplaint from './AddComplaint';

function Complaint() {
    const location = useLocation()
    const cP = location.state.pO
    const {complaintList,getPatientComplaint, patientComplaint,setPatientComplaint, deleteItem} = HandleComplaints();
    const [isPressed,setIsPressed] = useState(false)
    const currentPatientComplaint =  complaintList.filter(complaint => complaint.OHIP === cP)
    const [selectedIDs, setSelectedIds] = useState(new Set())
    const [changeMade, setChangeMade] = useState(false)
    
    useEffect(() => {
        getPatientComplaint(cP);
      }, [])

    useEffect(() => {
        if(changeMade) {
            getPatientComplaint(cP);
            setChangeMade(false)
        }
      }, [changeMade])

    function press() {
        console.log(selectedIDs);
        setIsPressed(true)
        setPatientComplaint ({
            OHIP: cP,           
        })
        document.getElementById('mapImage').scrollIntoView()
    }

    function deleteComplaint() {
       selectedIDs.map(idToDelete => complaintList.map(complaints => complaints.ComplaintID === idToDelete && deleteItem(idToDelete)))
       selectedIDs.map(idToDelete => complaintList.filter(complaints => complaints.ComplaintID != idToDelete))
       getPatientComplaint();
       setChangeMade(true)
    }

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
       <div id = 'complaintTable' style={{ height: 830, width: '100%' }}>

        <DataGrid
            getRowId={row => row.ComplaintID}
            rows={currentPatientComplaint}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            checkboxSelection
            fullWidth = {true}
            onSelectionModelChange={(ids) => {
                setSelectedIds(ids);        
            }}
        />
        </div>
        <Button style={{marginRight: 20}} variant = "contained" color = "primary" onClick = {()=>deleteComplaint()}> Delete</Button>


        <Button variant = "contained" color = "secondary" onClick = {()=>press()}> Add Complaint </Button>
   
                
        <div id = "mapImage"  style = {{display:'flex', height: '90vh',flexDirection:'row', justifyContent:'center',backgroundColor :'White'}}>
            {isPressed && 
            <div style={{display:'flex', alignItems:'center'}}>
            <ImageMap patientComplaint = {patientComplaint} setChangeMade = {setChangeMade} /> 
            </div> }
            </div> 
        </> 
        
    )
}

export default Complaint;