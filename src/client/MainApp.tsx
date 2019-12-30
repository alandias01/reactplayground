import React, { Component } from 'react';
import Tutorial from './Tutorial'

var mainAppStyle = {
    background: "#eee",
    padding: "20px",
    margin: "20px"
};

var buttonStyle = {
    margin: "5px 5px 5px 5px"
}

const MAINTEMPLATE = {
    PAGE: {
        MAINPAGE: "main-page",
        COUNTER: "tutorial-page",        
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
            case MAINTEMPLATE.PAGE.COUNTER:
                return <Tutorial />
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
            <div style={mainAppStyle}>
                Current Page: {this.state.currentPage}
                <br />
                <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.MAINPAGE)}>Main </button>
                <button style={buttonStyle} onClick={() => this.setCurrentPage(MAINTEMPLATE.PAGE.COUNTER)}>Current</button>
                {this.getPage()}
            </div>
        )
    }
}

export default MainApp
