import React from 'react';
import Car from './cars/RegularCar.jsx';


class Cars extends React.Component{
    render(){
        return(<section>
                { this.props.cars.map( (car,index) => <Car car={car} key={'CAR_'+index} />) }
            </section>
        )
    }
}

module.exports=Cars;
