import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import MedicPage from './app/layout/MedicPage'
import AdminPage from './app/layout/AdminPage'
import OwnerPage from './app/layout/OwnerPage'
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path = "/AdminPage/">
        <AdminPage/>
      </Route>
      <Route exact path = "/OwnerPage/">
        <OwnerPage/>
      </Route>
      <Route exact path = "/MedicPage/">
        <MedicPage/>
      </Route>
    </CookiesProvider>,
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
