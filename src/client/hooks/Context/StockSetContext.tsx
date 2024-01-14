import React, { useState } from 'react'
import { IStockAction, useStockContext } from './StockContext'
import { TextField, Button } from '@mui/material'

export function StockSetContext() {

  const stockContext = useStockContext();
  const [newStockSymbol, setNewStockSymbol] = useState<string>("")

  const dispatchFunc = () => {
    const action: IStockAction = {
      type: "update",
      payload: { Symbol: newStockSymbol, Price: 1 }
    }

    stockContext?.dispatchStock(action);
  }

  return (
    <div>

      <TextField label="StockSetContext" onChange={(e) => setNewStockSymbol(e.target.value)} />
      {newStockSymbol}
      <Button variant='contained' onClick={dispatchFunc}>Update</Button>
    </div>
  )
}
