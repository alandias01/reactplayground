import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import { ColumnApi, GridApi, GridReadyEvent, Column, ColDef, ColGroupDef } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Button } from '@mui/material';
import { IFundingData, FundingData } from './DummyData';
import { currencyFormatter } from "./Formatters";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export function AgGridTemplate() {
  const [rowData, setRowData] = useState<IFundingData[]>();
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const gridRef = useRef<AgGridReact>(null);
  const [columns, setColumns] = useState<{ field: string }[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>();
  const [connection, setConnection] = useState<HubConnection>();


  const setColdef = () => {
    const coldef: any[] = [
      {
        field: "Id",
        hide: true
      },
      {
        field: "Entity",
        enableRowGroup: true
      },
      {
        field: "FundingTier",
        enableRowGroup: true
      },
      {
        field: "CollTier",
        enableRowGroup: true
      },
      {
        field: "Classification",
        enablePivot: true
      },
      {
        field: "SOD",
        aggFunc: "sum"
      },
      {
        field: "Failed",
        aggFunc: "sum"
      },
      {
        field: "Settled",
        aggFunc: "sum",
        columnGroupShow: 'closed',
        hide: true

      }];

    setColumnDefs(coldef);
  }

  const getCols = () => Object.keys(FundingData[0]).map(key => {
    if (key === "SOD" || key === "Failed") {
      return ({
        field: key, valueFormatter: (params: any) => currencyFormatter(params)
      })
    }
    else {
      return ({ field: key })
    }
  });

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  //use in useEffect and put gridColumnApi in dependency array
  const adjustColumns = () => {
    if (gridColumnApi) {
      const allColumnIds: string[] = [];
      const allColumns = gridColumnApi.getAllColumns();
      if (allColumns) {
        allColumns.forEach((column: Column) => {
          allColumnIds.push(column.getColId());
        });

        gridColumnApi.autoSizeColumns(allColumnIds, false);
      }
      else {
        console.log("allColumns was null")
      }
    }
  }

  const AddUpdateRow = () => {
    const row = { Id: "13", Entity: "MLILY", FundingTier: "CSH", CollTier: "CS", Classification: "Clearance", SOD: 100, Failed: 10, Settled: 50, T: 60 };

    const rowFound = gridRef.current?.api.getRowNode(row.Id);
    if (rowFound) {
      gridRef.current?.api.applyTransaction({ update: [row] });
    }
    else {
      gridRef.current?.api.applyTransaction({ add: [row] });
    }
  }

  useEffect(() => {
    setRowData(FundingData);

    //These 2 are used with <AgGridColumn> tag to autogenerate columns
    const columnsTemp = getCols();
    setColumns(columnsTemp);

    //This is used to define your columns
    setColdef();
  }, [])


  //#region ************************************** SignalR **************************************
  const sendMessage = () => {
    if (connection)
      /* send method doesn't wait for a response from the server. The send method returns a JavaScript Promise. 
         The Promise is resolved when the message has been sent to the server. If there is an error sending the 
         message, the Promise is rejected with the error message 
      */
      connection.send("SendMessage", "From client").catch(err => console.log(err));
  }
  const sendMessage2 = () => {
    if (connection)
      connection.send("SendMessage2", "From client").catch(err => console.log(err));;
  }


  async function StartConnection() {
    if (!connection) return;
    try {
      console.log("Attempting to connect to socket... " + connection.baseUrl);
      await connection.start();
      console.log("Connected to Socket.  Connection id: " + connection.connectionId);
    }
    catch (err) {
      console.log("Could not connect to socket: " + err);

      //Logic to retry connection.  withAutomaticReconnect() doesn't cover initial connection retry
      //setTimeout(start, 5000);  
    }
  }

  function RegisterConnectionCallbacks() {
    if (!connection) return;

    console.log("Registering Connection callbacks")

    connection.on("ReceiveMessage", msg => {
      console.log(msg);
    });

    /*
    When connection is lost, onreconnecting() is called once but will try to reconnect 4 times by default
    If it connects, onreconnected gets called.  If it doesn't connect, onclose() gets called
    */
    connection.onreconnecting(err => { console.error("Alan onreconnecting: " + err); console.log("Reconnecting") });
    connection.onreconnected(newConnId => console.log("Reconnected! New connection ID: " + newConnId));
    connection.onclose(err => { console.error("Alan onclose: " + err); console.log("Connection closed"); });
  }

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://localhost:44349/rt')
      /* configures the client to wait 0, 2, 10, and 30 seconds respectively 
         before trying each reconnect attempt. 
         After four failed attempts, it stops trying to reconnect.
       */
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, [])

  useEffect(() => {
    if (connection) {
      RegisterConnectionCallbacks();
      StartConnection();
    }
  }, [connection]);

  //#endregion ************************************** SignalR **************************************

  return (
    <div className="ag-theme-balham-dark" style={{ width: "100%", height: "calc(100vh - 100px", minHeight: 200 }}>
      <Button onClick={sendMessage}>Send Data</Button>
      <Button onClick={sendMessage2}>Send Data2</Button>
      <Button onClick={() => StartConnection()}>Start connection</Button>
      <Button onClick={() => connection?.stop()}>Stop connection</Button>
      <br />
      <Button onClick={() => AddUpdateRow()}>Add update record</Button>

      <AgGridReact
        ref={gridRef}
        rowData={FundingData}
        columnDefs={columnDefs}
        rowGroupPanelShow="always"
        sideBar={true}
        getRowId={(p) => p.data.Id}
      >
        {/* {columns && columns.map(column => (<AgGridColumn enable {...column} key={column.field} />))} */}

      </AgGridReact>
    </div>
  )
}