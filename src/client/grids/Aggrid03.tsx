import React, { useState, useEffect, useRef, LegacyRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import { ColumnApi, GridApi, GridReadyEvent, Column } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid, makeStyles, CircularProgress, Divider, Chip, Theme, Card, CardContent, CardActions, CardActionArea, CardHeader, CardMedia, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import { currencyFormatter } from "./Formatters";

export function AgGrid03() {
  const [rowData, setRowData] = useState<any>();
  const gridRef = useRef<AgGridReact>(null);
  const [columns, setColumns] = useState<{ field: string }[]>();
  const [columnDefs, setColumnDefs] = useState();
  const [connection, setConnection] = useState<null | HubConnection>(null);

  const getCols = (data: any) => Object.keys(data).map(key => {
    if (key === "SOD" || key === "Failed") {
      return ({
        field: key, valueFormatter: (params: any) => currencyFormatter(params)
      })
    }
    else {
      return ({ field: key })
    }
  });

  // useEffect(() => {
  //   fetch("http://localhost:33413/api/filereader/async/", { credentials: "include" }).then(dr => dr.clone().json())
  //     .then(data => {
  //       console.log(data);
  //       //setRowData(data);
  //       //const columnsTemp = getCols(data);
  //       //setColumns(columnsTemp);
  //     });
  // }, [])

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://localhost:7150/rt')
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('ReceiveMessage', message => {
            console.log(message);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async (user: string) => {

    if (connection) {
      try {
        await connection.send('SendMessage2', user);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert('No connection to server yet.');
    }
  }

  return (
    <div className="ag-theme-balham-dark" style={{ width: "100%", height: "calc(100vh - 100px", minHeight: 200 }}>
      <Button onClick={() => sendMessage("alan")}>Toggle Loading</Button>

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
      >
        {columns && columns.map(column => (<AgGridColumn enable {...column} key={column.field} />))}

      </AgGridReact>
    </div>
  )
}