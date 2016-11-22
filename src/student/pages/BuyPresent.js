import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import Button from '../components/Button/Button';
import BuyProduct1 from '../components/Account/BuyProduct1';
import {Link} from 'react-router';
import {Field} from 'redux-form';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)

class BuyPresent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:{

            },
            page: 1,
            selectProduct:{
                id: 0,
                amount: 0,
            }

        };
    }
    componentDidMount() {
        this.props.actions.getScoreTotal();
       // this.props.actions.getBalance();
        this.props.actions.getPresent();

    }
    componentWillMount() {
        //

    }


    makeObject(){

        //if(this.props.account.isFetching === false ) {

            var arrId = this.props.quiz.presents.product.map(
                (item) => {
                    return (item.id)
                }
            ).reduce(function (object, idProd, item) {
                object[idProd] = 0;
                return object;
            }, {});

            this.setState({products: arrId})
       // }

    }


    plusProduct(data) {
        var account = this.props.account;
        var score = this.props.scoreTotal;
        var balance = score.data.testScore;


        var currentPriceProduct = account.presents.list.map((item)=>{
            if(item.id == data){
                return item.price
            }
        }).filter( item => !!item)[0];
        var ableToBuy = Math.floor(balance/currentPriceProduct) ;

        var availableCount = account.presents.list.map((item)=>{
            if(item.id == data){
                return item.availableCount
            }
        }).filter( item => !!item)[0];

        console.log('availableCount', availableCount,  balance, ableToBuy)
        if (Object.keys(this.state.products).length == 0) {
            var arrId = this.props.account.presents.list.map(
                (item) => {
                    return (item.id)
                }
            ).reduce(function (object, idProd, item) {
                object[idProd] = 0;
                return object;
            }, {});

            for (var idProd in arrId){
                if ( idProd == data && arrId[idProd] < availableCount /*&& arrId[idProd] < ableToBuy*/){
                    arrId[idProd] = arrId[idProd] + 1;

                }
            }
            this.setState({products: arrId})

        }else{

            const prod = this.state.products;

            for (var idProd in prod){
                if ( idProd == data && prod[idProd] < availableCount /*&& prod[idProd] < ableToBuy*/){
                    prod[idProd] = prod[idProd] + 1;
                }

            }
            //console.log('55555', prod)
            this.setState({products: prod})
        }



        this.makeSelectProduct(data)

    }
    makeSelectProduct(data){
        const prod = this.state.products;

       // const selectIdAmount =


        for (var idProd in prod){
            if ( idProd == data & prod[idProd] > 0){
                console.log('product :', data,'how much :', prod[idProd])
                let selectProd = {
                    id: data,
                    amount: prod[idProd],
                }
                this.setState({selectProduct:selectProd})
            }else{
                console.log('------')
            }
        }
    }
    minusProduct(data) {

            const prod = this.state.products;
            for (var idProd in prod){
                 if ( idProd == data && prod[idProd] > 0){
                     prod[idProd] = prod[idProd] - 1;
                 }
            }

            this.setState({products: prod})
            this.makeSelectProduct(data)
    }

    buyProduct(data){
        if(this.state.selectProduct.amount > 0){
            this.setState({page:2})
        }

    }

    sendBoughtProduct(){
        this.props.actions.sendProductShop({
            id:this.state.selectProduct.id,
            amount:this.state.selectProduct.amount
        })
        //console.log( this);
        this.setState({page:3})
    }
    goToElaboration(){
        this.setState({buyPage:true})
    }
    submitBuy(result) {
          //console.log(result);
    }


    render() {
        const account = this.props.account;

        const isFetching = this.props.account.isLoadProduct;
        //var presents = [];
        if(isFetching == true){
            //console.log('0000')
            //var presents = this.props.quiz.presents.product;
        }


        if(isFetching === false ){
            var presents = this.props.account.presents.list;
            //console.log(isFetching, presents);

            const idSelectProduct = this.state.selectProduct.id;
            var nameSelectProduct = presents.map( item => {
                //console.log('item.id :', item.id, idSelectProduct);
                if(item.id == idSelectProduct){
                    return (
                        item.name

                    )
                }
            }).filter( item => !!item)[0]
            //console.log( nameSelectProduct);

        }

        const products = this.state.products;





        //console.log('nameSelectProduct :', nameSelectProduct);
        //const nameId = presents.id;
        return(
            <div className="page buy-present">
                <nav className="top-nav">
                    <Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>
                    <Link to='/school' activeClassName='active'>smartschool</Link>
                    <Link to='/' activeClassName=''>samsung+</Link>
                    <Link to='/account' activeClassName=''>особистий кабінет</Link>
                </nav>

                {
                    this.state.page == 1 && (
                        <div>
                            <h3>Придбати подарунок</h3>
                            <p>Lorem ipsum dolor sit amet adipiscing</p>

                            <div className="presents-wr">
                                {
                                    (isFetching === false && presents.length > 0) && (

                                            presents.map( (item, num)=> {
                                            return(
                                                <BuyProduct1
                                                    key= {num}
                                                    idProduct = {item.id}
                                                    name={item.name}
                                                    imageURL={item.imageUrl}
                                                    price={item.price}
                                                    countProducts={products}
                                                    //onClick={() => {this.upDataCount()}}

                                                    plusProduct={this.plusProduct.bind(this, item.id)}
                                                    minusProduct={this.minusProduct.bind(this, item.id)}
                                                    buyProduct={this.buyProduct.bind(this, item.id)}


                                                />

                                            )
                                        })

                                    )
                                }


                            </div>
                        </div>
                    )
                }
                {
                    this.state.page == 2  &&(
                        <div className="agreePage">
                            <h3 >Оформити придбання<br/>
                                {nameSelectProduct} у кількості {this.state.selectProduct.amount} одиниць? </h3>


                            <div className="wr-btn">
                                <Button type={'white'}
                                        onClick={() =>  this.setState({page:1})}
                                        children="відмінити"/>

                                <Button type="main"
                                        onClick={::this.sendBoughtProduct}
                                        children="так"/>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.page == 3 && account.resultBuying === true && (
                        <div className="thankYouPage">
                            <h3 >Дякуємо!<br/>
                                Ви успішно замовили подарунок!</h3>


                            <div className="wr-btn">
                                <Button type={'white'}
                                        onClick={() =>  this.setState({page:1})}
                                        children="продовжити"/>


                            </div>
                        </div>
                    )
                }
                {
                    this.state.page == 3 && account.resultBuying === 'too_expensive'  && (
                        <div className="thankYouPage">
                            <h3 >В Вас не вистачає зароблених балів.</h3>


                            <div className="wr-btn">
                                <Button type={'white'}
                                        onClick={() =>  this.setState({page:1})}
                                        children="продовжити"/>


                            </div>
                        </div>
                    )
                }
                {
                    this.state.page == 3 && account.resultBuying === 'unavailable'  && (
                        <div className="thankYouPage">
                            <h3 >Щось пішло не так, спробуте спочатку.</h3>


                            <div className="wr-btn">
                                <Button type={'white'}
                                        onClick={() =>  this.setState({page:1})}
                                        children="продовжити"/>


                            </div>
                        </div>
                    )
                }
                {
                    this.state.page == 3 && account.resultBuying === 'invalid'  && (
                        <div className="thankYouPage">
                            <h3 >Щось пішло не так, спробуте спочатку.</h3>


                            <div className="wr-btn">
                                <Button type={'white'}
                                        onClick={() =>  this.setState({page:1})}
                                        children="продовжити"/>


                            </div>
                        </div>
                    )
                }




            </div>

        )
    }
}


function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(BuyPresent);