import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import './landing.css';

function Landing() {

    const [patients, setPatients] = useState([]);
    const [details, setDetails] = useState('')

    const toDetails=(ohip)=>{
        setDetails(ohip);
  }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://triautomanager.herokuapp.com/nurseList/visitation')
            .then(response => {
                var people = [];
                var open = [1, 2, 3, 4, 5];
                let count = 0;


                for (var i = 0; i < 5; i ++) {
                    if (response.data[i]){
                        response.data[i]["status"] = "Ready";
                        people.push(response.data[i]);
                        var index = open.indexOf(response.data[i].triagestation);
                        if (index > -1) {
                            open.splice(index, 1);
                          }
                    } else {
                        people.push({'triagestation': open[count++], 'status': "Open"});
                    }
                }

                setPatients(people);
            })
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    // colums
    const columns = [
        { field: 'triagestation', flex: 1, headerName: 'Triage Station'},
        { field: 'firstname', flex: 1, headerName: 'First Name'},
        { field: 'lastname', flex: 1, headerName: 'Last Name'},
        { field: 'ohip', flex: 1.8, headerName: 'OHIP'},
        { field: 'vid', flex: 1, headerName: 'Visitid'},
        { field: 'status', flex: 1, headerName: 'Status'},
        {
            field: 'Details',
            headerName: 'Details',
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                if (params.row.status == 'Ready'){
                    return (
                        <div> <a className="fcc-btn" onClick={()=>{toDetails(params.row.ohip)}}>Details</a></div>
                    )
                    //return <p>{params.row.ohip}</p>;
                }
            },
        },
    ]
  
    return (
        <div style={{ height: '100vh' , width: '100%' }}>
        {details != '' && (
          <Redirect to={{
            pathname: "/details",
            state: {
                    ohip:details               
            }
            }}/>
        )}
        {<DataGrid 
            getRowId={row => row.triagestation}
            rows={patients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />} 
        </div>
    );
}

export default Landing;