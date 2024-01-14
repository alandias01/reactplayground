import React from 'react'
import { useStockContext } from './StockContext'

export function StockGetContext() {
  const stockContext = useStockContext();
  return (
    <div>
      StockGetContext
      <br />
      Symbol: {stockContext?.stock.Symbol}, price: {stockContext?.stock.Price}
    </div>
  )
}
