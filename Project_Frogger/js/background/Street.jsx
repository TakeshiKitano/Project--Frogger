import React from 'react';
import Cars from './../Cars.jsx';
class Street extends React.Component{
    render(){
        return(
            <div className="Street">
                <div className="center">
                    <Cars cars={this.props.cars}/>
                </div>
            </div>
        )
    }
}

module.exports=Street;