import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    values: []
  }
  /*componentDidMount() {
    axios.get('http://localhost:5000/api/values').then((response) => {
      console.log(response);
      this.setState({
        values: response.data
      })
    })
    
  } */
  render() {
    return (
      <div className='landingPage'>
        <div className='main'>
          <h1>
            Online Dog Shelter
          </h1>
          <Button content='Sign in' primary />
          <Button content='Register' secondary />
        </div>
      </div>
    );
  }
  
}

export default App;
