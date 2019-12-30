import React, { Component } from 'react'

const LayoutContainerStyle = {
    margin: "10px 10px 10px 10px"
}
const LeftBarStyle = {
    color: "red"
}

const RightMainTopStyle = {
    color: "red"
}

const RightMainBottomStyle = {
    color: "red"
}





export class Layout01 extends Component {
    render() {
        return (    
            <div style = {LayoutContainerStyle}>
                <div style={LeftBarStyle}>
                    Layout
                </div>
                
            </div>
        )
    }
}

export default Layout01
