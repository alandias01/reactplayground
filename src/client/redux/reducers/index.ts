import { combineReducers } from "redux";
import { greReducer } from "./greReducer";

export const rootReducer = combineReducers({ gre: greReducer });
