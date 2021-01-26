import React from "react";
import { UseStateHook } from './UseStateHook';
import { UseEffectHook } from './UseEffectHook';
import { UseContextHook } from './UseContextHook';
import { UseReducerHook } from './UseReducerHook';
import { UseRefHook } from "./UseRefHook";
import { UseMemoHook } from "./UseMemoHook";

//Base Component
export function ReactHooks() {
  return (
    <div>
      React Hooks
      <ul>
        <li>
          <UseMemoHook />
        </li>
        <li>
          <UseStateHook />
        </li>
        <li>
          <UseEffectHook />
        </li>
        <li>
          <UseContextHook />
        </li>
        <li>
          <UseReducerHook />
        </li>
        <li>
          <UseRefHook />
        </li>
      </ul>
    </div>
  )
}