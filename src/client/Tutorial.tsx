import React, { Component, PureComponent } from 'react'

/** LIFE CYCLE METHODS
 * MOUNTING: constructor, getDerivedStateFromProps, render, (DOM UPDATES), componentDidMount
 * UPDATING: getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, (DOM UPDATES), componentDidUpdate 
 * UNMOUNTING componentWillUnmount 
 * 
 */

interface ITutorialProps { }
interface ITutorialState {
    nm: string;
    textInput: string;
    label: string;
}

export class Tutorial extends Component<ITutorialProps, ITutorialState> {
    num: number = 0;    //public by default
    name: string;    //must specify if you want private
    timerID: any;

    /* You can initializing local state by assigning an object to this.state.  Don't call setState()
    Don't set initial value in componentDidmount or it will rerender
    Constructor is the only place where you should assign this.state directly. 
    In all other methods, you need to use this.setState() instead.
    If you don't initialize state or bind methods, then you don't need constructor
    constructor is called before mounting
    Must call super(props) or this.props will be unavailable in constructor
    Avoid copying props into state! Ex. this.state = { color: props.color };
    updates to the prop won’t be reflected in the state
    */
    constructor(props: any) {
        super(props);
        this.name = "alan";

        this.state = {
            nm: this.name,
            textInput: "",
            label: ""
        };
    }

    /*  this.state.comment = 'Hello'; //Don't do this!! This will not re-render a component
       State Updates May Be Asynchronous
       this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.
       
       Correct Version
       The function will receive the previous state as the first argument, 
       and the props at the time the update is applied as the second argument:
       this.setState((state, props) => ({counter: state.counter + props.increment })); 

       React merges the object you provide into the current state.
    */
    /** Runs after the component output has been rendered to the DOM (inserted into the tree)
     * Initialization that requires DOM nodes should go here. 
     * You can also load data from a remote endpoint, make subscriptions, 
     * You can also call setstate() even though initialization should be in ctor if you need info
     * on a DOM node like the size of a control
     */
    componentDidMount() {
    }

    /** Called before rendering when new props or state are being received
     * Not called for the initial render or when forceUpdate() is used
     */
    shouldComponentUpdate = (nextProps: any, nextState: any) => true;

    /* Called right before the most recently rendered output is committed to the DOM
     * You can capture some information from the DOM like the scroll position before 
     * it is potentially changed.  If you return a value, it is passed to
     * componentDidUpdate(_,_, snapshot) the arg snapshot
     * This use case is not common, but it may occur in UIs like a chat thread that need to 
     * handle scroll position in a special way.
     */
    getSnapshotBeforeUpdate = (prevProps: any, prevState: any) => { return 7; }

    /** Called immediately after updating occurs. Not called for the initial render.
     * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
     * good place to do network requests as long as you compare the current props to previous props
     *  (e.g. a network request may not be necessary if the props have not changed).
     * You may call setState() immediately here but note that it must be wrapped 
     * in a condition like in the example above, or you’ll cause an infinite loop
     * This wont run if shouldComponentUpdate() returns False
     */
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) { }

    // Invoked immediately before a component is unmounted and destroyed
    //Kill timers, unsubscribe, cancel network requests, etc...
    //Don't call setState()
    componentWillUnmount() { }

    //2 methods, when text changes, variable textInput updates.  When button is pressed
    handleClick = () => this.setState({ label: this.state.textInput });
    handleChange = (e: any) => this.setState({ textInput: e.target.value }); //Calling this.handleChange magically passes the event

    //This is for lifted state
    handleLiftedState = (data: string) => console.log(data);

    /* When state or props change, render is triggered, regardless of if the state or props is used
     * All children rerender regardless of if they are passed values.  More notes below on how to manage this
     * Rerendering and a DOM update are not the same thing. Render creates the Virtual DOM, then diffing algo
     * compares virtual dom with real dom and makes changes.  Improves speed on screen but not for rerenders
     * To limit rerendering, implement shouldComponentUpdate but its better to write code that doesn't constantly 
     * update the field
     */
    render() {
        const { label } = this.state;

        return (
            <div>
                Tutorial<br />

                <button onClick={this.handleClick} >Get Value</button>
                <input type="text" onChange={this.handleChange}></input>
                <div>{label}</div>

                <Clock />

                <TutorialSubComponent name={"From Parent"} myClick={this.handleLiftedState} />
            </div>
        )
    }
}

/* ? in interface means when using the component, the field is not required * 
 * This sub component shows how to use props and lift state up
 */
interface ITutorialSubComponentProps {
    name?: string,
    myClick?: (data: string) => void;
}

class TutorialSubComponent extends PureComponent<ITutorialSubComponentProps> {
    data: string = "data";

    onMyClick = () => this.props.myClick && this.props.myClick(this.data);

    render() {
        return (<div><br />
            Sub Component, this.props.name: {this.props.name}
            <br />
            <button onClick={this.onMyClick}>Lift state up</button>
        </div>);
    }
}

//This clock will have render() fire every second.  A rerender makes all children rerender
interface IClockProps { }
interface IClockState { date: Date; }
class Clock extends Component<IClockProps, IClockState> {
    myTimer: any;

    constructor(props: any) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount = () => this.myTimer = setInterval(this.tick, 1000);
    componentWillUnmount = () => clearInterval(this.myTimer);
    tick = () => this.setState({ date: new Date() });
    render = () => {
        return (
            <div>Clock:{this.state.date.toLocaleTimeString()} <ClockSubClassToTestRenderingOfSubComponents /> </div>)
    }
}

//When parent rerenders, all children rerender.  
//If your child doesn't use any props from parent, change to pure component.  
//Making this a pure component uses a default implementation of shouldComponentUpdate() which does 
//a shallow check of any props to see if changes were made before rerendering
//If we just use component, then this rerenders every second
//If you do use props but the field you use doesn't change,
//implement shouldComponentUpdate() { }
class ClockSubClassToTestRenderingOfSubComponents extends PureComponent {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Tutorial

// map, reduce, filter, etc...
