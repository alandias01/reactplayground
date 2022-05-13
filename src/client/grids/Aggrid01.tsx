import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { ColumnApi, GridApi, GridReadyEvent, Column } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Button } from '@material-ui/core';

interface IDummyData {
  Entity: string;
  Tier: string;
  MarketCode: string;
  MarketPrice: number;
}

export function AgGrid01() {
  const [rowData, setRowData] = useState<IDummyData[]>();
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const [columns, setColumns] = useState<{ field: string }[]>();

  useEffect(() => {
    setRowData(dummyParentOrder);
    const columnsTemp = getCols();
    setColumns(columnsTemp);
    if (gridColumnApi) {

      const adjustColumns = () => {
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
      adjustColumns();
    }
  }, [gridColumnApi, gridApi]);


  const dummyParentOrder: IDummyData[] = [{
    Entity: "MLIL",
    Tier: "CLH",
    MarketCode: "US",
    MarketPrice: 100

  }, {
    Entity: "MLPFS",
    Tier: "JXA",
    MarketCode: "US",
    MarketPrice: 200
  }];

  const getCols = () => Object.keys(dummyParentOrder[0]).map(key => {
    if (key === "MarketPrice" || key === "position") {
      return ({
        field: key, valueFormatter: (params: any) => currencyFormatter(params)
      })
    }
    else {
      return ({ field: key })
    }
  });

  function currencyFormatter(params: any) {
    var sansDec = params.value.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + formatted;
  }

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div style={{ height: "80vh", margin: "5px" }}>
      <div className="ag-theme-balham-dark" style={{ width: "auto", height: "100%", minHeight: 200 }}      >

        <AgGridReact
          onGridReady={onGridReady}
          rowData={dummyParentOrder}
        >
          {columns && columns.map(column => (<AgGridColumn {...column} key={column.field} />))}

        </AgGridReact>
      </div>

    </div>
  )


}