import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';
import PDF from 'react-pdf-js';
import Button from '../Button/Button'
class MyPdfViewer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            page:1,
            startTest:false,
        }
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.onPageComplete = this.onPageComplete.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    onDocumentComplete(pages) {
        this.setState({ page: 1, pages });
    }

    onPageComplete(page) {
        this.setState({ page });
    }

    handlePrevious() {
        this.setState({ page: this.state.page - 1 });
    }

    handleNext() {
        this.setState({ page: this.state.page + 1 });
        console.log('receiveNextSlide', this.state.page, this.state.pages)
        if (this.state.page === (this.state.pages - 1)) {
            //console.log('true', this)
           // this.props.actions.requestStartTest();

        }
    }


    action(){
        console.log('true', this)
        this.props.actions.requestStartTest();
    }

    renderPagination(page, pages) {
        let previousButton = <li className="previous" onClick={::this.handlePrevious}>
                                <Button type="main"> Previous
                                </Button>
                             </li>;
        if (page === 1) {
            previousButton = <li className="previous disabled">
                                <Button type="main"> Previous
                                </Button>
                              </li>;
        }

        let nextButton = <li className="next" onClick={::this.handleNext}>
                            <Button type="main"> Next
                            </Button>

                         </li>;
        if (page === pages) {
            nextButton = <li className="next disabled">
                            <Button type="main"> Next
                            </Button>
                         </li>;


            this.action();
           // this.props.actions.receiveNextSlide(true);

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

    render() {
        let pagination = null;
        if (this.state.pages) {
            pagination = this.renderPagination(this.state.page, this.state.pages);
        }
        return (
            <div className="insidePdfWr">
                <PDF file="/Content/Entities/LessonInfo/32/ua/presentation.pdf"
                     onDocumentComplete={this.onDocumentComplete}
                     onPageComplete={this.onPageComplete}
                     page={this.state.page} />
                {pagination}
            </div>
        )
    }
}



export default MyPdfViewer;
