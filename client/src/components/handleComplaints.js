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

    //Handlechange events for added and updated inputs respectively. 
    const patientComplaintChange = (event) => {    
          setPatientComplaint({
              ...patientComplaint,
              [event.target.name]:event.target.value
          })
    }
    
    const complaintListChange = () => {
            setComplaintList([...complaintList,
                patientComplaint
    ]); 
    }

    const addItem = () => {
      Axios.post('http://localhost:4000/complaintList/create',{
        patientComplaint: patientComplaint
        }).then(()=>
        {
          setComplaintList([...complaintList,
                        patientComplaint
          ]); 
        } 
        );
    };

    const getPatientComplaint = (ohip) => {
        Axios.get(`http://localhost:4000/complaintList/${ohip}`).then((response)=> {

            setComplaintList(response.data); 
            console.log(complaintList)
        });
    }

    const deleteItem = (id)=> {
      Axios.delete(`http://localhost:4000/complaintList/delete/${id}`).then((response)=> {
        setComplaintList(complaintList.filter(complaint=>complaint.ComplaintId!=id))
              });
    }
/*
    const updateItem =(ohipNum)=> {
      Axios.put('http://localhost:4000/patientList/update',{
          patientProfile: patientProfile,
          ohipNum: ohipNum
            }).then((response)=> {
                setPatientList(patientList.map((val)=>{
                      return val.OHIP === ohipNum? {
                         OHIP: patientProfile.OHIP, 
                         FirstName: patientProfile.FirstName,
                         LastName: patientProfile.LastName, 
                         PatientSex: patientProfile.PatientSex,
                         patientDOB: patientProfile.PatientDOB,
                         PatientPhoneNumber: patientProfile.PatientPhoneNumber,
                         PatientAddress: patientProfile.PatientAddress,
                         PatientEmail: patientProfile.PatientEmail,
                         PatientHeight: patientProfile.PatientHeight,
                         PatientWeight: patientProfile.PatientWeight,
                         PatientAllergies: patientProfile.PatientAllergies,
                         PatientMedication: patientProfile.PatientMedication,
                         PatientExistingConditions: patientProfile.PatientExistingConditions
                        } : val      
                      }))
                  }
               );
      }
      */
 
      
    return {complaintList,getPatientComplaint,patientComplaint,patientComplaintChange,setPatientComplaint,addItem,complaintListChange,deleteItem}
}

export default HandleComplaints
