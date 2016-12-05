import React, {Component, PropTypes} from 'react';


import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';


const buttonStyle = {
    margin: '0px 2px'
};

export default class Header extends Component {
    static propTypes = {
        onTabChange: PropTypes.func,
        onEndTest: PropTypes.func,
        onStartTest: PropTypes.func,
        testList: PropTypes.array,
        currentTest: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            //selectedTest:
        };
    }


    render() {
        const testList = this.props.testList;
        const currentTest = this.props.currentTest;
        return (

            <header>
                <div className="test-controls">
                    <div className="left">
                        <h3>

                            <span>{currentTest.title}</span>


                        </h3>
                        {this.props.children}
                    </div>

                    <div className="btn-wr">

                        <RaisedButton label="Начать тест"
                                      disabled={ currentTest.status !== 'idle'}
                                      primary={true} style={buttonStyle} onClick={this.props.onStartTest}/>
                        <RaisedButton label="Закончить"
                                      disabled={currentTest.status !== 'active'}
                                      secondary={true} style={buttonStyle} onClick={this.props.onEndTest}/>

                    </div>
                </div>
                <div className="tab-controls">
                    <Tabs onChange={::this.props.onTabChange}
                          value={this.props.selectedTest}
                    >
                        {
                            testList.map(test => {
                                const {title, status, id} = test;
                                return (
                                    <Tab label={title}
                                         className={status}

                                         value={id}
                                    />
                                )

                            })


                        }
                    </Tabs>
                </div>
            </header>
        )


    }
}