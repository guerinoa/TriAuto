import {useState} from 'react'; 
import Axios from 'axios';


// all functions defined for handling state variables are organized/defined here. 

function HandleComplaints() {
    const [complaintList, setComplaintList] = useState([]); 
    const [patientComplaint,setPatientComplaint] = useState(
      {
          ComplaintID: 0,
          OHIP: '',
          VisitID: 0,
          PatientComplaint: '',
          PatientCtasLevel: 0,
          ComplaintEvent: '',
          PatientPainLevel: 0,
          PatientSymptomList: '',
          PatientComments: '',
      }
    );

    //For events 
    const patientComplaintChange = (event) => {    
          console.log(event.target.name)
          console.log(event.target.value)
          setPatientComplaint({
              ...patientComplaint,
              [event.target.name]:event.target.value
          })
    }

    //for specific values
    const specificComplaintChange= (name,value) => {
          setPatientComplaint({
            ...patientComplaint,
            [name]:value
          })
    }
    //forlists of values
    const listComplaintChange= (list1,list2) => {
      setPatientComplaint({
        ...patientComplaint,
        [list1[0]]:list2[0],
        [list1[1]]:list2[1],
        [list1[2]]:list2[2]
      })
}



    const complaintListChange = () => {
            setComplaintList([...complaintList,
                patientComplaint
    ]); 
    }

    const addItem = () => {
      Axios.post('http://localhost:8080/complaintList/create',{
        patientComplaint: patientComplaint
        });
    };

    const getPatientComplaint = (ohip) => {
        Axios.get(`http://localhost:8080/complaintList/${ohip}`).then((response)=> {

            setComplaintList(response.data); 
            console.log(complaintList)
        });
    }

    const deleteItem = (ohipNum,id)=> {
      Axios.delete(`http://localhost:8080/complaintList/delete/${id}`).then((response)=> {
        /*setComplaintList(complaintList.filter(complaint=>complaint.ComplaintId!=id))*/
        getPatientComplaint(ohipNum)
              });
    }
 
      
    return {complaintList,getPatientComplaint,patientComplaint,patientComplaintChange,specificComplaintChange,listComplaintChange,setPatientComplaint,addItem,complaintListChange,deleteItem}
}

export default HandleComplaints
