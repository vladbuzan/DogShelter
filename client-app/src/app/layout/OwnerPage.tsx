import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import './App.css';
import axios from 'axios';
import { Button, Form, Menu, Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

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
    removeCookie("user", {"path": "/"});
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

const ViewCabinets = (props: any) => {
  return (
    <div className='table'>
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Town</Table.HeaderCell>
            <Table.HeaderCell>Street</Table.HeaderCell>
            <Table.HeaderCell>Number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.cabinets.map((elem: any) => {
            return (
              <Table.Row>
                <Table.Cell>{elem.name}</Table.Cell>
                <Table.Cell>{elem.cabinetContact.country}</Table.Cell>
                <Table.Cell>{elem.cabinetContact.town}</Table.Cell>
                <Table.Cell>{elem.cabinetContact.street}</Table.Cell>
                <Table.Cell>{elem.cabinetContact.number}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

const EditCredentials = (props: any) => {

  const [userName, setUserName] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [mail, setNewMail] = useState();

  const [country, setCountry] = useState();
  const [town, setTown] = useState();
  const [street, setStreet] = useState();
  const [addressNumber, setAddressNumber] = useState();

  const [cookies] = useCookies(["user"]);

  const updateUserName = (event: any) => {
    setUserName(event.target.value);
  }

  const updateOldPassword = (event: any) => {
    setOldPassword(event.target.value);
  }

  const updateNewPassword = (event: any) => {
    setNewPassword(event.target.value);
  }

  const updateMail = (event: any) => {
    setNewMail(event.target.value);
  }

  const updateCountry = (event: any) => {
    setCountry(event.target.value);
  }

  const updateTown = (event: any) => {
    setTown(event.target.value);
  }

  const updateStreet = (event: any) => {
    setStreet(event.target.value);
  }

  const updateNumber = (event: any) => {
    setAddressNumber(event.target.value);
  }

  const onSubmitCredentialsClick = () => {
    let reqBody: any = {};
    let req = `http://localhost:5000/api/owner/`;
    console.log(userName);
    if (oldPassword !== cookies.user.password) {
      alert("Passwords not matching");
      return;
    }
    reqBody.id = cookies.user.id;
    reqBody.newPassword = newPassword;
    reqBody.newUsername = userName;
    reqBody.newMail = mail;
    axios.put(req, reqBody);
  }

  const onSubmitContactClick = async () => {
    let reqBody: any = {};
    let req = `http://localhost:5000/api/owner/`;
    if (typeof addressNumber !== "number") {
      alert("Invalid input");
      return;
    }
    reqBody.newCountry = country;
    reqBody.newTown = town;
    reqBody.newStreet = street;
    reqBody.newNumber = addressNumber;
    reqBody.id = cookies.user.id;
    axios.put(req, reqBody);
  }

  return (
    <div>
      <div className='credentials'>
        <Form>
          <Form.Field>
            <label>New username</label>
            <input placeholder='new username' value={userName} onChange={updateUserName} />
          </Form.Field>
          <Form.Field>
            <label>New Email</label>
            <input placeholder='new email' value={mail} onChange={updateMail} />
          </Form.Field>
          <Form.Field>
            <label>Old Password</label>
            <input type='password' value={oldPassword} onChange={updateOldPassword} />
          </Form.Field>
          <Form.Field>
            <label>New Password</label>
            <input type='password' value={newPassword} onChange={updateNewPassword} />
          </Form.Field>
          <Button type='submit' onClick={onSubmitCredentialsClick}>Update</Button>
        </Form>
      </div>
      <div className='credentials'>
        <Form>
          <Form.Field>
            <label>Country</label>
            <input placeholder='new country' value={country} onChange={updateCountry} />
          </Form.Field>
          <Form.Field>
            <label>Town</label>
            <input placeholder='new town' value={town} onChange={updateTown} />
          </Form.Field>
          <Form.Field>
            <label>Street</label>
            <input placeholder='new street' value={street} onChange={updateStreet} />
          </Form.Field>
          <Form.Field>
            <label>Number</label>
            <input type='number' step="1" value={addressNumber} onChange={updateNumber} />
          </Form.Field>
          <Button type='submit' onClick={onSubmitContactClick}>Update</Button>
        </Form>
      </div>
    </div>
  )
}

const ViewDogs = (props: any) => {
  return (
    <div className='table'>
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.dogs.map((elem: any) => {
            return (
              <Table.Row>
                <Table.Cell>{elem.name}</Table.Cell>
                <Table.Cell>{elem.code}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
export default OwnerPage;