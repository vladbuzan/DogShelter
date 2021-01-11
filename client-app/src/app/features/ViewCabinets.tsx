import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../layout/App.css';
import { Table } from 'semantic-ui-react';


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

  export {ViewCabinets}