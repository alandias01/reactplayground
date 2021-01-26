import React, { useState, useEffect, useRef } from "react";
import { TaskDelay } from "../../util/util";

export function UseRefHook() {
  return (
    <div>
      UseRefHook
      <br /><br />
      UseRefFetchData
      <UseRefElementReference />
      <br />
    </div>
  )
}

//holds a ref to the input element and 
function UseRefElementReference() {

  const elemRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {

    elemRef.current && elemRef.current.focus();
  }


  return (
    <div>
      <input type="text" ref={elemRef} />
      <button onClick={handleClick}>Set focus on Input Element</button>
      <br />
    </div>
  )
}





