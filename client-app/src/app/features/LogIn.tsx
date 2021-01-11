import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Radio } from 'semantic-ui-react';
import '../layout/App.css';

const LogIn = (props: any) => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState('admin');
    const [, setCookie] = useCookies(["user"]);
    let history = useHistory();
    const updateUsername = (event: any) => {
        setUserName(event.target.value);
    }

    const updatePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const updateUserType = (event: any, value: any) => {
        setUserType(value.value);
    }

    const redirect = () => {
        if (userType === "medic") {
            history.push("/MedicPage/");
        } else if (userType === "admin") {
            history.push("/AdminPage/")
        } else if (userType === "owner") {
            history.push("/OwnerPage/");
        } else {
            alert("Error: Invalid user type");
        }
    }

    const onSubmitClick = () => {
        let req: string = `http://localhost:5000/api/${userType}/${userName}/${password}`;
        console.log(req);
        axios.get(req).then((response) => {
            let resp = response.data;
            console.log(resp);
            if (resp !== -1) {
                setCookie("user", { "id": resp, "usertype": "userType", "password": password }, { "path": "/" });
                redirect();
            } else {
                alert("Invalid username or password");
            }


            //setCookie("user", { "id": 1, "usertype": "admin" }, { "path": "/" });
        })
    }

    return (
        <div className='landingPage'>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' value={userName} onChange={updateUsername} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='Last Name' value={password} onChange={updatePassword} />
                </Form.Field>
                <label>User type</label>
                <Form.Field
                    control={Radio}
                    label='Admin'
                    value='admin'
                    checked={userType === 'admin'}
                    onChange={updateUserType}
                />
                <Form.Field
                    control={Radio}
                    label='Medic'
                    value='medic'
                    checked={userType === 'medic'}
                    onChange={updateUserType}
                />
                <Form.Field
                    control={Radio}
                    label='Dog Owner'
                    value='owner'
                    checked={userType === 'owner'}
                    onChange={updateUserType}
                />
                <Button onClick={onSubmitClick} type='LogIn'>Submit</Button>
            </Form>
        </div>
    )
}

export { LogIn };
