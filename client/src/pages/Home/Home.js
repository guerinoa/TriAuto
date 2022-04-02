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
                <p>The Ultimate Triage Experience</p>
            
            <div className = "hero-btns">
            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/role",
                state: {lang: "english"}
                 }}>
                <Button className='btns' buttonStyle='btn--outline' buttonSize ='btn--large' > English</Button>
            </Link> 
            <Link style={{ textDecoration: 'none', marginLeft:'10px' }} to={{
                pathname: "/role",
                state: {lang: "french"}
                 }}>
                <Button className='btns' buttonStyle='btn--primary' buttonSize ='btn--large' > French</Button>
            </Link>

            </div>

            </div>
        </div>
    )
}

export default Home;
