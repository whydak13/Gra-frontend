import React, { Component } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";

import { useState, useEffect } from "react";

import {
  DefaultColumnFilter,
  noFilter,
  fuzzyTextFilterFn,
} from "./CustomFilters";

import { Styles } from "./tableStyles";

function SpecialRuleList() {
  const [dataList, setdataList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/specialrules")
      .then((res) => res.json())
      .then((result) => {
        setdataList(result);
        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Filter: noFilter,
    },
    {
      Header: "Nazwa",
      accessor: "name",
    },
    {
      Header: "Kampania",
      accessor: "camp_only",
    },
    {
      Header: "Koszt",
      accessor: "cost_add",
    },

    {
      Header: "X*",
      accessor: "cost_multiply",
      isVisible: false,
      width: 0,
    },

    {
      Header: "Opis",
      accessor: "description",
    },
  ];

  {
    /*    {
      Header: "Koszt+",
      accessor: "cost_add",
    },
    {
      Header: "Koszt*",
      accessor: "cost_multiply",
    },*/
  }

  function Table({ columns, data, renderRowSubComponent }) {
    // Use the state and functions returned from useTable to build your UI

    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
      }),
      []
    );

    const autoResetHiddenColumns = false;

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      allColumns,
      getToggleHideAllColumnsProps,
      instance,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        state,
        autoResetHiddenColumns,
        defaultColumn,
        filterTypes,
      },

      useFilters, // useFilters!
      useGlobalFilter,
      useSortBy
    );

    const firstPageRows = rows;
    // Render the UI for your table
    return (
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props

                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    {/* ******************************************************* */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    {/* ******************************************************* */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      /*<td {...cell.getCellProps()}>{cell.render("Cell")}</td>*/
                      <td {...cell.getCellProps()}>
                        {cell.render(() => {
                          return cell.column.Header == "Koszt"
                            ? row.values.cost_multiply +
                                "X +" +
                                row.values.cost_add
                            : typeof cell.value == "boolean"
                            ? cell.value
                              ? "Tak"
                              : "Nie"
                            : cell.value;
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>{column.Header}</label>{" "}
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Zasady specjalne</h2>

      <Styles>
        <Table columns={columns} data={dataList} />
      </Styles>
    </div>
  );
}

export default SpecialRuleList;
