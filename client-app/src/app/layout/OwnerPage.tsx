import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import './App.css';
import axios from 'axios';
import { ViewCabinets } from '../features/ViewCabinets'
import { EditCredentials } from '../features/EditCredentials'
import { ViewDogs } from '../features/ViewDogs'
import { Button, Form, Menu, Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { withSecurityCheck } from '../features/SecurityCheck';

const OwnerPage = (props: any) => {
  const [activeItem, setActiveItem] = useState("")
  const [cabinetList, setCabinetList] = useState([]);
  const [dogList, setDogList] = useState([]);
  const history = useHistory();
  const [cookies, , removeCookie] = useCookies(["user"]);

  const fetchCabinetList = () => {
    let req: string = `http://localhost:5000/api/cabinet`;
    axios.get(req).then((response) => {
      setCabinetList(response.data)
      console.log(response.data[0].name)
    });
  }

  const fetchDogList = () => {
    let req: string = `http://localhost:5000/api/dog/${cookies.user.id}`;
    axios.get(req).then((response) => {
      setDogList(response.data);
      console.log(response.data);
    });
  }

  const onCabinetsClicked = () => {
    if (cabinetList.length === 0) {
      console.log("fetched cabinet list");
      fetchCabinetList()
    }
    setActiveItem("cabinets");
  }

  const onCredentialsClicked = () => {
    setActiveItem("credentials");
  }

  const onDogsClciked = () => {
    if (dogList.length === 0) {
      fetchDogList();
    }
    setActiveItem("dogs");
  }

  const onLogOutClciked = () => {
    removeCookie("user", { "path": "/" });
    history.push("/");
  }

  return (
    <div>
      <Menu>
        <Menu.Item
          name="cabinets"
          active={activeItem === "cabinets"}
          onClick={onCabinetsClicked}
        >
          Cabinets
        </Menu.Item>
        <Menu.Item
          name='credentials'
          active={activeItem === 'credentials'}
          onClick={onCredentialsClicked}
        >
          Credentials
        </Menu.Item>
        <Menu.Item
          name='dogs'
          active={activeItem === `dogs`}
          onClick={onDogsClciked}
        >
          Dogs
        </Menu.Item>
        <Menu.Item
          onClick={onLogOutClciked}
        >
          Log Out
        </Menu.Item>

      </Menu>
      {(activeItem === "cabinets") ? <ViewCabinets cabinets={cabinetList} /> : undefined}
      {(activeItem === "credentials") ? <EditCredentials /> : undefined}
      {(activeItem === "dogs") ? <ViewDogs dogs={dogList} /> : undefined}
    </div>
  )
}

export default withSecurityCheck(OwnerPage);