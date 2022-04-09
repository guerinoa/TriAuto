import {useState} from 'react'; 
import Axios from 'axios';


// all functions defined for handling state variables are organized/defined here. 

function HandleStates() {
    const [patientList, setPatientList] = useState([]); 
    const [patientUser, setPatientUser] = useState ([])
    //object array for added inputs and updated inputs respectively. 
    const [patientProfile,setPatientProfile] = useState(
      {
          OHIP:0,
          FirstName: '',
          LastName: '',
          PatientSex: '',
          patientDOB: '',
          PatientPhoneNumber: 0,
          PatientAddress: '',
          PatientEmail: '',
          PatientHeight: 0,
          PatientWeight: 0,
          PatientAllergies: '',
          PatientMedication: '',
          PatientExistingConditions: ''

      }
    );
    const [newPatient,setNewPatientProfile] = useState(
        {
          OHIP:0,
          FirstName: '',
          LastName: '',
          PatientSex: '',
          patientDOB: '',
          PatientPhoneNumber: 0,
          PatientAddress: '',
          PatientEmail: '',
          PatientHeight: 0,
          PatientWeight: 0,
          PatientAllergies: '',
          PatientMedication: '',
          PatientExistingConditions: ''
  
        }
    );

    //Handlechange events for added and updated inputs respectively. 
    const patientProfileChange = (event) => {    
          setPatientProfile({
              ...patientProfile,
              [event.target.name]:event.target.value
          })
          console.log(patientProfile)
    }
    const NewPatientProfileChange = (event) => {
      setNewPatientProfile({
          ...newPatient,
          [event.target.name]:event.target.value
      })
   
      
    }
    const patientListChange = (event) => {
            setPatientList([...patientList,
                patientProfile
    ]); 
    }
    // Functions below connect frontend with backend. 

    
    const addItem = (patientOhip) => {
      Axios.post('http://localhost:8080/patientList/create',{
        patientProfile: patientProfile
        }).then(()=>
        {
          getPatientProfile(patientOhip)
          /*
          setPatientList([...patientList,
                        patientProfile
          ]); 
          setPatientUser(patientList.filter(patient  => patient.OHIP === patientOhip))*/
        } 
        );
    };

    const getPatientProfile = (ohip) => {
      console.log("get complaint")
      console.log(ohip)
        Axios.get(`http://localhost:8080/patientList/${ohip}`).then((response)=> {
           /* setPatientList(response.data); */ 
            setPatientUser(response.data)
            console.log(response.data)
    /*console.log(response.data.OHIP)   */     });
    }

 /*
    
    const deleteItem = (id)=> {
      Axios.delete(`http://localhost:3001/inventorylist/delete/${id}`).then((response)=> {
        setItemList(itemList.filter(val=>val.id!=id).map(newVal => ({id:newVal.id, item: newVal.item, price: newVal.price, quantity:newVal.quantity})))
              });
    }
*/
    const updateItem =(ohipNum)=> {
      Axios.put('http://localhost:8080/patientList/update',{
          patientProfile: patientProfile,
          ohipNum: ohipNum
            }).then((response)=> {
                getPatientProfile(ohipNum)
                /*
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
                setPatientUser(patientList.filter(patient  => patient.OHIP === ohipNum)) */ 
                  }
               ); 
               
      }
 
      
    return {patientList, setPatientList, patientProfile, patientUser, setPatientProfile,getPatientProfile,patientProfileChange, addItem,updateItem}
}

export default HandleStates
