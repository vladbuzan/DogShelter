import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import 'semantic-ui-css/semantic.min.css';
import { Button, Form } from 'semantic-ui-react';
import { LogIn } from '../features/LogIn';
import { Register } from '../features/Register';
import '../layout/App.css';


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
      <div className='login'>
        <h1>
          Online Dog Shelter
        </h1>
        {shouldShowLogin ? <LogIn userType="admin" /> : undefined}
        {shouldShowRegister ? <Register/> : undefined}
        {shouldShowLogin ? <br /> : undefined}
        {shouldShowLogin || shouldShowRegister ? <Button secondary onClick=
          {onBackClicked} >Back</Button> : undefined}
        {shouldShowLogin || shouldShowRegister ? undefined : <Button content='Sign in' primary onClick={onSignInClicked} />}
        {shouldShowRegister || shouldShowLogin ? undefined : <Button content='Register' secondary onClick={onRegisterClicked} />}
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




export default App;
