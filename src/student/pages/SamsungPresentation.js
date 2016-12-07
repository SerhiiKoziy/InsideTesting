import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {bindActionCreators} from 'redux';

import PDF from 'react-pdf-js';
import {Link} from 'react-router';
import {Field} from 'redux-form';
import Button from '../components/Button/Button';
import Timer from '../components/Timer/Timer';
import TextField from '../components/TextField/TextField';
import CheckBox from '../components/CheckBox/CheckBox';
//import MyPdfViewer from '../components/PDF/PDF';
import  Spinner from '../components/Spinner/Spinner';

class SamsungPresentation extends Component {
    constructor(props) {
        super(props);
        //this.store = this.props.store;
        this.interval = null;

        this.state = {
            currentTab: 1,
            telephoneForGhost: false,
            currentPopup: 2,
            textField: '',
            submitAnimation: false,
            startTest:false,
            page: 0,
            time: 60,
            pages: 1,
            secondsLeft:0,
            minutes:0,
            seconds:0,
            addTimer: true,
            lastSowPage: 1,
        }
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.onPageComplete = this.onPageComplete.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    };
    componentDidMount() {

        this.props.actions.getLessonsPlusPLus();
        this.click();
        this.rightClick();


    }
    rightClick() {
        if (document.addEventListener) { // IE >= 9; other browsers
            document.addEventListener('contextmenu', function(e) {
            alert("Не намагайтесь скопіювати контент презентації"); //here you draw your own menu
            e.preventDefault();
        }, false);
        } else { // IE < 9
            document.attachEvent('oncontextmenu', function() {
                alert("Не намагайтесь скопіювати контент презентації");
                window.event.returnValue = false;
            });
        }
    }
    componentWillMount() {
    }
    getParam(array, id, fieldName = 'id') {
        return array.filter(function (obj) {
            return obj[fieldName] == id;
        })[0].name

    }
    openNote(numNote) {
        this.setState({
            currentNote: numNote,
        })
    }
    chechLoadedLessons(){
        if(this.props.dic.selectedLesson == false){

        }
    }
    saveNotes() {
        localStorage.setItem("studentNotes", this.state.textField);
    }
    addNotes(data){
        console.log(this.props.samsungPlusPlus.selectLesson)
        this.props.actions.saveNote({
            lessonId:this.props.samsungPlusPlus.selectLesson,
            valueNote:[this.state.textField]
        });
        this.setState({submitAnimation: true})
        var self = this
        setTimeout(function () {
            self.setState({submitAnimation: false})
        }, 5000)
    }
    startTest(){

        //let id = this.props.samsungPlusPlus.selectLesson
        if(this.state.startTest){
            this.props.actions.getActiveTestPlusPlus();
            this.props.actions.startTestPlusPlus();
        }
    }


    //PDF start
    onDocumentComplete(pages) {
        this.setState({ page: 1, pages });
    }
    onPageComplete(page) {
        this.setState({ page });
    }
    handlePrevious() {
        this.setState({ page: this.state.page - 1, addTimer:false });
    }
    handleNext() {

        console.log('receiveNextSlide', this.state.page, this.state.pages, this.state.addTimer);
        if (this.state.page === (this.state.pages - 1)){ //last page
            if(this.state.startTest || !this.state.addTimer){
                this.setState({ page: this.state.page + 1, addTimer:true});
            }else{
                this.setState({startTest:true, page: this.state.page + 1, addTimer:true})
            }

        }else{
            if(this.state.startTest ){
                this.setState({ page: this.state.page + 1, addTimer:false});
            }else if(this.state.addTimer && this.state.page == this.state.lastSowPage){
                this.setState({ page: this.state.page + 1,secondsLeft: 60, addTimer:true,lastSowPage: this.state.lastSowPage + 1});
            }else{
                this.setState({ page: this.state.page + 1, addTimer:true });

            }

        }
        this.click();
    }
    renderPagination(page, pages) {
        let previousButton = <li className="previous" onClick={::this.handlePrevious}>
                                <Button type="main"> Назад
                                </Button>
                            </li>;

        if (page === 1 || this.state.secondsLeft > 0) {
            previousButton = <li className="previous disabled">
                                <Button type="main"> Назад
                                </Button>
                            </li>;
        }



        let nextButton = <li className="next" onClick={::this.handleNext}>
                            <Button type="main"> Вперед
                            </Button>
                        </li>;

        if (page === pages || this.state.secondsLeft > 0) {
            nextButton = <li className="next disabled">
                            <Button type="main"> Вперед
                            </Button>
                        </li>;
        }
        return (
            <nav>
                <ul className="pager">
                    {previousButton}
                    {nextButton}
                </ul>
            </nav>
        );
    }
    //PDF end



