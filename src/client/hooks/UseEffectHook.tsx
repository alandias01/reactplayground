import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import { TaskDelay } from "../../util/util";

export function UseEffectHook() {
  return (
    <div>
      UseEffectHook
      <br /><br />
      UseEffectTimingOfExecution01
      <UseEffectTimingOfExecution01 />
      <br /><br />

      UseEffectTimingOfExecution02
      <UseEffectTimingOfExecution02 />
      <br /><br />

      <UseEffectHookExecutionOrder />

      UseEffectFetchData
      <UseEffectFetchData />
      <br /><br />

      UseEffectRemoveDependency
      <UseEffectRemoveDependency />
      <br /><br />

      UseEffectCleanupOrder
      <UseEffectCleanupOrder />
      <br /><br />
    </div>
  )
}

/*
  useEffect will run after render is committed to the screen
  First a render happens, then the render has to be shown on the screen through layout and paint, which is
  referred to as being committed to screen

  If props or state changes, component will rerender and useEffect will run again
  To prevent useEffect from running again on rerender, you can pass a second argument to useEffect which is 
  the dependency array.
  The dependency array usually has props or state that is being used inside the effect
  It checks if the values have changed.
  Conceptually every value in the effect should be in the dependency array
  If you pass an empty array, you are telling the effect to not run on update  
  If you pass [] into dependency array, effect only runs once.
  React can't see inside functions.  Thats why we give dependency array so react can compare them

  Don't always have the mental model of "I wan't it to run once so put an empty dependency array"





  Situations
  If you have a state value in your effect and you don't want to run on rerender, you may end up writing 
  an if statement. There are better ways to handle this
  Say you have a state var called count and you want to show alert in beginning only once but you want to 
  increment this value but not have the alert run again, you can extract that logic out into a function and 
  just call that function

  instead of
  useEffect(() => alert(count), []);

  you can
  const initDisplayCount = ()=> alert(count);
  useEffect(() => initDisplayCount(), []);

  The entire point of the dependency array is to give you a way to tell React 
  “Hey, one of my variables changed! Re-create that closure!”


  How it runs
  React will hold the prev effect callback in memory
  The previous effect callback will have its cleanup function called and a new callback will be created 
  with the new dependency values

  Closures
  useeffect uses closures which captures the value when effect gets created.
  So if you use a const inside an effect and then there is a state update, the effect is using the const before 
  it was changed
  The nature of closure is to keep knowledge of what the closed-over values were when the closure was created  
  called "capturing".
  If you want the current value instead of the captured one, use mutable ref.

  Each render has its own props, state, effects, and event handlers
  The state values aren't really data bound.  
  They have different values on every render if they were changed
  They don't change while in a render
  You don't have to save props or state variables to a const in function components since they 
  don't change inside a render

  useLayoutEffect
  useEffect runs after render is committed to the screen.
  useLayoutEffect runs after render.
  Order: Render, useLayoutEffect runs synchronously, then final render is committed to screen
  This blocks painting but sometimes you don't want to see a flicker so use this.
  Similar to how componentDidMount works

  componentDidMount notes
  componentDidMount doesn't have closure over state so it just reads whatever the current value is.
  ComponentDidMount will run after the first render and paint if the update is async.
  If you set the state by just giving it a hard value synchronously, not IO , then react is smart enough to 
  not commmit the first render to screen.
  It will use the second render as the initial UI and commit that to screen. This prevents a flicker on the screen 
  This pre optimized approach is for synchronous updates which we usually don't do because we're doing asynchronous 
  network calls and then setting state after the paint to the screen.
  The problem is if we have synchronous update code which is cpu intensive, it will block painting the screen
    
  
  useEffect(()=>{
      // ... Do something.  This runs on mount and update
      return ()=>{};    This is on unmount for cleanup
  });
  

  useEffect(()=>{
      // ... Do something.
      return ()=>{};  cleanup
  },[countVariable]);

  

  To prevent the component from rerendering, use React.Memo(()=>{}, (prevProps,nextProps)=>{});
*/

/****************************************** UseEffectTimingOfExecution *************************************/

/*In n seconds after task delay, alert displays 0.  Even if you click the button and increment 
  the value, useeffect uses closures which captures the value when effect gets created, which at render was 0 
  */
