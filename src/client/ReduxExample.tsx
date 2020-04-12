import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWords, deleteWords, IWord } from './redux/actions/greActions';


interface IReduxExampleProps {
    words: IWord[];
    getWords: () => void;
    deleteWords: (words: IWord[]) => void;
}

class ReduxExamplec extends Component<IReduxExampleProps> {
    constructor(props: any) {
        super(props);
        console.log("ctor ran");
    }

    test = () => {
        this.props.getWords();
    }

    render() {

        let data = <ul> {this.props.words.length > 0 && this.props.words.map(x => <li>{x.word}</li>)}</ul>;

        return (
            <div>
                <button onClick={this.test} >Test</button>
                {this.props.words.length > 0 && this.props.words[0].word}
                {data}


            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        words: state.gre.words
    }
};

const mapDispatchToProps = {
    getWords,
    deleteWords
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExamplec)
