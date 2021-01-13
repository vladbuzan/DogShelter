import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../layout/App.css';
import { Table } from 'semantic-ui-react';


const MedicViewOwners = (props: any) => {
    return (
      <div className='table'>
        <Table inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Firstname</Table.HeaderCell>
              <Table.HeaderCell>Lastname</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.owners.map((elem: any) => {
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
      </div>
    )
  }

  export {MedicViewOwners}