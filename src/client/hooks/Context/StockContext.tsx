import React, { useReducer, useContext, createContext, ReactNode } from 'react';


// Would go in a separate file
export interface IStock {
  Symbol: string;
  Price: number;
}


export interface IStockAction {
  type: string;
  payload: IStock;
}

const StockReducer = (prevState: IStock, action: IStockAction): IStock => {
  switch (action.type) {
    case "update":
      return { ...prevState, ...action.payload }

    default:
      return prevState;
  }
}

interface IStockContext {
  stock: IStock;
  dispatchStock: (stockAction: IStockAction) => void;
}

const StockContext = createContext<IStockContext | undefined>(undefined);

export const useStockContext = () => useContext(StockContext);

export const StockContextProvider = ({ children }: { children: ReactNode }) => {
  const [stock, dispatchStock] = useReducer(StockReducer, { Symbol: "", Price: 0 });

  return (
    <div>
      <StockContext.Provider value={{ stock, dispatchStock }}>
        {children}
      </StockContext.Provider>
    </div>
  );

}

/*
Naming conventions
subject: SelectedSecurity
CreateContext and filename: SelectedSecurityContext
DefaultValue for CreateContext: SelectedSecurityContextDefaultValue
Hook to return context: useSelectedSecurityContext
Provider: SelectedSecurityContextProvider

Step 1
create context and pass a default value

const SelectedSecurityContextDefaultValue = {
  selectedSecurity: SecurityMasterService[0],
  setSelectedSecurity: (selectedSecurity: ISecurityMasterService) => { },
};

const SelectedSecurityContext = createContext(SelectedSecurityContextDefaultValue);

Step 2
Child components will want to use it via useContext
You can wrap this into a hook and use elsewhere

export function useSelectedSecurityContext() {
  return useContext(SelectedSecurityContext);
}

Step 3
You have to provide the value using the provider property of the context like so.  
It will be the parent of the components that will consume the context
<SelectedSecurityContext.Provider value={}>
  <ChildComponentsThatHaveAccessToTheContext>
<SelectedSecurityContext.Provider

A better way is to wrap this into a Provider Component like so
export const SelectedSecurityProvider: React.FC<{}> = ({ children }) => {
  const [selectedSecurity, setSelectedSecurity] = useState<ISecurityMasterService>(SelectedSecurityContextDefaultValue.selectedSecurity)
  return (
    <div>
      <SelectedSecurityContext.Provider value={{ selectedSecurity, setSelectedSecurity }}>
        {children}
      </SelectedSecurityContext.Provider>
    </div>);
}

*/
