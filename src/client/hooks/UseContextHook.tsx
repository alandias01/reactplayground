import React, { useState, createContext, useContext } from "react";
import { UseContextReducer } from './ContextReducer/UseContextReducer';

export function UseContextHook() {
  return (
    <div>
      UseContextHook
      <br /><br />
      UseContext1
      <UseContext1 />
      <br /><br />
      UseContext2
      {/* <UseContext2 /> */}
      <br /><br />
      UseContextReducer
      <UseContextReducer />
      <br />
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
/*
ArticleContext
App where you wrap comonents that use context
AddArticle:Has forms and a way to take in an article to insert
ShowSrticles
 */

//ArticleContext.ts

interface IArticle {
  id: number;
  title: string;
}

type ArticlesType = {
  data: IArticle[],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean
}

const defaultArticles = {
  articles: {
    data: [{ id: 0, title: "Test" }],
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  setArticles: (articles: ArticlesType) => { }
}
const ArticleContext = React.createContext(defaultArticles);

function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<ArticlesType>(defaultArticles.articles);

  return (
    <div>
      <ArticleContext.Provider value={{ articles, setArticles }} >
        {children}
      </ArticleContext.Provider>
    </div>
  );
}
/*
//AddArticle.ts
function AddArticle() {
  const { setArticles } = useContext(ArticleContext);
  const [title, setTitle] = useState("");

  const SaveArticle = () => {
    const id = Math.floor(Math.random() * 10000);
    setArticles((x) => ({ ...x, data: [...x.data] }));
  }

  return (
    <div>
      <form>
        <TextField type="text" label="Title" onChange={(e) => setTitle(e.target.value)} />
        <Button variant="outlined" onClick={SaveArticle} >Add</Button>
      </form>
    </div>
  );
}

//ShowArticles.ts
function ShowArticles() {
  const { articles } = useContext(ArticleContext);
  return <div>{articles.data.map(x => <div key={x.id}>{x.id}: {x.title}</div>)}</div>
}

function UseContext2() {
  return (
    <div>
      <ArticleProvider>
        <AddArticle />
        <ShowArticles />
      </ArticleProvider>
    </div>
  );
}
*/
/****************************************** UseContext2 END ************************************************/
