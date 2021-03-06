import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home"
import Navbar from './components/Navbar';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';



class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Router>
      <Navbar /> 
     <Switch>
       <Route path='/' exact component={Home}/>
     </Switch>
   </Router> 
    );
  }
}

export default App;