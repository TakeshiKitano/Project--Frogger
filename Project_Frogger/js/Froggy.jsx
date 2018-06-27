import React from 'react';
import ReactDom from 'react-dom';


class Froggy extends React.Component {


   handleKeyPress = (e) => {
       if (typeof this.props.actionMove === 'function') {
            this.props.actionMove(e);
       }
    }
    render(){
       let style={
           left: this.props.frog.x+'px',
           bottom: this.props.frog.y+'px',
       }
        return<div id="Froggy" onKeyPress = {this.handleKeyPress} style={style} className={this.props.frog.alive?'alive':'dead'}/>
    }
}

module.exports=Froggy;