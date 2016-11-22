import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Button from '../components/Button/Button'
import TextField from '../components/TextField/TextField'

const mapStateToProps = (state) => state.lessons;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export class Lesson extends Component {
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.interval = null;
        //this.store = this.props.store;

        this.state = {
            currentPopup: 1,
            textField : "Твоя нотатка",
            submitAnimation: false,
        }

    };
    saveNotes() {
        localStorage.setItem("studentNotes", this.state.textField);
    }

    addNotes(data){
        this.props.actions.saveNote({
            lessonId:this.props.authData.selectedLesson,
            valueNote:[this.state.textField]
        });
        this.setState({submitAnimation: true})
        var self = this
        setTimeout(function () {
            self.setState({submitAnimation: false})
        }, 5000)
    }


    updateNotes(){
        let notes = this.props.notes.notes;
        this.setState({textField: localStorage.getItem("studentNotes")})
        notes.text == null ? (this.setState({textField: localStorage.getItem("studentNotes")}) ): this.setState({textField: notes.text})

    }


    /*submitAnimation() {
        setInterval(function () {
            this.setState({submitAnimation: false})
        }, 700)

    }*/

    componentDidMount() {
        this.props.actions.getLessonNotes();
        this.updateNotes();
       // this.props.actions.getNotes();

    }
    componentWillMount() {
       // this.props.actions.getLessonNotes();

    }


    render() {

        const {selectedLesson, data} = this.props;

        const lesson = this.props.data;
        var note = this.props.notes.notes;

        console.log(note);
        const lessonData = data.filter(lesson => ( lesson.id === selectedLesson ))[0]['lessonInfo'];

        const {title, description} = lessonData;
        return (
            <div className="lesson-page">
                <div className="header-name">
                    <span>{this.props.profile.data.name}</span>
                </div>
                <div className="description-lesson">
                    <h4>{title}</h4>

                    {
                        !!description && description.length > 0 && (
                            <div dangerouslySetInnerHTML={{__html: description}}></div>

                        )
                    }


                </div>
                <div className="notes-wr">


                    {
                        this.state.currentPopup === 1 && (
                            <Button type={'main'} onClick={() => {this.setState({currentPopup:2})}}>
                                нотатки
                            </Button>
                        )

                    }
                    {
                        this.state.currentPopup === 2 && (
                            <div className="notesPopup">
                                <Button type={'tab'} onClick={() => {
                                    this.setState({currentPopup:1})

                                }}>
                                    X
                                </Button>
                                <h5>нотатки</h5>

                                <TextField
                                    label={"123"}
                                    id={"notes"}
                                    fieldType="textarea"
                                    className=""
                                    rows="30"
                                    placeholder="Твоя нотатка"
                                    value={this.state.textField}
                                    onChange={() => {
                                        this.setState({textField: document.getElementById("notes").value})
                                        this.saveNotes()
                                    }}
                                />
                                <Button className="save-btn" type={'tab'} onClick={() => {this.addNotes()}}>
                                    Зберегти нотатку

                                </Button>

                                <div
                                    className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                    Інформацію збережено у вашому особистому кабінеті! Дякуємо!
                                </div>
                                {/*onChange={() => {
                                 this.setState({textField: document.getElementById("notes").value})
                                 this.saveNotes()
                                 }}*/}
                            </div>
                        )

                    }


                </div>


            </div>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(Lesson);