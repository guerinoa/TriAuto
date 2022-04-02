import React from 'react';
import './Home.css';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div>
            <div className="home">
              { /* <video controls preload="none" src = "/videos/hospital3.mp4" poster="/videos/Hospital.PNG" autoPlay loop muted /> */}
                <h1>TRIAUTO</h1>
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
