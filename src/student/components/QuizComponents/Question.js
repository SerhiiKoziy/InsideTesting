import React, {PropTypes, Component} from 'react';

import Button from '../Button/Button'
import Answers from './Answers'
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAnswers: []
        }
    }
    //
    // componentWillReceiveProps(nextProps) {
    //     // You don't have to do this check first, but it can help prevent an unneeded render
    //     if (nextProps.questionData !== this.props.questionData) {
    //         this.setState({currentAnswers: []});
    //     }
    // }

    addAnswer(values,e ) {
        this.props.onAnswer({
            questionId: this.props.questionData.id,
            values: values || this.state.currentAnswers
        });
        this.setState({
            currentAnswers:[]
        });
        //const values = data.values.map(val => val.text);

    }

    selectAnswer(answerType, answer, e) {
        let answers = this.state.currentAnswers;
        switch (answerType) {
            case 'text':
                answers = [e.target.value];
                break;
            case 'select':

                if (e.target.checked) {
                    answers = [answer.text];
                }
                break;
            case 'opinion':
                this.addAnswer([e]);
                answers = [];
                break;
            case 'bit':
                this.addAnswer([e]);
                answers = [];
                break;
            case 'multiselect':

                if (e.target.checked) {
                    answers = [...answers, answer.text];
                } else {
                    answers = answers.filter(a => answer.text !== a);
                }
                break;
            default:
                break;
        }

        this.setState({
            currentAnswers: answers
        }, ()=> {
            console.log(this.state.currentAnswers);
        })
    }

    render() {
        const {questionData:{id:questionId, text, selectList, type:answerType}, title} = this.props;


        return (
            <div className="test-wr">

                <div className="question-wr">
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>

                <div className="options-wr">

                    <form >
                        {selectList ?

                            selectList.map((select, selId) => {
                            const {text:selectText} = select;


                            return (


                                <Answers
                                    label={selectText}
                                    answerId={`${selectText}-${selId}`}
                                    answerType={answerType}
                                    value={selId}
                                    title={selectText}
                                    questionId={questionId}
                                    onChange={this.selectAnswer.bind(this,answerType, select)}
                                    key={questionId+'-'+selId}
                                />
                            )
                        }) : (
                            <Answers
                                answerId={`${answerType}-${text}`}
                                answerType={answerType}

                                title={text}
                                questionId={questionId}
                                onChange={this.selectAnswer.bind(this,answerType, '')}
                                key={questionId}
                            />

                        )}

                        {answerType !== 'bit' && (

                            <Button type={'main'} onClick={this.addAnswer.bind(this,null)} disabled={this.state.currentAnswers.length === 0}>
                                вибрати відповідь
                            </Button>

                        )}


                    </form>

                </div>

            </div>
        );
    }

}

// Make ESLint happy again: add validation to props
Question.propTypes = {
    onAnswer: PropTypes.func,
    questionData: PropTypes.object
};
Question.defaultProps = {};

export default Question;
