import React, {Component} from 'react';
import NavBar from '../components/NavBar/NavBar'
import Timer from '../components/Timer/Timer'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import {connect} from 'react-redux';

const RouteWrapper = ({children, ...props}) => (<div className="route-wr" {...props}>{children}</div>);
const pageTransitionName = "example";
const transitionClassName = "transition-group";
const transitionDuration = 2000;
const transitionEnterTimeout = 2 * transitionDuration;

// <ReactCSSTransitionGroup
//     component="div"
//     className={`${transitionClassName} route-wr`}
//     transitionName={pageTransitionName}
//     transitionEnterTimeout={transitionEnterTimeout}
//     transitionLeaveTimeout={transitionDuration}
// >
//     {this.props.children ?
//         React.cloneElement(this.props.children, {
//             key: this.props.location.pathname
//         }) :
//         null}
// </ReactCSSTransitionGroup>
//
const mapStateToProps = (state) => state;

const mapDispatch = (dispatch) => (
{
    actions: bindActionCreators(actions, dispatch)
}
)


@connect(mapStateToProps, mapDispatch)
export default class Root extends Component {
    constructor(props) {
        super(props);

        this.interval = null;
        // this.store = this.props.store;
    }


    componentDidUpdate(prevProps){
        const {selectedLesson, isAuthComplete} = this.props.lessons;
        console.log(selectedLesson, isAuthComplete);
      if(
          ( selectedLesson !== prevProps.lessons.selectedLesson )
          ||
          (isAuthComplete !== prevProps.lessons.isAuthComplete )
      ){


              if(isAuthComplete && !this.interval){
                  this.launchInterval();
              }

          if(selectedLesson === null){
              clearInterval(this.interval);
          }

      }
    }

    launchInterval(){
        this.interval = setInterval(()=> {
            this.props.actions.getLessonStatus();
        }, 5000);
    }

    componentDidMount() {
        if (Object.keys(this.props.dic.data).length === 0) {
            this.props.actions.getDictionaries();
        }
        
        this.props.actions.getStudentProfile();
        if(this.props.lessons.selectedLesson && this.props.lessons.isAuthComplete){
            if(!this.interval){
                this.launchInterval();
            }
        }


    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div className="root">

                <header id="header">
                    <a href="/#" className="logo">
                        <img src="assets/images/logo.png"/>
                    </a>

                   
                </header>
                


                <div className="route-wr">
                    {this.props.children}
                </div>

                {this.props.routing.locationBeforeTransitions.pathname !== '/' && (
                    <footer id="footer">

                        <p>© Всі права захищені</p>
                        <ul className="social">
                            <li>
                                <a href=""><img src="assets/images/facebook.png"/></a>
                            </li>
                            <li>
                                <a href=""><img src="assets/images/twitter.png"/></a>
                            </li>
                        </ul>

                    </footer>

                )}


            </div>
        );
    }
}

// <NavBar />
