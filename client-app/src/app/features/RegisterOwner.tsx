import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import '../layout/App.css';
import axios, { AxiosError } from 'axios';
import { Button, Form } from 'semantic-ui-react';

const RegisterOwner = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [lastName, setLastName] = useState();
    const [country, setCountry] = useState();
    const [town, setTown] = useState();
    const [street, setStreet] = useState();
    const [number_, setNumber_] = useState(-1);
    const [success, setSuccess] = useState(false);

    const [cookies] = useCookies(["user"]);

    const sendRegisterReq = () => {
        let req = `http://localhost:5000/api/owner`;
        let reqBody = {
            "firstName" : firstName,
            "lastName" : lastName,
            "username" : username,
            "email" : email,
            "password" : password,
            "ownerMedicId" : cookies.user.id,
            "country" : country,
            "town" : town,
            "street" : street,
            "number" : number_
        }

        axios.post(req, reqBody).then((response) => {
            setSuccess(true);
        }).catch((reason : AxiosError) => {
            setSuccess(false);
            alert("Couldn't register user");
        });
    }

    const onSubmitClick = () => {
        if (number_ < 0 || number_ != parseInt(String(number_), 10)) {
            alert("Invalid street number");
            return;
        } else {
            sendRegisterReq();
        }
        
    }

    return (
        <div>
            <div className='registerOwner'>
                <Form>
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
                        <label>Country</label>
                        <input placeholder='Country' value={country} onChange={(event: any) => {
                            setCountry(event.target.value);
                        }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Town</label>
                        <input placeholder='Town' value={town} onChange={(event: any) => {
                            setTown(event.target.value);
                        }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Street</label>
                        <input placeholder='Street' value={street} onChange={(event: any) => {
                            setStreet(event.target.value);
                        }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Number</label>
                        <input type='number' value={number_} onChange={(event: any) => {
                            setNumber_(event.target.value);
                        }} />
                    </Form.Field>
                    <Button onClick={onSubmitClick} type='LogIn'>Submit</Button>
                </Form>
                {success? <p>Successfully registered </p> : undefined}
            </div>
        </div>
    )

}

export { RegisterOwner };