import React from 'react'
import {CSVLink} from "react-csv";


const CSVReport = ({itemList}) => {
    const headers = [
        {label: 'firstname', key: 'firstname'},
        {label: 'lastname', key: 'lastname'},
        {label:  'age', key: 'age'},
        {label:  'risklevel', key: 'risklevel'},
    ];
    const csvReport = {
        filename: 'InventoryList.csv',
        headers: headers,
        data: itemList
    };
    return (

        <button><CSVLink {...csvReport}> Export to CSV </CSVLink> </button>


    )
}

export default CSVReport;
