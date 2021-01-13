import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import './App.css';
import axios from 'axios';
import { Button, Checkbox, Form, Menu, Table } from 'semantic-ui-react';

const AdminPage = (props: any) => {
    const [activeItem, setActiveItem] = useState('')
    const [ownerList, setOwnerList] = useState([])
    const [ownerUsername, setOwnerUsername] = useState()
    
    const fetchOwnerList = () => {
        let req = `http://localhost:5000/api/owner`;
        axios.get(req).then((response) => {
            setOwnerList(response.data);
            console.log(response.data);
        })
    }

    const onOwnersClicked = () => {
        if (ownerList.length === 0) {
            fetchOwnerList();
        }
        setActiveItem('owners');
    }

    const onLogOutClciked = () => {

    }

    return (
        <div>
            <Menu>
                <Menu.Item
                    name='owners'
                    active={activeItem === 'owners'}
                    onClick={onOwnersClicked}>
                    Owners
                </Menu.Item>
                <Menu.Item
                    name='medics'
                    active={activeItem === 'medics'}
                    onClick={() => { setActiveItem('medics') }}>
                    Medics
                </Menu.Item>
                <Menu.Item
                    name='cabinets'
                    active={activeItem === 'cabinets'}
                    onClick={() => { setActiveItem('cabinets') }}>
                    Cabinets
                </Menu.Item>
                <Menu.Item
                    onClick={onLogOutClciked}
                >
                    Log Out
        </Menu.Item>
            </Menu>
            {activeItem === 'owners' ? <div className='table'>
                <Table inverted celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Firstname</Table.HeaderCell>
                            <Table.HeaderCell>Lastname</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {ownerList.map((elem: any) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{elem.firstName}</Table.Cell>
                                    <Table.Cell>{elem.lastName}</Table.Cell>
                                    <Table.Cell>{elem.username}</Table.Cell>
                                    <Table.Cell>{elem.email}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
                <div className='login'>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder='username' />
                        </Form.Field>
                        <Button type='delete'>Delete</Button>
                    </Form>
                </div>
            </div> : undefined}
        </div>
    )
}

export default AdminPage;