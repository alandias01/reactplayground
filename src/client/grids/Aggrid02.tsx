import React, { useState, useEffect, useRef, LegacyRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import { ColumnApi, GridApi, GridReadyEvent, Column } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { IFundingData, FundingData } from './DummyData';
import { currencyFormatter } from "./Formatters";

export function AgGrid02() {
  const [rowData, setRowData] = useState<IFundingData[]>();
  const gridRef = useRef<AgGridReact>(null);
  const [columns, setColumns] = useState<{ field: string }[]>();
  const [columnDefs, setColumnDefs] = useState();

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

  useEffect(() => {
    setRowData(FundingData);
    const columnsTemp = getCols();
    setColumns(columnsTemp);
  }, [])

  return (
    <div className="ag-theme-balham-dark" style={{ width: "100%", height: "calc(100vh - 100px", minHeight: 200 }}>

      <AgGridReact
        ref={gridRef}
        rowData={FundingData}
        columnDefs={columnDefs}
      >
        {columns && columns.map(column => (<AgGridColumn enable {...column} key={column.field} />))}

      </AgGridReact>
    </div>
  )
}