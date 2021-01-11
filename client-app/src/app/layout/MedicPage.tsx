import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useCookies } from "react-cookie";
import { SearchDog } from '../features/SearchDog'
import './App.css';
import axios from 'axios';
import { withSecurityCheck } from '../features/SecurityCheck';
import { Menu } from 'semantic-ui-react';

const MedicPage = (props: any) =>{
    const [activeItem, setActiveItem] = useState("");
    
    return(
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
                onClick={() => {
                    setActiveItem('seeOwners');
                }}>
                See Owners
                </Menu.Item>
            </Menu>
            {activeItem === 'searchDog' ? <SearchDog/> : undefined }
        </div>
    )
}

export default withSecurityCheck(MedicPage);