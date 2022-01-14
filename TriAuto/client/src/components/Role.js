import React, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom';
import './Role.css';
import Button from '@mui/material/Button';

function Role() {
    const location = useLocation();
    // Page defaults to english
    const [language, setLanguage] = useState("french")

    useEffect(() => {
        if (location.state) {
            setLanguage(location.state.lang);
        }
    });

    return (
        <div id="rolePage">
            {language == "english" && 
            <div>
                <h1>
                    Are you a ...
                </h1> 
                <Link style={{ textDecoration: 'none'}} to={{
                    pathname: "/patient",
                }}>
                    <Button id="button" value="patient" variant="outlined">
                        Patient
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={{
                    pathname: "/nurse",
                }}>
                    <Button id="button" value="nurse" variant="outlined">
                        Nurse
                    </Button>
                </Link>
            </div>
            }
            {language == "french" && 
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
                    pathname: "/nurse",
                }}>
                    <Button id="button" value="nurse" variant="outlined">
                        Infirmier
                    </Button>
                </Link>
            </div>
            }
        </div>

        
    )
}

export default Role;