import React, { Component } from 'react';
import './App.css';
import Home from "./pages/Home/Home"
import Patient from "./pages/patient/Patient"
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
import Login from "./pages/Nurse/Login";
import Landing from "./pages/Nurse/Landing";
import Details from "./pages/Nurse/Details";
import Loading from "./pages/Loading/Loading";
import Collection from "./pages/Collection/Collection";


class App extends Component {
// state = {
//     data: null
//   };

//   componentDidMount() {
//     this.callBackendAPI()
//       .then(res => this.setState({ data: res.express }))
//       .catch(err => console.log(err));
//   }
//     // fetching the GET route from the Express server which matches the GET route from server.js
//   callBackendAPI = async () => {
//     const response = await fetch('/express_backend');
//     const body = await response.json();

//     if (response.status !== 200) {
//       throw Error(body.message) 
//     }
//     return body;
//   };

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
       <Route path='/wait' component={Wait} />
       <Route path='/complaint' component={Complaint} />
       <Route path='/imagemap' component={ImageMap} />

       <Route path='/nurselogin' component={Login}/>
       <Route path='/nurselanding' component={Landing}/>
       <Route path='/details' component={Details}/>

       <Route path='/loading' component={Loading}/>

       <Route path='/collection' component={Collection}/>

     </Switch>
   </Router> 
    );
  }
}

export default App;