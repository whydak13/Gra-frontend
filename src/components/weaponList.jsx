import React, { Component } from 'react';
import Popup from './Popup';
import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator'; //https://www.youtube.com/watch?v=qDTAWSg41ag&ab_channel=ManojDeshwal
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {Dropdown, Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
//import Select from 'react-select';
import {useState, useEffect} from 'react';
import filterFactory, { textFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';


function WeaponList() {

const [dataList, setdataList] =useState([]);

useEffect(() => {
  fetch('http://localhost:8080/weapons')
  .then(res => res.json())
  .then( (result) => {  setdataList(result)  } )
  .catch(error => console.log(error));
}, [])

const reachOptions = {
  0: '0.5',
  1: '1',
  2: '2'
};

const columns = [
  {dataField: 'id', text: 'Id', sort: true},
  {dataField: 'name', text: 'Nazwa', sort: true, filter: textFilter({placeholder: 'Podaj nazwę'})},
  {dataField: 'reach', text: 'Zasięg', sort: true, 
  filter: textFilter({placeholder: 'Podaj zasięg'})},
  {dataField: 'agility', text: 'Celność', sort: true,filter: textFilter({placeholder: 'Podaj celność'})},
  {dataField: 'impact', text: 'Impet', sort: true, filter: textFilter({placeholder: 'Podaj impet'})},
  {dataField: 'cost', text: 'Koszt', sort: true, filter: textFilter({placeholder: 'Podaj koszt'})}, 
  {dataField: 'description', text: 'Opis'}



]

  

    return (
      <div>
        <h2>Broń do walki wręcz</h2>

        <BootstrapTable 
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={dataList} 
        filter={ filterFactory() } />










     {/*   <Table >
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa</th>
              <th>Zasięg</th>
              <th>Celność</th>
              <th>Impet</th>
              <th>Koszt</th>
              <th>Opis</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map(w => (
                 <tr >
                 <td>{w.id}</td>
                 <td>{w.name}</td>
                 <td>{w.reach}"</td>
                 <td>{w.agility}</td>
                 <td>{w.impact}</td>
                 <td>{w.cost}</td>
                 <td>{w.description}</td>
               </tr>
             
            ))}

          </tbody>
            </Table> */}


      </div>
    );
  }


export default WeaponList;


  // {this.state.data.map(Weapon => <Weapon info={Weapon}/>)}
        //<Weapon/>