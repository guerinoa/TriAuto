import React, { Component } from 'react';
import './App.css';
import Home from "./pages/Home/Home"
import Patient from "./pages/patient/Patient"
import Nurse from "./pages/Nurse/Nurse"
import Complaint from "./pages/Complaint/Complaint"
import Role from "./pages/Role/Role";
import Wait from "./pages/Wait/Wait";
import Ohip from "./pages/OHIP/Ohip";
import PatientSection from "./pages/OHIP/PatientSection";
import EmptySection from "./pages/OHIP/EmptySection";
import Navbar from './components/Navbar';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ImageMap from './pages/Complaint/imageMap';
import BeginCollection from "./pages/VitalSignCollection/BeginCollection";
import CurrentPatient from "./pages/patient/CurrentPatient"
import Login from "./pages/Nurse/Login";
import Landing from "./pages/Nurse/Landing";
import Details from "./pages/Nurse/Details";

class App extends Component {

  render() {
    return (
      <Router>
      <Navbar /> 
     <Switch>
        <Route path='/' exact component={Home} />
       <Route path='/landingpage' exact component={LandingPage}/>
       <Route path='/role' component={Role} />
       <Route path='/patient' component={Patient} />
       <Route path='/ohip' component={Ohip} />
       <Route path='/patientsection' component={PatientSection} />
       <Route path='/emptysection' component={EmptySection} />
       <Route path='/nurse' component={Nurse} />
       <Route path='/wait' component={Wait} />
       <Route path='/complaint' component={Complaint} />
       <Route path='/imagemap' component={ImageMap} />
       <Route path='/begincollection' component={BeginCollection} />
      <Route path='/currentpatient' component={CurrentPatient} /> 

        
       <Route path='/nurselogin' component={Login}/>
       <Route path='/nurselanding' component={Landing}/>
       <Route path='/details' component={Details}/>

     </Switch>
   </Router> 
    );
  }
}

export default App;