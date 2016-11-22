import React, {Component, PropTypes} from 'react';

import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import { TableRow, TableRowColumn} from 'material-ui/Table';

const green = {
    color: 'green'
};
const red = {
    color: 'red'
};
const buttonStyle ={
    margin: '0px 2px'
}

const CheckIcon = () => (<Check style={green}></Check>);
const CloseIcon = () => (<Close style={red}></Close>);


export default class Row extends Component {
    static propTypes = {

        currentTest:PropTypes.number,
        // data:PropTypes.array
    };
    static defaultProps = {
    };

    render() {
        const {user:{name,uid,profileComplete}, tests} = this.props.row;
        const currentTest = tests.find(test => test.testId === this.props.selectedTest);

        
        return (
             
                    <TableRow>
                        <TableRowColumn><span> {name || uid}</span></TableRowColumn>
                 
                        <TableRowColumn className="progress">
                            <ol>
                                {
                                    tests.length > 0 && currentTest &&  currentTest.answers && currentTest.answers.map((answer,id) =>(

                                            <li
                                                //style={{width:(100 / (currentTest.answers.length) )+'%'}}
                                                key={`${answer}_${id}`} className={ answer === true ? 'correct' : ( answer === false ? 'incorrect' : '') }>
                                                {
                                                    (answer === true ) && (
                                                        <div className="fader" key={answer}>
                                                            <CheckIcon></CheckIcon>
                                                        </div>



                                                    )
                                                }   {
                                                (answer === false ) && (
                                                    <div className="fader" key={answer}>
                                                        <CloseIcon></CloseIcon>
                                                        </div>

                                                )
                                            } {
                                                (answer === null ) && (
                                                    <div className="fader" key={answer}>
                                                    <div className="mock-icon"></div>
                                                    </div>
                                                )
                                            }

                                            </li>
                                        )
                                    )
                                }
                            </ol>


                        </TableRowColumn>
                    </TableRow>
                )

        
    }
}