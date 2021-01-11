import React, {Component, useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import { Form, Checkbox, Button, Radio } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';
import { Redirect , useHistory} from 'react-router-dom';


const App = (props: any) => {
  
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [shouldShowRegister, setShouldShowRegister] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  
  const onSignInClicked = () => {
    setShouldShowLogin(true);
    console.log("this was called");    
  }

  const onRegisterClicked = () => {
    setShouldShowRegister(true);
  }

  const onBackClicked = () => {
    setShouldShowLogin(false);
    setShouldShowRegister(false);
  }

  return (

    <div className='landingPage'>
      <div className='main'>
        <h1>
          Online Dog Shelter
        </h1>
        {shouldShowLogin ? <LogIn userType="admin" /> : undefined}
        {shouldShowRegister ? <Register/> : undefined}
        {shouldShowLogin ? <br /> : undefined}
        {shouldShowLogin ? <Button secondary onClick=
          {onBackClicked} >Back</Button> : undefined}
        {shouldShowLogin ? undefined : <Button content='Sign in' primary onClick={onSignInClicked} />}
        {shouldShowRegister ? undefined : <Button content='Register' secondary onClick={onRegisterClicked} />}
      </div>
    </div>
  ); 
} 
/*
class App extends Component {
  
  state = {
    values: []
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/values').then((response) => {
      console.log(response);
      this.setState({
        values: response.data
      })
    })
    
  } 
*/

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

  const updateUserType = (event: any, value : any) => {
    setUserType(value.value); 
  }

  const redirect = () => {
    if(userType === "medic") {
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
      if(resp !== -1){
        setCookie("user", { "id": resp, "usertype": "userType", "password" : password }, { "path": "/" });
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

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [cabinetCode, setCabinetCdoe] = useState();


  return (
    <div className='landingPage'>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' value={username} onChange={(event: any) =>{
            setUsername(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' value={email} onChange={(event:any) => {
            setPassword(event.target.value);
          }} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' placeholder='Last Name' value={password} onChange={(event:any) => {
            setLastName(event.target.value);
          }} />
        </Form.Field>
        <label>User type</label>

          <Button onClick={() => {
            
          }} type='LogIn'>Submit</Button>
      </Form>
    </div>
  )
}

export default App;
