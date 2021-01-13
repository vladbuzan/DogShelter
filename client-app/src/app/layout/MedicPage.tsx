import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import { SearchDog } from '../features/SearchDog'
import { AddDog } from '../features/AddDog'
import { MedicViewOwners } from '../features/MedicViewOwners'
import { RegisterOwner } from '../features/RegisterOwner'
import './App.css';
import axios from 'axios';
import { withSecurityCheck } from '../features/SecurityCheck';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const MedicPage = (props: any) => {
    const [activeItem, setActiveItem] = useState("");
    const [ownerList, setOwnerList] = useState([]);
    const history = useHistory();
    const [cookies, , removeCookie] = useCookies(["user"]);

    const onLogOutClciked = () => {
        removeCookie("user", { "path": "/" });
        history.push("/");
    }

    const fetchOwnerList = () => {
        let req = `http://localhost:5000/api/owner/${cookies.user.id}`;
        axios.get(req).then((response) => {
            setOwnerList(response.data);
        }).catch((reason) => {
            alert(reason.message);
        });
    }

    const onSeeOwnersClicked = () => {
        if(ownerList.length === 0) {
            fetchOwnerList();
        }
        setActiveItem('seeOwners')
    }

    return (
        <div>
            <Menu>
                <Menu.Item
                    name='searchDog'
                    active={activeItem === 'searchDog'}
                    onClick={() => {
                        setActiveItem('searchDog');
                    }}>
                    Search Dog
                </Menu.Item>
                <Menu.Item
                    name='registerOwner'
                    active={activeItem === 'registerOwner'}
                    onClick={() => {
                        setActiveItem('registerOwner');
                    }}>
                    Register Owner
                </Menu.Item>
                <Menu.Item
                    name='addDog'
                    active={activeItem === 'addDog'}
                    onClick={() => {
                        setActiveItem('addDog');
                    }}>
                    Add Dog
                </Menu.Item>
                <Menu.Item
                    name='seeOwners'
                    active={activeItem === 'seeOwners'}
                    onClick={onSeeOwnersClicked}>
                    See Owners
                </Menu.Item>
                <Menu.Item
                    onClick={onLogOutClciked}
                >
                    Log Out
        </Menu.Item>
            </Menu>
            {activeItem === 'searchDog' ? <SearchDog /> : undefined}
            {activeItem === 'registerOwner' ? <RegisterOwner /> : undefined}
            {activeItem === 'addDog' ? <AddDog /> : undefined}
            {activeItem === 'seeOwners'? <MedicViewOwners owners={ownerList}/> : undefined}
        </div>
    )
}

export default withSecurityCheck(MedicPage);