import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import '../layout/App.css';
import axios from 'axios';

import { Button, Form} from 'semantic-ui-react';


const EditCredentials = (props: any) => {

    const [userName, setUserName] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [mail, setNewMail] = useState();
  
    const [country, setCountry] = useState();
    const [town, setTown] = useState();
    const [street, setStreet] = useState();
    const [addressNumber, setAddressNumber] = useState();
  
    const [cookies] = useCookies(["user"]);
  
    const updateUserName = (event: any) => {
      setUserName(event.target.value);
    }
  
    const updateOldPassword = (event: any) => {
      setOldPassword(event.target.value);
    }
  
    const updateNewPassword = (event: any) => {
      setNewPassword(event.target.value);
    }
  
    const updateMail = (event: any) => {
      setNewMail(event.target.value);
    }
  
    const updateCountry = (event: any) => {
      setCountry(event.target.value);
    }
  
    const updateTown = (event: any) => {
      setTown(event.target.value);
    }
  
    const updateStreet = (event: any) => {
      setStreet(event.target.value);
    }
  
    const updateNumber = (event: any) => {
      setAddressNumber(event.target.value);
    }
  
    const onSubmitCredentialsClick = () => {
      let reqBody: any = {};
      let req = `http://localhost:5000/api/owner/`;
      console.log(userName);
      if (oldPassword !== cookies.user.password) {
        alert("Passwords not matching");
        return;
      }
      reqBody.id = cookies.user.id;
      reqBody.newPassword = newPassword;
      reqBody.newUsername = userName;
      reqBody.newMail = mail;
      axios.put(req, reqBody);
    }
  
    const onSubmitContactClick = async () => {
      let reqBody: any = {};
      let req = `http://localhost:5000/api/owner/`;
      if (typeof addressNumber !== "number") {
        alert("Invalid input");
        return;
      }
      reqBody.newCountry = country;
      reqBody.newTown = town;
      reqBody.newStreet = street;
      reqBody.newNumber = addressNumber;
      reqBody.id = cookies.user.id;
      axios.put(req, reqBody);
    }
  
    return (
      <div>
        <div className='credentials'>
          <Form>
            <Form.Field>
              <label>New username</label>
              <input placeholder='new username' value={userName} onChange={updateUserName} />
            </Form.Field>
            <Form.Field>
              <label>New Email</label>
              <input placeholder='new email' value={mail} onChange={updateMail} />
            </Form.Field>
            <Form.Field>
              <label>Old Password</label>
              <input type='password' value={oldPassword} onChange={updateOldPassword} />
            </Form.Field>
            <Form.Field>
              <label>New Password</label>
              <input type='password' value={newPassword} onChange={updateNewPassword} />
            </Form.Field>
            <Button type='submit' onClick={onSubmitCredentialsClick}>Update</Button>
          </Form>
        </div>
        <div className='credentials'>
          <Form>
            <Form.Field>
              <label>Country</label>
              <input placeholder='new country' value={country} onChange={updateCountry} />
            </Form.Field>
            <Form.Field>
              <label>Town</label>
              <input placeholder='new town' value={town} onChange={updateTown} />
            </Form.Field>
            <Form.Field>
              <label>Street</label>
              <input placeholder='new street' value={street} onChange={updateStreet} />
            </Form.Field>
            <Form.Field>
              <label>Number</label>
              <input type='number' step="1" value={addressNumber} onChange={updateNumber} />
            </Form.Field>
            <Button type='submit' onClick={onSubmitContactClick}>Update</Button>
          </Form>
        </div>
      </div>
    )
  }

 export {EditCredentials}