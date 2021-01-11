import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../layout/App.css';
import { Table } from 'semantic-ui-react';


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
export { ViewDogs }