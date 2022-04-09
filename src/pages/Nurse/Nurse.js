import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import FormDialog from '../../components/FormDialog';
import Form from '../../components/Form';

let socket;
const CONNECTION_PORT = 'localhost:4000'
socket = io(CONNECTION_PORT)

function NurseValidate() {

    const [patients, setPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState({firstName: "jane"});


    const columns = [
        { field: 'firstName', headerName: 'First name',},
        { field: 'lastName', headerName: 'Last name', },
        {
            field: 'risk',
            headerName: 'Risk',
            type: 'number',
            width: 60,
        },
        {
            field: 'Details',
            headerName: 'Details',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return <FormDialog> 
                    Info
                    </FormDialog>;
              },
        },
    ]   

    useEffect(() => {
        socket = io(CONNECTION_PORT)

        //Check it connects
        socket.on('connect', () => {
            console.log(socket.id)
        })

        // Add nurse connection to a room
        socket.emit('joinRoom', 'nurseRoom');

        socket.on('queue', arg => {
            setPatients((oldPatients) => [...oldPatients, arg]);
        })
    }, [CONNECTION_PORT])

  
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={patients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
        </div>
    );
}

export default NurseValidate;