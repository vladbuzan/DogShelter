import React, {Component, useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import { Form, Checkbox, Button, Radio } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';
import { Console } from 'console';


const App = (props: any) => {
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  
  const onSignInClicked = () => {
    setShouldShowLogin(true);
    console.log("this was called");
    
  }

  const onBackClicked = () => {
    setShouldShowLogin(false);
  }

  const [cookies, setCookie] = useCookies(["user"]);

  return (

    <div className='landingPage'>
      <div className='main'>
        <h1>
          Online Dog Shelter
        </h1>
        {shouldShowLogin ? <LogIn userType="admin" /> : undefined}
        {shouldShowLogin ? <br /> : undefined}
        {shouldShowLogin ? <Button secondary onClick=
          {onBackClicked} >Back</Button> : undefined}
        {shouldShowLogin ? undefined : <Button content='Sign in' primary onClick={onSignInClicked} />}
        {shouldShowLogin ? undefined : <Button content='Register' secondary />}
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
  const [cookies, setCookie] = useCookies(["user"]);

  const updateUsername = (event: any) => {
    setUserName(event.target.value);
  }

  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  }

  const updateUserType = (event: any, value : any) => {
    setUserType(value.value);
    
  }
  const onSubmitClick = () => {
    let req : string = `http://localhost:5000/api/${userType}/${userName}/${password}`;
    console.log(req);
    /*axios.get(`http://localhost:5000/admin/${userName}/${password}`).then((response) =>
    {
      //let resp = 
      setCookie("user", {"id" : 1, "usertype" : "admin"}, {"path": "/"});
    }
  });*/}

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

export default App;
