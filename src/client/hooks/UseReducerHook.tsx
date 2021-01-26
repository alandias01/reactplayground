import React, { useState, useReducer, useEffect } from "react";
import { TaskDelay } from "../../util/util";

export function UseReducerHook() {
  return (
    <div>
      UseReducerHook
      <br /><br />

      UseReducerIncrement01
      <UseReducerIncrement01 />
      <br /><br />

      UseReducerIncrementDependsOnMultipleState
      <UseReducerIncrementDependsOnMultipleState />
      <br /><br />

      UseReducerStateDependsOnPropsWrapper
      <UseReducerStateDependsOnPropsWrapper />
      <br /><br />

      UseReducerFetchData
      <UseReducerFetchData />
      <br /><br />

      UseReducerFetchDataCustomHook
      <UseReducerFetchDataCustomHook />
      <br /><br />

      UseReducerFetchDataCustomHookUseEffect
      <UseReducerFetchDataCustomHookUseEffect />
      <br /><br />

      UseReducerFormTodos
      <UseReducerFormTodos />
      <br /><br />
    </div>
  )
}

/*A reducer takes in an original state and returns a new state based on some action
  Reducers lets you decouple expressing the “actions” that happened in your component 
  from how the state updates in response to them.
  An example is you can take dependencies out of useEffect and put them in the reducer
*/

type IAction = { type: string, payload?: any };

type IFetchDataState = {
  data?: any;
  isLoading: boolean;
  error?: Error;
}

/****************************************** UseReducerIncrement01 ******************************************/

const UseReducerIncrement01Action = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT"
}

function Increment01Reducer(prevState: number, action: IAction) {
  switch (action.type) {
    case UseReducerIncrement01Action.INCREMENT:
      return prevState + 1
    case UseReducerIncrement01Action.DECREMENT:
      return prevState - 1
    default:
      return prevState;
  }
}

function UseReducerIncrement01() {
  const [state, dispatch] = useReducer(Increment01Reducer, 0)

  return (
    <div>
      <div>count: {state}</div>
      <button onClick={() => dispatch({ type: UseReducerIncrement01Action.INCREMENT, payload: {} })} >Increment</button>
      <button onClick={() => dispatch({ type: UseReducerIncrement01Action.DECREMENT, payload: {} })} >Increment</button>
    </div>
  )
}
/****************************************** UseReducerIncrement01 END **************************************/

/****************************************** UseReducerIncrementDependsOnMultipleState **********************/

/*This is more powerful than using functional update pattern setCount(x => x +1)
  What if we have 2 state variables that depend on each other
  Effect doesn't depend on count or step so it won't rerun on rerender  

 */

const IncrementDependsOnMultipleStateInitialState = {
  count: 0,
  step: 1,
};

function IncrementDependsOnMultipleStateReducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

