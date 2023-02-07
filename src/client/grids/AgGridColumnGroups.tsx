import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import { ColumnApi, GridApi, GridReadyEvent, Column, ColDef, ColGroupDef } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Button } from '@mui/material';
import { IFundingData, FundingDataNested } from './DummyData';
import { currencyFormatter } from "./Formatters";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export function AgGridColumnGroups() {
  const [rowData, setRowData] = useState<IFundingData[]>();
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>();
  const [connection, setConnection] = useState<HubConnection>();



  const getUniqueClassifications = (data: IFundingData[] | undefined): Set<string> | null => {
    if (!data) return null;
    const allClassifications = new Set<string>();
    data.forEach(row => {
      for (const item in row.Classification as {}) {
        allClassifications.add(item);
      }
    });
    return allClassifications;
  }

  const buildColumnGroups = (data: IFundingData[]) => {
    const coldef: any[] = [
      {
        field: "Id",
        hide: true
      },
      {
        field: "Entity",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      },
      {
        field: "FundingTier",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      },
      {
        field: "CollTier",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      }];

    const allClassifications = getUniqueClassifications(data);
    const ladder = ['SOD', 'Failed', 'Settled', 'T'];
    allClassifications?.forEach(classification => {

      const childlrenArr = ladder.map(ladderItem => ({
        headerName: ladderItem,
        field: `Classification.${classification}.values.${ladderItem}`,
        aggFunc: "sum",
        columnGroupShow: "open"
      }));

      const classificationColDef: ColGroupDef = {
        headerName: classification,
        children: childlrenArr
      };
      coldef.push(classificationColDef);
    });

    setColumnDefs(coldef);
  }

  const setColdef = () => {
    const coldef: any[] = [
      {
        field: "Id",
        hide: true
      },
      {
        field: "Entity",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      },
      {
        field: "FundingTier",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      },
      {
        field: "CollTier",
        enableRowGroup: true,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'Clearance',
        children: [{
          headerName: 'SOD',
          field: "Classification.Clearance.values.SOD",
          aggFunc: "sum"
        },
        {
          headerName: 'Failed',
          field: "Classification.Clearance.values.Failed",
          aggFunc: "sum"
        },
        {
          headerName: 'Settled',
          field: "Classification.Clearance.values.Settled",
          aggFunc: "sum"
        },
        {
          headerName: 'T',
          field: "Classification.Clearance.values.T",
          aggFunc: "sum"
        }]
      },
      {
        headerName: 'Firm Depot Net',
        children: [{
          headerName: 'SOD',
          field: "Classification.Firm Depot Net.values.SOD",
          aggFunc: "sum"
        },
        {
          headerName: 'Failed',
          field: "Classification.Firm Depot Net.values.Failed",
          aggFunc: "sum"
        },
        {
          headerName: 'Settled',
          field: "Classification.Firm Depot Net.values.Settled",
          aggFunc: "sum"
        },
        {
          headerName: 'T',
          field: "Classification.Firm Depot Net.values.T",
          aggFunc: "sum"
        }]
      }

    ];

    setColumnDefs(coldef);
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
    if (FundingDataNested) {
      buildColumnGroups(FundingDataNested);
      setRowData(FundingDataNested);
    }
  }, [FundingDataNested])


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
        rowData={FundingDataNested}
        columnDefs={columnDefs}
        rowGroupPanelShow="always"
        sideBar={true}
        getRowId={(p) => p.data.Id}
        suppressAggFuncInHeader={true}
      >
      </AgGridReact>
    </div>
  )
}