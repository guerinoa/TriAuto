import React, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom';
import './Role.css';
import Button from '@mui/material/Button';
import CardItem from './CardItem'
import './carditem.css';
import patientImg from './patient.jpg'
import nurseImg from './Nurse.jpg'

function Role() {
    const location = useLocation();
    // Page defaults to english
    const [language, setLanguage] = useState("english")

    useEffect(() => {
        if (location.state) {
            setLanguage(location.state.lang);
        }
    });

    return (
        <>
            {language === "english" && 
            <div className = 'cards'>
                    <div className = "patient">  <CardItem src = {patientImg} text = "Patient"  path='/ohip'/> </div>
                    <div className = "nurse"> <CardItem src ={nurseImg} text = "Nurse"  path='/nurselogin'/>  </div> 
                    
            </div>
            }
            {language === "french" && 
            <div>
                <h1>
                    Es-tu un ...
                </h1> 
                <Link style={{ textDecoration: 'none'}} to={{
                    pathname: "/patient",
                }}>
                    <Button id="button" value="patient" variant="outlined">
                        Patient
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={{
                    pathname: "/nurselogin",
                }}>
                    <Button id="button" value="nurse" variant="outlined">
                        Infirmier
                    </Button>
                </Link>
            </div>
            }
        </>

        
    )
}

export default Role;