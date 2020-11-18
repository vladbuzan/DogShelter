import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

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
  render() {
    return (
      <div>
        <Header as='h2' icon>
          <Icon name='settings' />
          Account Settings
          <Header.Subheader>
            Manage your account settings and set e-mail preferences.
    </Header.Subheader>
        </Header>
        <ul>
            {this.state.values.map((value: any) => (
              <li>{value.name}</li>
            ))}
          </ul>
      </div>
    

   
          
  
    );
  }
  
}

export default App;
