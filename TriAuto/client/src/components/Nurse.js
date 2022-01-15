import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DataGrid } from '@mui/x-data-grid';

let socket;
const CONNECTION_PORT = 'localhost:4000'
socket = io(CONNECTION_PORT)

function NurseValidate() {

    const [patients, setPatients] = useState([]);

    const columns = [
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'risk',
            headerName: 'Risk',
            type: 'number',
            width: 90,
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
        // <div className="container">
        //     <h3 className="p-3 text-center">Patients</h3>
        //     <table className="table table-striped table-bordered">
        //         <thead>
        //             <tr>
        //                 <th>First Name</th>
        //                 <th>Last Name</th>
        //                 <th>Risk</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {patients && patients.map(patient =>
        //                 <tr >
        //                     <td>{patient.firstName}</td>
        //                     <td>{patient.lastName}</td>
        //                     <td>{patient.risk}</td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        // </div>
    );
}

export default NurseValidate;