import React from 'react';

class Car extends React.Component{
    render(){
        let style={
            left: this.props.car.x+'px',
            top: this.props.car.y+'px'
        }
        return <div className={this.props.car.name} style={style}/>
    }
}


module.exports=Car;