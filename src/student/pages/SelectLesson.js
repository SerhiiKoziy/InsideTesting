import React, {Component} from 'react';
import Button from '../components/Button/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import DropdownList from 'react-widgets/lib/DropdownList';
const mapStateToProps = (state) => state.lessons;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class SelectLesson extends Component {
    constructor(props) {
        super(props);
        // this.store = this.props.store;
        this.interval = null;
        this.state = {
            isLoginOpened: false,
            selectedLesson: null
        }

    }

    logChange(val) {
        console.log("Selected: " + val);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentDidMount() {
        this.props.actions.getLessons();
        this.interval = setInterval(()=> {
            this.props.actions.getLessons();
        }, 10000);
    }

    selectLesson() {
        this.props.actions.joinLesson(this.props.data.filter(lesson => (lesson.room.id === this.state.selectedLesson.id))[0].id /*onSuccess*/);
        //console.log(this.props.data.filter(lesson => (lesson.room.id === this.state.selectedLesson.id))[0].id)
    }

    render() {

        const selectOptions = this.props.data.map(lesson => ({
            ...lesson.room
        }));

        return (
            <div className={`page start-page opened ${this.state.isLoginOpened ? 'step2' : ''}`}>


                <div className="wr">
                    <h3>smart school</h3>
                    <p>Навчайтесь у нашій Діджитал Академії. Ми даємо знання, що полегшують дорогу до успіху.</p>
                    <form className="select-box">


                        <DropdownList placeholder="Оберіть аудиторію"
                                      valueField="id"
                                      textField="name"
                                      onChange={(value)=>{this.setState({selectedLesson: value})}}
                                      data={selectOptions}/>
                    </form>
                    <Button type="main" onClick={::this.selectLesson}
                            disabled={!this.state.selectedLesson}
                    >
                        зареєструватися на урок
                    </Button>


                </div>

            </div>
        )
    }
};
