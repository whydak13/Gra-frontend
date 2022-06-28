import React, { Component } from "react";
import Popup from "./Popup";
import Table from "react-bootstrap/Table";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator"; //https://www.youtube.com/watch?v=qDTAWSg41ag&ab_channel=ManojDeshwal
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import {
  Dropdown,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";
//import Select from 'react-select';
import { useState, useEffect } from "react";
import filterFactory, {
  textFilter,
  multiSelectFilter,
} from "react-bootstrap-table2-filter";

function SpecialRuleList() {
  const [dataList, setdataList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/specialrules")
      .then((res) => res.json())
      .then((result) => {
        setdataList(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { dataField: "id", text: "Id", sort: true },
    {
      dataField: "name",
      text: "Nazwa",
      sort: true,
      filter: textFilter({ placeholder: "Podaj nazwę" }),
    },
    {
      dataField: "camp_only",
      text: "Kampania",
      sort: true,
      type: "bool",
      formatter: (value) => {
        return value ? 1 : 0;
      },
    },
    {
      dataField: "cost_add",
      formatter: (value, row, rowIndex) => {
        return <div>{`${row.cost_multiply}*X+${row.cost_add} `}</div>;
      },
      text: "Koszt",
      sort: true,
      filter: textFilter({ placeholder: "Podaj koszt" }),
    },

    { dataField: "description", text: "Opis" },
  ];

  return (
    <div>
      <h2>Zasady specjalne</h2>

      <BootstrapTable
        bootstrap4
        keyField="id"
        columns={columns}
        data={dataList}
        filter={filterFactory()}
      />
    </div>
  );
}

export default SpecialRuleList;

// {this.state.data.map(Weapon => <Weapon info={Weapon}/>)}
//<Weapon/>
