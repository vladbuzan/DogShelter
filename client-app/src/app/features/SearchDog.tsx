import Axios, { AxiosError } from 'axios';
import React from 'react';
import axios from 'axios';
import '../layout/App.css';
import { useState } from 'react';
import { Accordion, Button, Form, Icon } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const SearchDog = () => {
    const [querried, setQuerried] = useState(false);
    const [found, setFound] = useState(false);
    const [dogCode, setDogCode] = useState(-1);
    const [cookies] = useCookies(["user"]);
    const [dog, setDog] = useState();
    
    const onSearchClicked = () => {
        if (dogCode < 0 || dogCode != parseInt(String(dogCode), 10)) {
            alert("Invalid dog code");
            return;
        } else {
            let req = `http://localhost:5000/api/dog/${cookies.user.id}/${dogCode}`
            axios.get(req).then((response) => {
                setDog(response.data);
                setQuerried(true);
                setFound(true);
            }).catch((reason: AxiosError) => {
                setFound(false);
                setQuerried(false);
            })
            return;
        }
    }

    const DogInfo = (props: any) => {
        const [activeIndex, setActiveIndex] = useState(-1);

        return (
            <Accordion styled>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={() => {
                        setActiveIndex(0);
                    }}
                >
                    <Icon name='dropdown' />
                    Dog name
                  </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>
                        {props.Dog.name}
                    </p>
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={() => {
                        setActiveIndex(1);
                    }}
                >
                    <Icon name='dropdown' />
                    Owner name
                  </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <p>
                        First name: {props.Dog.owner.firstName}
                        <br/>
                        Last name: {props.Dog.owner.lastName}
                    </p>
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={() => {
                        setActiveIndex(2);
                    }}
                >
                    <Icon name='dropdown' />
                    Owner contact
                  </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <p>
                        Email: {props.Dog.owner.email}
                        <br/>
                        Country: {props.Dog.owner.ownerContact.country}
                        <br/>                        
                        Town: {props.Dog.owner.ownerContact.town}
                        <br/>
                        Street: {props.Dog.owner.ownerContact.street}
                        <br/>
                        Number: {props.Dog.owner.ownerContact.number}
                    </p>
                </Accordion.Content>
            </Accordion>
        )

    }
    return (
        <div className='main'>
        <div className='landingPage'>
            <Form>
                <Form.Field>
                    <label>Dog chip code </label>
                    <input placeholder='code' type='number' value={dogCode}
                    onChange={(event: any) => {
                        setDogCode(event.target.value);
                    }}/>
                </Form.Field>
            </Form>
            <br /> 
            <Button positive onClick={onSearchClicked}> Search </Button>
            <br /> 
            <br /> 
            {querried && found? <DogInfo Dog = {dog}/> : undefined}
        </div>
    </div>
    )
};

export { SearchDog };