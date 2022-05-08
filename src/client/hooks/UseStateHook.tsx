import React, { useState, useEffect } from "react";
import { TaskDelay } from "../../util/util";

export function UseStateHook() {
  return (
    <div>
      UseStateHook
      <br /><br />
      UseStateAgeIncreases
      <UseStateAgeIncreases />
      <br />
    </div>
  )
}

/****************************************** UseStateAgeIncreases *******************************************/

//Shows basic useState with child that uses useEffect
function UseStateAgeIncreases() {
  const [age, setAge] = useState<number>(0);
  const handleClick = () => setAge(x => x + 1);

  return (
    <div>
      I am {age} years old
      <button onClick={handleClick}>Increase age</button>
      <UseEffectSubComponent age={age} />
    </div>
  );
}

//**************************** UseEffectSubComponent
interface IMyEffProps {
  age: number;
}

function UseEffectSubComponent(props: IMyEffProps) {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    setCount(x => x + 1);
  }, [props.age]);

  return (
    <div>
      Age:{props.age}
      Count: {count}
    </div>
  );
}

/****************************************** UseStateAgeIncreases END ***************************************/

/****************************************** UseStateFunctionUpdater ****************************************/

/*We have a dispatch method to update count after an async delay
  If we press "click" multiple times quickly before the delay is over, react will capture the current
  count variable since we haven't rerendered yet so the console will log "1" as many times as you 
  clicked before the delay
 */
export function UseStateFunctionUpdater() {
  const [count, setCount] = useState(0);
  console.log("count: " + count);

  const handleClickWrong = async () => {
    await TaskDelay(1000);
    setCount(count + 1);
  }

  const handleClickCorrect = async () => {
    await TaskDelay(1000);
    setCount(x => x + 1);
  }

  return (
    <div>
      <button onClick={handleClickWrong}>UseState01 click wrong</button>
      <button onClick={handleClickCorrect}>UseState01 click correct</button>
    </div>
  )
}
/****************************************** UseStateFunctionUpdater END ************************************/