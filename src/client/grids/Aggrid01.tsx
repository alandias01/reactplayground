import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { ColumnApi, GridApi, GridReadyEvent, Column } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { IFundingData, FundingData } from "./DummyData";
import { currencyFormatter } from "./Formatters";

export function AgGrid01() {
  const [rowData, setRowData] = useState<IFundingData[]>();
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const [columns, setColumns] = useState<{ field: string }[]>();

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

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    setRowData(FundingData);
    const columnsTemp = getCols();
    setColumns(columnsTemp);
    adjustColumns();
  }, []);

  return (
    <div className="ag-theme-balham-dark" style={{ width: "auto", height: "calc(100vh - 50px", minHeight: 200 }}>
      <AgGridReact
        ref={gridRef}
        onGridReady={onGridReady}
        rowData={FundingData}
      >
        {columns && columns.map(column => (<AgGridColumn {...column} key={column.field} />))}
      </AgGridReact>
    </div>
  )
}