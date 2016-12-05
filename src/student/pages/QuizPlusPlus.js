import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Question from '../components/QuizComponents/Question'
import Button from '../components/Button/Button';
import Timer from '../components/Timer/Timer'
import Spinner from '../components/Spinner/Spinner';
import Slider from 'react-slick';
import cuid from 'cuid';
class QuizPlusPLus extends Component {
    constructor(props) {
        super(props);


        this.state = {
            /*sliderSettings: {
                dots: false,
                infinite: false,
                draggable: false,
                speed: 500,
                slidesToShow: 10,
                slidesToScroll: 1,
                useCSS: true,
                initialSlide: 4 || 0
            }*/
        };
        this.changeHandler = this.changeHandler.bind(this);
    }


    componentWillMount() {
        //this.props.actions.getLessonsPlusPLus();


    }

    componentDidMount() {
        this.setState({sliderSettings: null});
        this.slickNextSlide();
        //this.props.actions.getActiveTestPlusPlus();
       //this.props.actions.getActiveTestPlusPlus();
    }
    changeHandler(e) {
        this.refs.slider.slickGoTo(e.target.value)
        console.log(this.refs, e.target.value)
    }

    goToQuiz(id, e) {
        e && e.preventDefault();
        this.props.actions.pushRedirect(`/quizPlusPlus/${id}`)
    }

    handleOnAnswer(data){
        console.log('handleOnAnswer', data);
        this.props.actions.submitAnswerPlusPlus({
            ...data,
             testId:this.props.samsungPlusPlus.dataTest.id,
            lessonId:this.props.samsungPlusPlus.selectLesson
        });

    }
    handleTestFinish(){
            this.props.actions.getActiveTestPlusPlus();

    }
    slickNextSlide() {

        var nextSlide = this.props.quiz.nextSlide

        //var nextSlide = 1;
        //this.refs.slider.slickGoTo(nextSlide)
    }
    goToLesson() {
        this.props.actions.pushRedirect(`/samsungLesson`)
    }
    render() {
        //const {data} = this.props.quiz;
        let id = 0;
        let currentQuestion = {};
        let answers = [];
        let questions = [];
        let title = "";
        let secondsLeft = 0;
        let selectedQuestionId = 1;
        let CurAnswers = [];
        if(Object.keys(this.props.samsungPlusPlus.dataTest).length > 0){
            const data = this.props.samsungPlusPlus.dataTest;
            //console.log('this.props.samsungPlusPlus.dataTest', data)


            id = this.props.samsungPlusPlus.dataTest.id;
            // const {answers,questions} = data;
            title = data.title;
            questions = data.questions;
            answers = data.answers;
            secondsLeft = data.secondsLeft;
            selectedQuestionId = +this.props.params.id;


            // const currentQuestion = (!this.props.quiz.didInvalidate && {/*!this.props.quiz.isFetching*/} && this.props.quiz.data.id ) && data.questions.filter(el => el.num === selectedQuestionId )[0];

            currentQuestion = data.questions.filter(el => el.num === selectedQuestionId )[0]
            //console.log('currentQuestion', currentQuestion)

        }

        //console.log('timer',timer)
        const sliderSettings = {
            dots: false,
            infinite: false,
            draggable: false,
            speed: 500,
            slidesToShow: 10,
            slidesToScroll: 1,
            useCSS: true,
            slickGoTo:this.props.quiz.nextSlide - 1
        };
        return (

            <div className="quiz-page test">
                {
                    (Object.keys(this.props.samsungPlusPlus.dataTest).length > 0 ) && (

                        <Timer handleTestFinish={::this.handleTestFinish} secondsLeft={secondsLeft}/>

                    )
                }

                <div  className="header-name">
                    <span>{this.props.profile.data.name}</span>
                </div>

                {
                    (Object.keys(this.props.samsungPlusPlus.dataTest).length > 0 )?(
                    <div className="ques-wr">
                        {
                            ( this.props.params.id !== 'result'  && currentQuestion ) && (
                                <Question title={title} //title
                                          questionData={currentQuestion}
                                          onAnswer={::this.handleOnAnswer}
                                />
                            )
                        }



                        {
                            ( this.props.params.id === 'result') && /* !this.props.userScore.didInvalidate && !this.props.userScore.isFetching) &&*/ (
                                <div className="test-result">
                                    <h4>ВАШ РЕЗУЛЬТАТ</h4>


                                    <p><span>ПРАВИЛЬНІХ ВІДПОВІДЕЙ</span><span>{this.props.userScore.data.totalCorrect}</span></p>


                                    <p><span>ПРАВИЛЬНІХ ВІДПОВІДЕЙ</span>
                                        <span>
                                                {answers.map(obj => {
                                                        if(obj.isCorrect == true){
                                                            CurAnswers.push(obj)
                                                        }
                                                    })
                                                }
                                            {Math.floor((CurAnswers.length/answers.length)*10000)/100 + "%"}
                                        </span>
                                    </p>

                                    <h5><span>ЗАРОБЛЕНО БАЛІВ</span><span>{this.props.userScore.data.score}</span></h5>

                                    <Button type={'main'} onClick={::this.goToLesson}>
                                        продовжити
                                    </Button>
                                </div>



                            )
                        }



                        <div className={`steps-test ${this.props.params.id === 'result' ? 'disabled' : ''}`}>



                            <Slider  ref='slider' {...sliderSettings}>


                                {questions.sort((a,b) => a.num  - b.num).map((question, qid) => {
                                    let className = '';
                                    let matchedAnswer = answers.filter(answer => answer.questionId === question.id)[0];
                                    if(selectedQuestionId === question.num ){
                                        className +=' active ';
                                    }
                                    if(!!matchedAnswer){
                                        className +=' answered ';
                                        if(matchedAnswer.isCorrect){
                                            className +=' correct ';
                                        }else{
                                            className +=' incorrect ';
                                        }
                                    }

                                    return(
                                        <div key={question.num+'-'+question.id} className={ className}>
                                            <a href="#"
                                               onClick={this.goToQuiz.bind(this,question.num )}>{question.num }</a>
                                        </div>

                                    )

                                })}

                            </Slider>
                        </div>

                    </div>
                ):(
                <Spinner></Spinner>
                )
                }



            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(QuizPlusPLus);