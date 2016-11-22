import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import RegistrationSaleForm from '../components/Account/RegistrationSaleForm';

import {Link} from 'react-router';
import {Field} from 'redux-form';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)

class RegistrationSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:{

            },
            page: 1,
            selectProduct:{
                id: 0,
                amount: 1,
            }

        };
    }
    componentDidMount() {
        this.props.actions.getRegistSales();

    }



    render() {


            return (
                <div className="page registration-sale">
                    <nav className="top-nav">
                        <Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>
                        <Link to='/school' activeClassName='active'>smartschool</Link>
                        <Link to='/' activeClassName=''>samsung+</Link>
                        <Link to='/account' activeClassName=''>особистий кабінет</Link>
                    </nav>

                    <RegistrationSaleForm
                        //type={this.props.params.type}
                        //forgot={this.state.forgotForm}
                    />

                </div>
            )


    }
}


function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(RegistrationSale);