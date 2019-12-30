import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import MainApp from './client/MainApp'

ReactDOM.render(<MainApp />, document.getElementById('root'));

/**
|--------------------------------------------------
|ReactDOM.render(<h1>test</h1>
    render takes reat elements
    JSX converts down to React.createElement
    JSX looks like HTML. <h1>test</h1> 
    You can embed a JS Espression inside JSX by surrounding it with {} 
    const name = 'Alan';
    const Elem = <h1>Hello, {name}</h1>;
    
    When you write a react class, it is a component
    Also, A JS function can define a component
    A Component is a blueprint.  An element is an instance of the component
    so when you use the component inside of JSX, it is an element

|--------------------------------------------------
*/

// const name = 'Alan';
// const Elem = <h1>Hello, {name}</h1>; //.render(Elem

//let Elem = () => <h1>Arrow Func {"hi"}{name}</h1>    //.render(<Elem/>

//ReactDOM.render(<h1>test</h1>, document.getElementById('root'));

/* importing

FYI, a module can at most have 1 default export

import * as abc from './pathToLibrary'  -> imports all exported items and puts under abc
import abc from './pathToLibrary' -> the file has a default export and you give it a name of abc
import {abc, def} from './pathToLibrary' ->the file has items abc and def as exports
import * as abc from './pathToLibrary'

import './index.css';  Importing CSS 


*/
/* SHORTCUTS



*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
