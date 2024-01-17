import React, { useState, useEffect, useReducer, useMemo, useCallback } from "react";

export function HooksPractice() {
  return (
    <div>
      <Parent />
      <br />
      <TwoDependantStateVariables />
      <br />
      <StateDependsOnProps />
      <br />
      <FetchData />
    </div>
  )
}
/*************************************** Optimizing rerenders **************************/
/* Steps
Create a parent with a child component.
Child should log "child is rendering"
In parent, display a counter and a button to increment it

1. When button increments counter, child should rerender
2. When incrementing, child shouldn't rerender
3. Pass counter to child, should rerender
4. Parent, Create text field to update text.  Child should not rerender bc you Memoized func 
5. Pass setCounter to child to be able to increment from child
6. Typing in parent textfield will rerender child bc of passed setcounter func.  Prevent rerender with useCallback
7. Child, create for loop to increment a number to 5million to display.  Loop is before log
8. Child, Memoize the loop to reduce time to rerender
9.Parent, create arr = [1,2,3] and pass to child.  Prevent child rerender (useMemo) 
*/
const Parent = () => {
  const [counter, setCounter] = useState(0);
  const [txt, setTxt] = useState("");

  const updateCallback = useCallback(() => setCounter(counter + 1), [counter]);
  const arr = [1, 2, 3];

  return (
    <div>
      Prac {counter}
      <button onClick={() => setCounter(counter + 1)} >Increment</button>
      <input type="text" onChange={(e) => setTxt(e.target.value)} />
      {txt}
      <Child counter={counter} updatecounter={updateCallback} arr={arr} />
    </div>);
}


interface IChildProps {
  counter: number;

}

function Child(counter: number, updatecounter: () => void, arr: number[]) {
  // let loopCtr = 0;
  // for (let i = 0; i < 500_000_000; i++) loopCtr++;

  const loopCtr = useMemo(() => {
    let loopCtrLocal = 0;
    for (let i = 0; i < 500_000_000; i++) loopCtrLocal++;
    return loopCtrLocal;
  }, [])

  console.log("child is rendering");

  return (
    <div>Child {counter}
      Loop ctr {loopCtr}
      <button onClick={updatecounter}>Update</button>
    </div>
  )

};

// , (a, b) => JSON.stringify(a) === JSON.stringify(b)

/*************************************** Optimizing rerenders END **********************/

/*************************************** TwoDependantStateVariablesReducer *************/


interface IAction {
  type: string;
  payload?: any;
}

interface ITwoDependantStateVariables {
  counter: number;
  step: number;
}
const TwoDependantStateVariablesReducer = (prevState: ITwoDependantStateVariables, action: IAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...prevState, counter: prevState.counter + 1 }

    default:
      return prevState;
  }
}

const TwoDependantStateVariablesInitState: ITwoDependantStateVariables = {
  counter: 0,
  step: 1
}

function TwoDependantStateVariables() {
  const [state, dispatch] = useReducer(TwoDependantStateVariablesReducer, TwoDependantStateVariablesInitState);
  const { counter, step } = state;
  useEffect(() => {
    dispatch({ type: "INCREMENT" });
  }, [])

  return (
    <div>
      Counter: {counter} Step: {step}
      <button onClick={() => dispatch({ type: "INCREMENT" })} >Inc</button>
    </div>
  )
}
/*************************************** StateDependsOnProps ***************************/
const StateDependsOnProps = () => (<StateDependsOnPropsChild step={4} />);

function StateDependsOnPropsChild({ step }: { step: number }) {
  const StateDependsOnPropsReducer = (prevState: { counter: number }, action: IAction) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...prevState, counter: prevState.counter + step }

      default:
        return prevState;
    }
  }

  const [state, dispatch] = useReducer(StateDependsOnPropsReducer, { counter: 1 });

  return (
    <div>
      StateDependsOnProps: counter:{state.counter} step: {step}
      <button onClick={() => dispatch({ type: "INCREMENT" })} >INC</button>

    </div>
  )
}
/*************************************** StateDependsOnProps END ***********************/

/*************************************** FetchData *************************************/
const getFromSource = (url: string) => new Promise((res, rej) => setTimeout(() => res({ id: 1, name: "Alan", url }), 1000));

const FetchDataAction = {
  REQUEST: "request",
  DONE: "done",
  ERROR: "error"
}

interface IFetchDataState {
  isLoading: boolean;
  error: Error | undefined;
  data: { id: number, name: string, url: string };
}

const FetchDataReducer = (prevState: IFetchDataState, action: IAction): IFetchDataState => {
  switch (action.type) {
    case FetchDataAction.REQUEST:
      return { ...prevState, isLoading: true, error: undefined }
    case FetchDataAction.DONE:
      return { ...prevState, isLoading: false, error: undefined, data: action.payload }
    case FetchDataAction.ERROR:
      return { ...prevState, isLoading: false, error: action.payload }
    default:
      return prevState;
  }
}

function FetchData() {
  const [state, dispatch] = useReducer(FetchDataReducer, { isLoading: false, error: undefined, data: { id: undefined, name: undefined, url: undefined } });
  const { isLoading, error, data } = state;
  const { id, name, url } = data;

  const getData = async (url: string) => {
    dispatch({ type: FetchDataAction.REQUEST });
    try {
      const result = await getFromSource(url);
      dispatch({ type: FetchDataAction.DONE, payload: result });
    } catch (error) {
      dispatch({ type: FetchDataAction.ERROR, payload: error });
    }
  }

  return (
    <div>
      FetchData
      <button onClick={() => getData("http://yahoo.com")} >Get Data</button>
      {isLoading && <div>...Loading </div>}
      <br />
      id: {id}
      <br />
      name: {name}
      <br />
      url: {url}
    </div>
  );
}
/*************************************** FetchData END *********************************/