function UseEffectTimingOfExecution01() {
  const [count, setCount] = useState(0);
  const [activateUseEffect, setActivateUseEffect] = useState(false);

  useEffect(() => {
    if (activateUseEffect) {
      TaskDelay(2000, {}).then(() => { alert("UseEffectTimingOfExecution count: " + count); });
    }
  }, [activateUseEffect]);
  return (
    <div>
      <button onClick={() => setActivateUseEffect(x => !x)}>Alert Currently:{activateUseEffect.toString()}</button>
      <button onClick={() => setCount(count + 1)}>Increment count: {count}</button>
    </div>
  )
}


function UseEffectTimingOfExecution02() {
  const [ct, setCt] = useState(0);

  const handleClick = () => {
    setTimeout(() => alert(ct), 2000);
  }

  return (
    <div>
      Count: {ct} <br />
      <button onClick={() => setCt(x => x + 1)}>Increment</button>
      <button onClick={handleClick} >Start timeout </button>
    </div>
  )
}

/****************************************** UseEffectHookExecutionOrder ************************************/

function UseEffectHookExecutionOrder() {
  useEffect(() => {
    console.log('useEffect')
    return () => console.log('useEffect cleanup')
  })

  window.requestAnimationFrame(() => console.log('requestAnimationFrame'))

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    return () => console.log('useLayoutEffect cleanup')
  })
  return (
    <div>

    </div>
  )
}
/****************************************** UseEffectHookExecutionOrder END*********************************/

/****************************************** UseEffectRemoveDependency **************************************/

/*We use the functional updater form to remove the dependency "count" since react knows 
  about the state value.  
  Objective is to send react what you want changed.  Sending what you want changed vs the state variable 
  is less data.
  Hint: There is a better way to solve this using reducers. Decoupling Updates from Actions
  UseReducer is able to remove the "step" dependency
*/
function UseEffectRemoveDependency() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [start, setStart] = useState(false);
  console.log("UseEffectHookTiming4 main count: " + count)

  /* If you use this, effect will run on every rerender, which happens every second
     This works but the cleanup will run every second also
  useEffect(() => {
    console.log("UseEffectHookTiming4 useEffect count: " + count)
    const id = setInterval(() => setCount(count + step), 1000);
    return () => clearInterval(id);
  }, [count, step]);
  */

  //Function will rerender every second but effect won't
  useEffect(() => {

    if (start) {
      console.log("UseEffectRemoveDependency useEffect count: " + count)
      const id = setInterval(() => setCount(c => c + step), 1000);
      return () => clearInterval(id);
    }

  }, [step, start]);

  return (
    <div>
      count: {count}
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
      <button onClick={() => setStart(x => !x)} >Start stop: currently: {start.toString()}</button>
    </div>
  );
}

/****************************************** UseEffectRemoveDependency END **********************************/



/****************************************** UseEffectCleanupOrder ******************************************/

/*React runs the effect for count 0
  In this render it runs the effect callback using count:0
  The cleanup function is held in memory with count:0 bc of closures
  Increment
  React rerenders and commits to screen with count:1
  cleanup from previous render runs. Remember it had count:0 (Cleanup only runs after render and paint!)
  react runs effect callback with count:1
  Proof is layout effect will print 1 before cleanup will print 0
 */
function UseEffectCleanupOrder() {

  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('UseEffectCleanupOrder starteffect count: ' + count);
    return () => console.log('UseEffectCleanupOrder cleanup count: ' + count);
  })

  useLayoutEffect(() => {
    console.log("LayoutEffect count: " + count);
  })

  return (
    <div>
      <button onClick={() => setCount(x => x + 1)}>Increment</button>
    </div>
  )
}


/****************************************** UseEffectCleanupOrder END **************************************/


/****************************************** UseEffectFetchData *********************************************/

interface IDataFetchingEffectData {
  hits: { objectID: number, url: string, title: string }[]
}

function UseEffectFetchData() {
  const baseUrl = "http://hn.algolia.com/api/v1/search?query=";
  const dummyData: IDataFetchingEffectData = { hits: [{ objectID: 1, url: "a@a.com", title: "title1" }] };

  const [data, setData] = useState<IDataFetchingEffectData>({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(baseUrl + 'redux',);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      setIsError(false);
      setIsLoading(true);

      try {
        //const result = await fetch(url);
        //const resultJson = await result.json();
        const resultJson = await TaskDelay<IDataFetchingEffectData>(500, dummyData);//simulate getting the data from the url

        setData(resultJson);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
      <button type="button" onClick={() => setUrl(`${baseUrl}${query}`)} >Run</button>

      {isError && <div>Something went wrong</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
/****************************************** UseEffectFetchData END *****************************************/