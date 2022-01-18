import React from 'react'
import {CSVLink} from "react-csv";


const CSVReport = ({inventoryItems}) => {
    const headers = [
        {label: 'Item', key: 'item'},
        {label: 'Price', key: 'price'},
     
    ];
    const csvReport = {
        filename: 'InventoryList.csv',
        headers: headers,
        data: inventoryItems
    };
    return (

        <button><CSVLink {...csvReport}> Export to CSV </CSVLink> </button>


    )
}

export default CSVReport;
