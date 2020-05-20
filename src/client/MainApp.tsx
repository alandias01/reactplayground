import React, { Component } from 'react';
import ReactBasics from './ReactBasics'
import Layout01 from './layouts/Layout01'
import ReduxExample from './ReduxExample';

var mainAppStyle = {
    background: "#eee",
    padding: "20px",
    margin: "0px 0px 0px 0px"
};

var buttonStyle = {
    margin: "5px 5px 5px 5px"
}

const MAINTEMPLATE = {
    PAGE: {
        MAINPAGE: "main-page",
        REACTBASICS: "react-basics",
        LAYOUT01: "Layout01",
        REDUXEXAMPLE: "REDUXEXAMPLE"
    }
};

interface IMainAppProps {
}

interface IMainAppState {
    currentPage: string;
}

export class MainApp extends Component<IMainAppProps, IMainAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentPage: MAINTEMPLATE.PAGE.MAINPAGE
        };
    }

    getPage = () => {
        switch (this.state.currentPage) {
            case MAINTEMPLATE.PAGE.MAINPAGE:
                return <div>Main Page</div>

            case MAINTEMPLATE.PAGE.REACTBASICS:
                return <ReactBasics />

            case MAINTEMPLATE.PAGE.LAYOUT01:
                return <Layout01 />
            case MAINTEMPLATE.PAGE.REDUXEXAMPLE:
                return <ReduxExample />

            default:
                break;
        }
    }

    setCurrentPage = (page: string) => {
        this.setState({
            currentPage: page
        });
    }

    render() {
        return (
            <div>
                <div >
                    Current Page: {this.state.currentPage}
                    <br />
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.MAINPAGE)}>Main </button>
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.REACTBASICS)}>React Basics</button>
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.LAYOUT01)}>Layout01</button>
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.REDUXEXAMPLE)}>Redux Example</button>
                </div>
                {this.getPage()}
            </div>
        )
    }
}

export default MainApp
