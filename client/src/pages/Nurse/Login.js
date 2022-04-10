import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

function Login() {

  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [correct, setCorrect] = useState(false);
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log( 'User:', username, 'Password: ', password); 
    // If correct
    if (username==="admin" && password==="admin"){
        console.log("correct credentials");
        setCorrect(true);
    }
}   
  
    return (
      <div>
        <center>
        {correct && (
          <Redirect to={{
            pathname: "/nurselanding",
            }}/>
        )}
        <form onSubmit={handleSubmit}>
        <h1>Nurse Login</h1><br/><br/>
        <TextField id="filled-basic" label="username" variant="filled" value={username} onInput={ e=>setUser(e.target.value)}/><br/><br/>
        <TextField id="filled-basic" type="password" label="password" variant="filled" value={password} onInput={ e=>setPassword(e.target.value)}/><br/><br/>
        <Button type="submit">Login</Button>
        </form>
        </center>
      </div>
  
    );
}

export default Login;