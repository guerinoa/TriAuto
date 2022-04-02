import React from 'react';
import './Home.css';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div>
            <div className="home">
                <video src = "/videos/hospital2.mp4" autoPlay loop muted /> 
                <h1> WELCOME TO TRIAUTO</h1>
                <p>The ultimate Triage experience</p>
            
            <div className = "hero-btns">
            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/landingpage",
                 }}>
                <Button className='btns' buttonStyle='btn--outline' buttonSize ='btn--large' > Get Started</Button>
            </Link> 
                
            </div>

            </div>
        </div>
    )
}

export default Home;
