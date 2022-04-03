import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'; 
import { Button, Button1 } from './Button';
import'./Navbar.css';
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>

function Navbar() {
    const [click, setClick] = useState(false); //creates to function at same time ? 
    const [button, setButton] = useState(true);



    const handleClick = () => setClick(!click); // function sets the click reverse the useState
    //  changes state from whatever it was to whatever you want to change it to. 
    const closeMobileMenu = () =>setClick(false);

    const showButton = () => { if(window.innerWidth <= 960) {
                                    setButton(false);
                                }
                                else { 
                                    setButton(true); 
                                }
                            }; 
    useEffect(()=> {
        showButton()
    },[]);
    window.addEventListener('resize', showButton);
    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                    <Link to="/" className ="navbar-logo" onClick = {closeMobileMenu}>

                    <i className="fas fa-clinic-medical"> </i>  TriAuto

                    </Link>
                    <div className="menu-icon" onClick = {handleClick}>
                        <i className={click ? 'fas fa-times' :'fas fa-bars'} /> 

                    </div>
                    <ul className ={click ? 'nav-menu active' : 'nav-menu'}>  
                                {/* allows nav menu to disappear  */}
                        <li  className="nav-item">
                            <Link to ='/' className ='nav-links' onClick={closeMobileMenu}>  Home  </Link>
                        </li>
                        <li  className="nav-item">
                            <Link to ='/aboutme' className ='nav-links' onClick={closeMobileMenu}> About  </Link>
                        </li>
                        <li  className="nav-item">
                            <Link to ='/resume' className ='nav-links' onClick={closeMobileMenu}>   Services   </Link>
                        </li>
                        <li  className="nav-item">
                            <Link to ='/achievements' className ='nav-links' onClick={closeMobileMenu}>  Contact  </Link>
                        </li>   
              
                    
                    </ul>
                    {button && <Link to ='/ohip'> <Button1 buttonStyle ='btn--outline'> Patient OHIP</Button1> </Link> }  
                    {button && <Link to ='/nurse'> <Button1 buttonStyle ='btn--outline'> Nurse Sign In </Button1> </Link>}  
                    {/* && returns what is after, children of button 
                    from before choooses the buttonstyle from whatever we input it in Button,jsx*/}
             </div>
        </nav>
        
        </>
    );
}

export default Navbar;
