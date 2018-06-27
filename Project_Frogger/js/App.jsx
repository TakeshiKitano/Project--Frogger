import React from 'react';
import ReactDOM from 'react-dom';
import Froggy from './Froggy.jsx';
import Cars from './Cars.jsx';
import Reservation from './background/Reservation.jsx';
import Street from './background/Street.jsx';
import CatEyes from './background/CatEyes.jsx';




class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            frog: {
                x: document.getElementById('app').offsetWidth/2,
                y:0,
                alive: true,
                line: 0

            },
            streetMap: [
                [
                    {name: 'Tank', x:100, y:0, speed: 25, height: 75, width: 150, line: 6},
                    {name: 'Tank', x:600, y:0, speed: 25, height: 75, width: 150, line: 6},
                    {name: 'Tank', x:1000, y:0, speed: 25, height: 75, width: 150, line: 6},
                    {name: 'Tank', x:1300, y:0, speed: 25, height: 75, width: 150, line: 6}
                ],
                [
                    {name: 'RegularCar', x:200, y:30, speed: 35, height: 75 , width: 75, line: 5},
                    {name: 'RegularCar', x:500, y:30, speed: 35, height: 75 , width: 75, line: 5},
                    {name: 'RegularCar', x:1000, y:30, speed: 35, height: 75 , width: 75, line: 5},
                    {name: 'RegularCar', x:1600, y:30, speed: 35, height: 75 , width: 75, line: 5},
                    {name: 'RegularCar', x:1800, y:30, speed: 35, height: 75 , width: 75, line: 5}
                ],
                [
                    {name: 'RacingCar', x:190, y:30, speed: 100, height: 75 , width: 75, line: 4},
                    {name: 'RacingCar', x:600, y:30, speed: 100, height: 75 , width: 75, line: 4},
                    {name: 'RacingCar', x:900, y:30, speed: 100, height: 75 , width: 75, line: 4},
                    {name: 'RacingCar', x:1300, y:30, speed: 100, height: 75 , width: 75, line: 4},
                    {name: 'RacingCar', x:1800, y:30, speed: 100, height: 75 , width: 75, line: 4},
                    {name: 'RacingCar', x:2000, y:30, speed: 100, height: 75 , width: 75, line: 4},
                ],
                [
                    {name: 'Lorry', x:500, y:-10, speed: 30, height: 75, width: 150, line: 3},
                    {name: 'Lorry', x:1000, y:-10, speed: 30, height: 75, width: 150, line: 3},
                    {name: 'Lorry', x:1600, y:-10, speed: 30, height: 75, width: 150, line: 3},
                    {name: 'Lorry', x:1300, y:-10, speed: 30, height: 75, width: 150, line: 3}
                ],
                [
                    {name: 'Dozer', x:10, y:0, speed: 15, height: 100 , width: 100, line: 2},
                    {name: 'Dozer', x:500, y:0, speed: 15, height: 100 , width: 100, line: 2},
                    {name: 'Dozer', x:1300, y:0, speed: 15, height: 100 , width: 100, line: 2}
                ],
                [
                    {name: 'PoliceCar', x:400, y:30, speed: 80, height: 75 , width: 75, line: 1},
                    {name: 'PoliceCar', x:830, y:30, speed: 80, height: 75 , width: 75, line: 1},
                    {name: 'PoliceCar', x:1200, y:30, speed: 80, height: 75 , width: 75, line: 1},
                    {name: 'PoliceCar', x:1600, y:30, speed: 80, height: 75 , width: 75, line: 1},
                    {name: 'PoliceCar', x:1900, y:30, speed: 80, height: 75 , width: 75, line: 1},
                ]

            ]
        }
    }


    moveCar = (car) => {
        car.x = car.x + car.speed;
        if(car.x > document.getElementById('app').offsetWidth){
            car.x = 0;
        }
        return car;
    }


    moveFrog = (e) => {
        if(this.state.frog.alive){
            if (e.keyCode == 37){
                this.state.frog.x-=50  // wieksza grywalność ?
            }
            else if (e.keyCode == 38){
                this.state.frog.y+=110
                this.state.frog.line+=1;
            }
            else if (e.keyCode == 39){
                this.state.frog.x+=50
            }
            else if (e.keyCode == 40){
                this.state.frog.y-=110
                this.state.frog.line-=1;
            }
            if (this.state.frog.y > document.getElementById('app').offsetHeight) {
                this.state.frog.y = 0
            }
            this.setState({
                frog: this.state.frog
            })
        }
    }


    isDead = (car) => {
        let frog = this.state.frog;

        let frogPos = [
            [frog.x, frog.y],
            [frog.x + 50, frog.y],
            [frog.x + 50, frog.y -50],
            [frog.x, frog.y - 50],
            [frog.x+25, frog.y+25]
        ];

        let carPos = [
            [car.x, car.x+car.width],
            [car.y, car.y + car.height]
        ];


        for (let i = 0; i < frogPos.length; i++){

                if (frogPos[i][0] >= carPos[0][0] &&
                    frogPos[i][0] <= carPos[0][1] &&
                    frog.line == car.line
                ){
                    frog.alive = false;
                    this.setState({frog});
                    break;
                }
        }
    }




    componentDidMount(){
        let frog = this.state.frog;

        this.setState({frog});
        document.addEventListener('keydown', e => {
            this.moveFrog(e);
        });


        this.carInterval = setInterval( () =>{

            let newCarPositions = this.state.streetMap.map( street => street.map( car => {
                let newCar = this.moveCar(car);
                this.isDead(newCar);
                return newCar;
            } ) );

            this.setState({
                streetMap: newCarPositions
            }, () => {
                if(this.state.frog.alive == false) clearInterval(this.carInterval);
            })
        }, 300);
    }





    componentWillUnmount(){
        clearInterval(this.carInterval);
    }




    render(){
        let gameOver = null;

        let frogWins = null;

        if (this.state.frog.line > this.state.streetMap.length ) frogWins = <h1 className="frogWins">FROG WINS !!!</h1>;

        if(this.state.frog.alive == false) gameOver = <h1 className="gameOver">Game over</h1>;

        return(
            <section>
                {gameOver}
                {frogWins}
                <Reservation/>
                <CatEyes/>
                {this.state.streetMap.map( (street, index) => <div key={index}>
                                                        <Street cars={street}/>
                                                        <CatEyes/>
                                                    </div>
                )}
                                <Froggy actionMove={this.moveFrog} frog={this.state.frog}/>
                <Reservation/>
            </section>

        )

    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});