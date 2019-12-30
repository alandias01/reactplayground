import React, { Component } from 'react';
import Tutorial from './Tutorial'
import Layout01 from './layouts/Layout01'

var mainAppStyle = {
    background: "#eee",
    padding: "20px",
    margin: "0px 0px 10px 0px"
};

var buttonStyle = {
    margin: "5px 5px 5px 5px"
}

const MAINTEMPLATE = {
    PAGE: {
        MAINPAGE: "main-page",
        TUTORIAL: "tutorial-page",
        LAYOUT01: "Layout01"
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
                break;
            case MAINTEMPLATE.PAGE.TUTORIAL:
                return <Tutorial />
                break;
            case MAINTEMPLATE.PAGE.LAYOUT01:
                return <Layout01 />
                break;
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
                <div style={mainAppStyle}>
                    Current Page: {this.state.currentPage}
                    <br />
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.MAINPAGE)}>Main </button>
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.TUTORIAL)}>Tutorial</button>
                    <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.LAYOUT01)}>Layout01</button>
                </div>
                {this.getPage()}
            </div>
        )
    }
}

export default MainApp