    //timer
    click(){
        console.log('this.state.secondsLeft')
        if (this.state.addTimer ) {
            console.log('this.state.secondsLeft22', this.state.secondsLeft)
            this.tick();
            this.setState({
                //secondsLeft: 3,
                showTimer:true
            });
            if(!this.interval){
                this.interval = setInterval(()=> {
                    this.tick();
                }, 1000);
            }
        }
    }

    componentDidUpdate(prevProps){
    }

    tick(){
        if(this.state.secondsLeft < 1){
            //clearInterval(this.interval);
            /*this.setState({
                showTimer:false
            });*/
            //this.props.handleTestFinish();
        }else{
            const secondsLeft = this.state.secondsLeft - 1;
           // var duration = new Date(secondsLeft * 1000);
            this.setState({
                //seconds: duration.getSeconds(),
                //minutes: duration.getMinutes(),
                secondsLeft,
                showTimer:true
            })
        }
    }



    render() {
        const isLoaded = this.props.dic.isLoadedLessons;
        let presentationUrl = '';
        let pdfContainer = <embeded></embeded>;
        let nameLesson = '';
        let lessons;
        let startTest;


        if(isLoaded ){
            presentationUrl = this.props.samsungPlusPlus.presentationUrl;
            nameLesson = this.props.samsungPlusPlus.nameLesson;

            /*pdfContainer = <object width="100%"
                                   height="100%"
                                   type="application/pdf"
                                   data={presentationUrl+'?#zoom=&scrollbar=0&toolbar=0&navpanes=0'}>

                    <p>PDF cannot be displayed.</p>
                </object>;*/
            /*<embeded src={presentationUrl} width="400" height="500" type="application/pdf"></embeded>;*/
        }
        let pagination = null;
        if (this.state.pages) {
            pagination = this.renderPagination(this.state.page, this.state.pages);
        }


        return (


            <div className="samsung-presentation test page">
                <div className="timer">
                    <p>
                        <span>00:</span>
                        <span key={'min'+this.state.minutes}>{this.state.minutes.toString().length == 1 ? '0' + this.state.minutes : this.state.minutes }:</span>
                        {/*<span key={'sec'+this.state.seconds}>
                            {this.state.seconds.toString().length == 1 ? '0' + this.state.seconds : this.state.seconds }
                        </span>*/}
                        <span key={'sec'+this.state.secondsLeft}>
                            {this.state.secondsLeft.toString().length == 1 ? '0' + this.state.secondsLeft : this.state.secondsLeft }
                        </span>
                    </p>
                </div>

                {/*<nav className="top-nav">

                    <Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>
                    <Link to='/school' activeClassName='active'>smartschool</Link>
                    <Link to='/' activeClassName=''>samsung+</Link>
                    <Link to='/' activeClassName='active'>особистий кабінет</Link>

                </nav>*/}


                        <div className="presentation-wr">
                            <h3>{nameLesson}</h3>


                            <div className="pdf-wr">
                                {/*pdfContainer*/}

                                <div className="insidePdfWr">
                                    <PDF
                                        //file="/Content/Entities/LessonInfo/32/ua/presentation.pdf"
                                         file={presentationUrl}
                                         onDocumentComplete={this.onDocumentComplete}
                                         onPageComplete={this.onPageComplete}
                                         page={this.state.page} />
                                    {pagination}
                                </div>
                            </div>
                            <Button type={'main'}
                                    onClick={::this.startTest}
                                    className={`btn btn--main ${this.state.startTest ? '' : 'disabled'}`}>
                                почати тест
                            </Button>


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
        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(SamsungPresentation);