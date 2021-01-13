import Axios, { AxiosError } from 'axios';
import React from 'react';
import axios from 'axios';
import '../layout/App.css';
import { useState } from 'react';
import { Accordion, Button, Form, Icon } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const AddDog = () => {
    const [dogName, setDogName] = useState();
    const [dogCode, setDogCode] = useState(-1);
    const [userName, setUserName] = useState();
    const [success, setSuccess] = useState(false);

    const onSubmitClick = () => {
        if (dogCode < 0 || dogCode != parseInt(String(dogCode), 10)) {
            alert("Invalid dog code");
            return;
        } else {
            sendRegisterReq();
        }
    }

    const sendRegisterReq = () => {
        let req = `http://localhost:5000/api/dog`;
        let reqBody = {
            "username" : userName,
            "name" : dogName,
            "code" : dogCode
        }

        axios.post(req, reqBody).then((response) => {
            setSuccess(true);
        }).catch((reason : AxiosError) => {
            setSuccess(false);
            alert(reason.message);
        });
    }

    return (
        <div>
        <div className='registerOwner'>
            <Form>
                <Form.Field>
                    <label>Dog name</label>
                    <input placeholder='Username' value={dogName} onChange={(event: any) => {
                        setDogName(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Email' value={userName} onChange={(event: any) => {
                        setUserName(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                        <label>Dog code</label>
                        <input type='number' value={dogCode} onChange={(event: any) => {
                            setDogCode(event.target.value);
                        }} />
                    </Form.Field>
                <Button onClick={onSubmitClick} type='LogIn'>Submit</Button>
            </Form>
            {success? <p>Successfully registered </p> : undefined}
        </div>
    </div>
    )
}

export { AddDog };