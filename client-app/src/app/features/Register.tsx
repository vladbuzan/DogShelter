import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form } from 'semantic-ui-react';
import '../layout/App.css';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [cabinetCode, setCabinetCdoe] = useState(0);
  const [registerSucc, setRegisterSucc] = useState(true);

  const sendRegisterReq = () => {
    let req = `http://localhost:5000/api/medic`;
    let reqBody = {
      "username" : username,
      "password" : password,
      "email" : email,
      "firstName" : firstName,
      "lastName" : lastName,
      "code" :  cabinetCode
    };

    axios.post(req, reqBody).then((response) => {
      if(response.data === 1) {
        setRegisterSucc(true);
        return;
      }
      if(response.data === -1) {
        alert("Invalid cabinet code");
        return;
      }
      if(response.data === -2) {
        alert("Couldn't save account into the database");
        return;
      }
      return;
    })
  }

  const onSubmitClick = () => {
    if(username === undefined || username ===""){
      alert("Please fill in your username");
      return;
    }
    if(email === undefined || email === "") {
      alert("Please fill in your email address");
      return;
    }
    if(password === undefined || password === "") {
      alert("Please fill in your password");
      return;
    }
    if(firstName === undefined || firstName === "") {
      alert("Please fill in your first name");
      return;
    }
    if(lastName === undefined || lastName === "") {
      alert("Please fill in your last name");
      return;
    }
    if(cabinetCode < 0 || cabinetCode != parseInt(String(cabinetCode), 10)) {
      alert("Invalid cabinet code");
      return;
    }
    sendRegisterReq();
  }



  return (
    <div className='landingPage'>
      {registerSucc? <p>Registered successfully! </p> : <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' value={username} onChange={(event: any) => {
            setUsername(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' value={email} onChange={(event: any) => {
            setEmail(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' value={password} onChange={(event: any) => {
            setPassword(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>First name</label>
          <input placeholder='First name' value={firstName} onChange={(event: any) => {
            setFirstName(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Last name</label>
          <input placeholder='Last name' value={lastName} onChange={(event: any) => {
            setLastName(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Cabinet code</label>
          <input type='number' value={cabinetCode} onChange={(event: any) => {
            setCabinetCdoe(event.target.value);
          }} />
        </Form.Field>
        <Button onClick={onSubmitClick} type='LogIn'>Submit</Button>
      </Form>}
    </div>
  )
}

export { Register };
