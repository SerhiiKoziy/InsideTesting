import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router'
import {Field} from 'redux-form';
import * as actions from '../actions';
import * as types from '../constants/ActionTypes';
import Button from '../components/Button/Button'
import CheckBox from '../components/CheckBox/CheckBox';

import  Spinner from '../components/Spinner/Spinner';

class SamsungLesson extends Component {
    constructor(props) {
        super(props);
        //this.store = this.props.store;

        this.state = {
            currentTab: 1,
            testsList: [],
            activeCourseTitle: false,
            selectedLesson: false,
            selectTest:0,
        }

    };
    componentDidMount() {
        this.props.actions.getLessonsPlusPLus();
    }
    componentWillMount() {
    }
    getParam(array, id, fieldName = 'id') {
        return array.filter(function (obj) {
            return obj[fieldName] == id;
        })[0].name

    }

    showLessonsList(id){
        let arrCourses = this.props.dic.lessonsPlusPlus.courses;

        let title = arrCourses.filter(item => item.id == id)[0].title
        let arrTests = arrCourses.filter(item => item.id == id)[0].lessons


        this.setState({testsList:arrTests, activeCourse:id, activeCourseTitle:true})

    }
    sendSelectLesson() {
        let selectLesson = this.state.selectTest;
        let presentationUrl = this.state.presentationUrl;
        let selectTest = this.state.selectTest;
        let nameLesson = this.state.testsList.filter(item => item.id == selectTest)[0].lessonInfo.title;
        this.props.actions.joinLessonPLusPLus(selectLesson, true);
        console.log('nameLesson', nameLesson)
        this.props.actions.receiveSamsungLessons({selectLesson, presentationUrl, nameLesson});
        //this.props.actions.pushRedirect('/samsungPresentation')

    }
    selectTest(data){
        console.log('datadatadata', data);
        this.setState({selectTest:data.id, presentationUrl:data.url, selectedLesson: true});


    }
    logout(){
        this.props.actions.pushRedirect(`/`)
        this.props.actions.logout();
    }
    render() {
        const isLoaded = this.props.dic.isLoadedLessons;
        let lessons;
        let arrCourses = []

        if(isLoaded){
            arrCourses = this.props.dic.lessonsPlusPlus.courses;
        }

        let invalidate = this.props.dic.didInvalidate;
        return (
            <div className="samsung-lesson test page">
                {
                    !invalidate && (
                        <nav className="top-nav">

                            {/*<Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>
                             <Link to='/school' activeClassName='active'>smartschool</Link>
                             <Link to='/' activeClassName=''>samsung+</Link>
                             <Link to='/' activeClassName='active'>особистий кабінет</Link>*/}

                            <Link to='/' activeClassName='' onClick={() => this.logout()}>Вийти</Link>

                        </nav>
                    )
                }



                        <div className="theme-wr">
                                <h3>Перелік всіх курсів</h3>

                                <ul>
                                    {arrCourses.map(item => {
                                            return (
                                                <li onClick={!item.completed ? this.showLessonsList.bind(this, item.id) : ''}
                                                    className={`test ${(this.state.activeCourse == item.id && !item.completed) ? 'active' : ''}
                                                                     ${item.completed == true ? 'completed' : ''}`}
                                                    key={item.id}
                                                >{item.title}</li>
                                            )
                                        })
                                    }


                                </ul>



                        </div>

                    <div className="tests-wr">

                        <h3>{this.state.activeCourseTitle ? "Перелік всіх уроків" : ''}</h3>
                        <ul>
                            {this.state.testsList.map(item => {
                                let id = item.id;
                                let url = item.presentationUrl;
                                let data = {id, url};
                                let completed = item.completed

                                return (
                                    <li onClick={!completed ? this.selectTest.bind(this, data) : ''}
                                        className={`test ${this.state.selectTest ==  id ? 'active' : ''}
                                                         ${completed == true ? 'completed' : ''}`}
                                        key={id}
                                    >
                                        <span>{item.lessonInfo.title}</span>
                                        <div className="circle"><span></span></div>
                                    </li>
                                )
                            })
                            }


                        </ul>
                        <Button type="main"
                                onClick={::this.sendSelectLesson}
                                disabled={!this.state.selectedLesson}
                        >
                            презентація
                        </Button>


                    </div>


            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(SamsungLesson);