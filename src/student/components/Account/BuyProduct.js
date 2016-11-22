import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Button from '../Button/Button';
import * as actions from '../../actions';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)

//const BuyProduct = ({ onClick, nameProduct, points, imgPath, children, ...other }) => (
export default class BuyProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countPresent: 1,

        }
    }

    static propTypes = {

        nameProduct: React.PropTypes.string,
        onClick: React.PropTypes.func,
        points: React.PropTypes.number,
        imgPath: React.PropTypes.string,

    };
    static defaultProps = {
        type: 'default',
    };

    submitBuy(result){
        console.log(result, );

    }
    minusCount() {
        this.setState({countPresent: this.state.countPresent-1})
    }
    plusCount() {
        this.setState({countPresent: this.state.countPresent+1})
    }
    render() {


        return(
            <div className='buy-product'>

                <div className="left-part">
                    <img src={`${imgPath}`} alt="product"/>
                </div>
                <div className="right-part">
                    <h6>{nameProduct}</h6>
                    <p>{this.props.points} балів</p>

                    <div className="counter">
                        <div className="minus-count" onClick={this.minusCount}></div>
                        <p><span>{this.state.countPresent} шт.</span> </p>
                        <div className="plus-count" onClick={this.plusCount}></div>
                    </div>

                    <Button type={'main'} onClick={::this.submitBuy}>
                        купити
                    </Button>
                </div>

            </div>
        )
    }
}