function UseReducerIncrementDependsOnMultipleState() {
  const [state, dispatch] = useReducer(IncrementDependsOnMultipleStateReducer, IncrementDependsOnMultipleStateInitialState);
  const { count, step } = state;
  const [start, setStart] = useState(false);

  console.log(`UseReducerIncrementDependsOnMultipleState main count: ${count} step: ${step}`);

  useEffect(() => {
    if (start) {
      console.log(`UseReducerIncrementDependsOnMultipleState useEffect count: ${count} step: ${step}`);
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [dispatch, start]);

  return (
    <div>
      count: {count}
      <button onClick={() => setStart(x => !x)}>Start, currently: {start.toString()}</button>
      <input type="number" value={step} onChange={e => dispatch({ type: 'step', step: Number(e.target.value) })} />
    </div>
  );
}

/****************************************** UseReducerIncrementDependsOnMultipleState END*******************/

/****************************************** UseReducerStateDependsOnProps **********************************/


/*What if state depends on props?  Define reducer inside component
*/
function UseReducerStateDependsOnPropsWrapper() {
  const [step, setStep] = useState(1);
  console.log(`UseReducerStateDependsOnPropsWrapper main step: ${step}`);
  return (
    <div>
      <UseReducerStateDependsOnProps step={step} />
      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />
    </div>
  );
}

function UseReducerStateDependsOnProps({ step }) {
  const [count, dispatch] = useReducer(reducer, 0);
  const [start, setStart] = useState(false);

  console.log(`UseReducerStateDependsOnProps main count: ${count} step: ${step}`)

  function reducer(state, action) {
    if (action.type === 'tick') {
      return state + step;
    } else {
      throw new Error();
    }
  }

  useEffect(() => {
    console.log(`UseReducerStateDependsOnProps main count: ${count} step: ${step}`);
    if (start) {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 3000);
      return () => clearInterval(id);
    }
  }, [dispatch, start]);

  return (
    <span>

      count: {count}
      <button onClick={() => setStart(x => !x)} >Start, currently: {start.toString()}</button>
    </span>
  );
}
/****************************************** UseReducerStateDependsOnProps END*******************************/

/****************************************** UseReducerFetchData ********************************************/

const fetchDataInitialState: IFetchDataState = { isLoading: false }

const FetchDataAction = {
  REQUEST: "REQUEST",
  DONE: "DONE",
  ERROR: "ERROR"
}

function fetchDataReducer(prevState: IFetchDataState, action: IAction): IFetchDataState {
  switch (action.type) {
    case FetchDataAction.REQUEST:
      return { ...prevState, isLoading: true }
    case FetchDataAction.DONE:
      return { ...prevState, isLoading: false, data: action.payload, error: undefined }
    case FetchDataAction.ERROR:
      return { ...prevState, isLoading: false, data: undefined, error: action.payload }
    default:
      return prevState;
  }
}

function UseReducerFetchData() {

  const [state, dispatch] = useReducer(fetchDataReducer, fetchDataInitialState);

  const getData = async (isGood: bool = true) => {
    try {
      dispatch({ type: FetchDataAction.REQUEST });
      let data;
      if (isGood) {
        data = await TaskDelay(500, { responseData: "Retrieved" });
      }
      else {
        data = await TaskDelay(500, { responseData: "Retrieved" }, false);
      }

      dispatch({ type: FetchDataAction.DONE, payload: data.responseData });
    } catch (error) {
      dispatch({ type: FetchDataAction.ERROR, payload: error });
    }
  }

  return (
    <div>
      {state.isLoading ? <div>...Loading</div> : <div>Loaded</div>}
      <button onClick={() => getData()}>Get Data</button>
      <button onClick={() => getData(false)}>Reject Data</button>
      <div>Data results: {state.data}</div>
      <div>Error: {state.error && state.error.message} </div>
    </div>
  )
}
/****************************************** UseReducerFetchData END ****************************************/

/****************************************** UseReducerFetchDataCustomHook **********************************/

//Custom hook should take in any initial data for useState or useReducer Hooks
//Inside your custom hook, you should have data source url which you can let user set and result data variable which you return
//Custom hook Should return the data results, isLoading, isError, and a function to set the data source url

function useCustomDataFetchHook(urlInitialState: string, fetchDataInitialState: IFetchDataState) {
  const [state, dispatch] = useReducer(fetchDataReducer, fetchDataInitialState);

  const getData = async (url: string, isGood: bool = true) => {
    try {
      dispatch({ type: FetchDataAction.REQUEST });
      let data;
      if (isGood) {
        data = await TaskDelay(500, { responseData: url });
      }
      else {
        data = await TaskDelay(500, { responseData: "Retrieved" }, false);
      }

      dispatch({ type: FetchDataAction.DONE, payload: data.responseData });
    } catch (error) {
      dispatch({ type: FetchDataAction.ERROR, payload: error });
    }
  }

  return [state, getData];
}

function UseReducerFetchDataCustomHook() {
  const [state, getData] = useCustomDataFetchHook("HTTP://RestApi.com/api/getData", fetchDataInitialState);
  const urlToUse = "HTTP://RestApi.com/api/getData1";

  return (
    <div>
      {state.isLoading ? <div>...Loading</div> : <div>Loaded</div>}
      <button onClick={() => getData(urlToUse)}>Get Data</button>
      <button onClick={() => getData(urlToUse, false)}>Reject Data</button>
      <div>Data results: {state.data}</div>
      <div>Error: {state.error && state.error.message} </div>
    </div>
  )
}

/** This version uses useEffect with a url */

function useCustomDataFetchHookUseEffect(urlInitialState: string, fetchDataInitialState: IFetchDataState) {
  const [url, setUrl] = useState(urlInitialState);
  const [state, dispatch] = useReducer(fetchDataReducer, fetchDataInitialState)

  const apiDataSource = async (url: string) => ({ url });

  useEffect(() => {
    let didCancel = false;
    const getData = async () => {
      try {
        dispatch({ type: FetchDataAction.REQUEST });
        const result = await apiDataSource(url);
        if (!didCancel) {
          dispatch({ type: FetchDataAction.DONE, payload: result.url });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FetchDataAction.ERROR, payload: error });
        }
      }
    };
    getData();
    return () => { didCancel = true; }
  }, [url])

  return [state, setUrl];
}

