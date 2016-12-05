
import React, {Component} from 'react';

// var counter = setInterval(timer, 1000);
//
// function timer(){
//     var ss = new Date().getSeconds();
//     var mm = new Date().getMinutes();
// }



class Timer extends Component{
    static defaultProps = {
        endTime: (new Date()).getTime() + 1000 * 60 * 5,
        secondsLeft:0

    };

    constructor(props){
        super(props);
        this.interval = null;

        this.state = {
            minutes:0,
            seconds:0,
            showTimer:this.props.secondsLeft > 0 ?  true:false,
            secondsLeft: this.props.secondsLeft
           // startTime: 0,
           // allTime: 0
        }
    }
    componentDidMount() {

        if (this.state.secondsLeft > 0) {

            this.tick();
            this.interval = setInterval(()=> {
                //const today = new Date();

               this.tick();


            }, 1000);
        }



    }
    componentDidUpdate(prevProps){
        if(prevProps.secondsLeft !== this.props.secondsLeft){
            if (this.props.secondsLeft > 0) {

                this.tick();
                this.setState({
                    secondsLeft: this.props.secondsLeft,
                    showTimer:true
                });
                if(!this.interval){
                    this.interval = setInterval(()=> {
                        //const today = new Date();

                        this.tick();


                    }, 1000);
                }
            }
        }
    }

    tick(){
        if(this.state.secondsLeft < 1){
            clearInterval(this.interval);
            this.setState({
                showTimer:false
            });
            this.props.handleTestFinish();
        }else{
            const secondsLeft = this.state.secondsLeft - 1;
            var duration = new Date(secondsLeft * 1000);
            this.setState({
                seconds: duration.getSeconds(),
                minutes: duration.getMinutes(),
                secondsLeft,
                showTimer:true
            })
        }
    }




    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { type, minutes, seconds, ...other } = this.props;


        if(this.state.showTimer && this.state.secondsLeft > 0){
            return (
                <div className="timer"
                >
                    <p>
                        Залишилось часу:
                    </p>

                    <p>
                        <span>00:</span>
                        <span key={'min'+this.state.minutes}>{this.state.minutes.toString().length == 1 ? '0' + this.state.minutes : this.state.minutes }:</span>
                        <span key={'sec'+this.state.seconds}>{this.state.seconds.toString().length == 1 ? '0' + this.state.seconds : this.state.seconds }</span>
                    </p>


                </div>
            )
        }
        else{
            return (
                <div className="timer runout"
                >

<p >Час скінчився!</p>

                </div>
            )
        }



    }

};

// Make ESLint happy again: add validation to props


export default Timer;



