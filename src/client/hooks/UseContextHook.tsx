import React, { useState, createContext, useContext } from "react";
import { StockContextProvider } from './Context/StockContext'
import { StockSetContext } from './Context/StockSetContext'
import { StockGetContext } from './Context/StockGetContext'

export function UseContextHook() {
  return (
    <div>
      UseContextHook
      <br /><br />
      UseContext1
      <UseContext1 />
      <br /><br />
      UseContext2
      <StockContextProvider>
        <br />
        <StockSetContext />
        <br />
        <StockGetContext />
      </StockContextProvider>
      <br /><br />


    </div>
  )
}

/****************************************** UseContext1 ****************************************************/

/*
You can create a context to share between components and down the component tree instead
of manually passing props
*/

//Create a UserContext.ts file and insert below and import into where you want to use it
type UserContextState = { id: number, username: string };
const UserContextStateDefaultValue = { user: { id: 0, username: "" }, setUser: (user: UserContextState) => { } }
export const UserContext = createContext(UserContextStateDefaultValue);

//import {UserContext} from "./UserContext";
function UseContext1() {
  const [user, setUser] = useState<UserContextState>({ id: 1, username: "" });
  //const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      {/* UserContext.Provider value="Hello"> */}
      {/* <UserContext.Provider value={providerValue}></UserContext.Provider> */}
      <UserContext.Provider value={{ user, setUser }}>
        <ContextHookA />
        <ContextHookB />
      </UserContext.Provider>
    </div>
  );
}

//import {UserContext} from "./UserContext";
function ContextHookA() {
  const { user, setUser } = useContext(UserContext);

  const LoginDummy: () => Promise<UserContextState> = async () => ({ id: 1, username: "mike" });

  let handleLoginButtonClick = async () => {
    const data = await LoginDummy();
    setUser(data);
  }

  const isLoggedIn = () => {
    if (!user || user.username === "")
      return false;
    return true;
  }
  const LoginButton = () => <button onClick={handleLoginButtonClick} >Log in</button>;
  const LogoutButton = () => <button onClick={() => setUser({ id: 0, username: "" })} >Logout</button>;
  return (
    <div>
      ContextHookA: {JSON.stringify(user)}
      {isLoggedIn() ? <div>logged in <LogoutButton /></div> : <div>logged out <LoginButton /> </div>}
    </div>
  );
}

//import {UserContext} from "./UserContext";
function ContextHookB() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      ContextHookB: {JSON.stringify(user, null, 2)}
    </div >
  );
}

/****************************************** UseContext1 END ************************************************/

/****************************************** UseContext2 ****************************************************/

/****************************************** UseContext2 END ************************************************/