function UseReducerFetchDataCustomHookUseEffect() {
  const [state, setUrl] = useCustomDataFetchHookUseEffect("HTTP://RestApi.com/api/getData", fetchDataInitialState);
  const urlToUse = "HTTP://RestApi.com/api/getDataEffect";

  return (
    <div>
      {state.isLoading ? <div>...Loading</div> : <div>Loaded</div>}
      <button onClick={() => setUrl(urlToUse)}>Get Data</button>
      <button onClick={() => setUrl(urlToUse)}>Reject Data</button>
      <div>Data results: {state && state.data && state.data}</div>
      <div>Error: {state.error && state.error.message} </div>
    </div>
  )
}

/****************************************** UseReducerFetchDataCustomHook END ******************************/

/****************************************** UseReducerFormTodos ********************************************/
const FormTodoAction = {
  ADD: "ADD",
  TOGGLECROSS: "TOGGLECROSS"
}

interface ITodo {
  text: string;
  id: number;
  shouldBeCrossed: boolean
}

interface IFormTodoState extends IFetchDataState {
  data: {
    todos: ITodo[],
    todosCount: number
  }
}

const createTodoItem = (name: string): ITodo => ({ text: name, id: Date.now(), shouldBeCrossed: false });

function FormTodoReducer(prevState: IFormTodoState, action: IAction) {
  switch (action.type) {
    case FormTodoAction.ADD:
      return {
        ...prevState, data: {
          ...prevState.data, todosCount: prevState.data.todosCount++, todos: [...prevState.data.todos, createTodoItem(action.payload)]
        }
      }
    case FormTodoAction.TOGGLECROSS:
      return {
        ...prevState, data: {
          ...prevState.data, todos: prevState.data.todos.map((x) => x.id === action.payload ? { ...x, shouldBeCrossed: !x.shouldBeCrossed } : x)
        }
      }

    default:
      return prevState;
  }
}

const FormTodoStateDefaultValue: IFormTodoState = {
  data: {
    todos: [],
    todosCount: 0
  },
  isLoading: false,
  error: undefined
}

function UseReducerFormTodos() {

  const [text, setText] = useState<string>();
  const [state, dispatch] = useReducer(FormTodoReducer, FormTodoStateDefaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setText("");
    dispatch({ type: FormTodoAction.ADD, payload: text });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setText(e.target.value)} />
      </form>
      {state.data.todosCount}

      {/* inline */}
      {state.data.todos.map((x) => (
        <div key={x.id}
          onClick={() => { dispatch({ type: FormTodoAction.TOGGLECROSS, payload: x.id }) }}
          style={{ textDecoration: x.shouldBeCrossed ? "line-through" : "" }}
        >
          {x.text}
        </div>))}
      <br />
      {/* using a function */}
      {state.data.todos.map(x => <TodoItemJSX key={x.id} todoItem={x} dispatch={dispatch} />)}
    </div>
  )
}

function TodoItemJSX({ todoItem, dispatch }: { todoItem: ITodo, dispatch: (val: IAction) => void }) {
  return (
    <div
      onClick={() => { dispatch({ type: FormTodoAction.TOGGLECROSS, payload: todoItem.id }) }}
      style={{ textDecoration: todoItem.shouldBeCrossed ? "line-through" : "" }}
    >
      {todoItem.text}
    </div>
  );
}
/****************************************** UseReducerFormTodos END ****************************************/