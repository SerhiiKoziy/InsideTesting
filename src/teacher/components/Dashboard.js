import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

import {Tabs, Tab} from 'material-ui/Tabs';
import {
    Table,
    TableBody,
    TableHeader,
    TableFooter,
    TableHeaderColumn,
    TableRowColumn,
    TableRow
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';

import Header from './Header';
import Row from './Row';
import ProfileRow from './ProfileRow';
import RowHeader from './RowHeader';
import Timer from '../../student/components/Timer/Timer'
const buttons = [
    'Name',
    'City',
    /*'Address',*/
    'Phone',
    'Company',
    'Shop',
    'Position',
    'SamsungPlusLogin'
];

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    }
};
const green = {
    color: 'green'
};
const red = {
    color: 'red'
};
const buttonStyle = {
    margin: '0px 2px'
}

const CheckIcon = () => (<Check style={green}></Check>);
const CloseIcon = () => (<Close style={red}></Close>);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component {
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            testSelected: false,
            activeTest:0
        };
    }

    componentDidMount() {
        this.props.actions.getLessonDashboard();
        this.props.actions.getLessonTests();
        this.interval = setInterval(()=> {
            this.props.actions.getLessonDashboard();
            this.props.actions.getLessonTests();
            //clearInterval(this.interval);
        }, 5000);
    }
    componentDidUpdate(prevProps){
        if(prevProps.test !== this.props.test){

            // if any test run - show test tab
            if(this.props.test.data.length > 0 && this.props.test.data.filter(t => t.status === 'active').length > 0 && !this.state.testSelected){
                this.setState({
                    testSelected:true,
                    //activeTest:this.props.test.data.filter(t => t.status === 'active')[0].id
                })
            }

            // set default test
                         if (this.state.testSelected && !this.props.dashboard.selectedTest) {
                                 //set default test
                                     //this.props.actions.selectTest(value);

                                            this.props.actions.selectTest(this.props.test.data[0].id);
                                 //this.props.actions.selectTest(value)
                                 }

        }
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleTabChange(value) {
        // this.setState({
        //     activeTest: value
        // });
        this.props.actions.selectTest(value);
    }

    startTest(e) {

        this.props.actions.postStartTest(this.props.dashboard.selectedTest);
    }

    endTest(e) {
        this.props.actions.postEndTest(this.props.dashboard.selectedTest);
    }

    handleProfileStepChange(action, e) {
        console.log(action);
        this.props.actions.setLessonStep(action);
    }

    startLesson() {

        this.setState({
            testSelected: true
        });

        this.handleProfileStepChange('Lesson');

    }
    handleTestFinish(){

    }
    render() {
        const {data:testList} = this.props.test;
        /*const testList = this.props.test.data;*/
        const {data:{users, step}, selectedTest} = this.props.dashboard;
        /*const users = this.props.dashboard.data.users;
        const step = this.props.dashboard.data.step;
        const selectedTest = this.props.dashboard.data.selectedTest;*/

        const currentTest = testList.filter(test => test.id === selectedTest)[0];
        return (
            <div className="dashboard">
                <header className="d-header">
                    <div className="toggle-holder">
                        <span>Профиль</span>

                        <div className="toggle-wr">
                            <Toggle
                                label=""
                                onToggle={(e)=> this.setState({
                        testSelected: !this.state.testSelected
                        })}
                                toggled={this.state.testSelected}
                            />
                        </div>

                        <span>Тест</span>
                    </div>
                    <div className="timer-wr">


                    </div>
                </header>



                {
                    (this.state.testSelected  && !this.props.test.didInvalidate && selectedTest ) && (

                        <Header
                            selectedTest={selectedTest}
                            testList={testList}
                            currentTest={testList.filter(test => test.id === selectedTest)[0]}

                            onTabChange={::this.handleTabChange}
                            onStartTest={::this.startTest}
                            onEndTest={::this.endTest}


                        >
                            {
                                (this.state.testSelected && !this.props.test.didInvalidate && selectedTest && currentTest.status === 'active' && currentTest.timeLimit !== 0) &&
                                (
                                    <Timer handleTestFinish={::this.handleTestFinish} secondsLeft={currentTest.secondsLeft} />
                                )

                            }

                        </Header>


                    )
                }

                {
                    ( this.state.testSelected && users && users.length !== 0 && selectedTest) && (

                        <Table className="table-test" selectable={true}

                        >
                            {
                                (currentTest && currentTest.questions.length > 0) ? (
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>

                                        <TableRow >
                                            <TableHeaderColumn><span>Вопросы</span></TableHeaderColumn>
                                            <TableHeaderColumn className="progress">

                                                <ol>


                                                    {
                                                        currentTest.questions.map((el, i) => {

                                                            return (
                                                                <li key={el.text+i}
                                                                   // style={{width:(100 / (currentTest.questions.length ) )+'%'}}
                                                                >

                                                                    <p>
                                                                        <span className="num">
                                                                            {i + 1}
                                                                        </span>
                                                                        <span>{` ${el.text}`}</span>
                                                                    </p>


                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ol>

                                            </TableHeaderColumn>
                                        </TableRow>

                                <TableRow >
                                    <TableHeaderColumn><span>Ответы</span></TableHeaderColumn>
                                    <TableHeaderColumn className="progress">

                                        <ol>

                                            {
                                                (currentTest && currentTest.questions.length > 0) &&


                                                currentTest.questions.sort((a, b)=> a.num - b.num).map((el, i) => {

                                                    return (
                                                        <li key={i}
                                                            //style={{width:(100 / (currentTest.questions.length - 1) )+'%'}}
                                                        >


                                                            <ol className="answers">
                                                                {el.selectList && el.selectList.length > 0 && el.selectList.map((answer, id) => (

                                                                    <li className={`${answer.isCorrect ? 'correct': ''}`}>
                                                                        <span>
                                                                            {answer.text}
                                                                        </span>
                                                                        {
                                                                            el.type === 'bit' && (
                                                                                <span>
                                                                                    (
                                                                                    {
                                                                                        answer.text == '1' && 'Да'
                                                                                    }
                                                                                    {
                                                                                        answer.text == '0' && 'Нет'
                                                                                    }
                                                                                    )
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </li>

                                                                ))}

                                                            </ol>


                                                        </li>
                                                    )
                                                })
                                            }
                                        </ol>

                                    </TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                                ) : (
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>    В текущем тесте нет вопросов</TableHeaderColumn>

                                        </TableRow>
                                    </TableHeader>

                                )}


                            {(currentTest && currentTest.questions.length > 0) && (
                                <TableBody displayRowCheckbox={false}

                                >
                                    {
                                        users.map((row, i) => (


                                                <Row
                                                    row={row}
                                                    key={i}
                                                    selectedTest={selectedTest}
                                                >

                                                </Row>
                                            )
                                        )

                                    }
                                </TableBody>

                            )}


                        </Table>
                    )
                }
                {
                    !this.state.testSelected && !this.props.dashboard.didInvalidate && (

                        <div className="table-test2">


                            <Table selectable={true}

                            >
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow >
                                        <TableHeaderColumn>Шаги</TableHeaderColumn>

                                        {
                                            buttons.map((action, i) => (
                                                <TableHeaderColumn key={action+i} className={action === step ? 'active': ''}>
                                                    <RaisedButton className={'set-btn'} label={'Set'} primary={true}
                                                                  onClick={this.handleProfileStepChange.bind(this,action)}/>

                                                </TableHeaderColumn>
                                            ))
                                        }

                                    </TableRow>
                                    <TableRow >
                                        <TableHeaderColumn>Ученик</TableHeaderColumn>

                                        {
                                            buttons.map((action, i) => (
                                                <TableHeaderColumn key={i} className= {action === step ? 'active': ''}>
                                                    <span className="center-text">{action}</span>
                                                </TableHeaderColumn>
                                            ))
                                        }

                                    </TableRow>
                                </TableHeader>


                                <TableBody displayRowCheckbox={false}>
                                    {
                                        users.map((row, i) => (


                                                <ProfileRow
                                                    row={row.user}
                                                    key={i}

                                                    step={step}

                                                />
                                            )
                                        )

                                    }

                                </TableBody>
                            </Table>

                            <div className="btn-wr right">

                                <RaisedButton label={'Начать урок'} secondary={true}
                                              onClick={this.startLesson.bind(this)}/>
                            </div>

                        </div>
                    )
                }

            </div>

        )
    }
}