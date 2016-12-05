import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Button from '../Button/Button';
import * as actions from '../../actions';

const BuyProduct1 = (props) => {
    const {imageURL, name, countProducts, price, onClick, idProduct, buyProduct, handleSubmit, minusProduct,plusProduct, children} = props;

    const current = countProducts[idProduct]
   // console.log(countProducts, current, idProduct)
    return (

        <div className='buy-product' onSubmit={handleSubmit}>

            <div className="left-part">
                <img src={`${imageURL}`} alt="product"/>
            </div>
            <div className="right-part">
                <div className="product-name">
                    <h6>{name}</h6>
                </div>

                <p>{price} балів</p>

                <div className="counter">
                    <div className="minus-count" onClick={minusProduct}>
                        <span></span>
                    </div>
                    {/*console.log( idProduct)*/}
                    <p><span>{!current?0:current} шт.</span> </p>

                    <div className="plus-count" onClick={plusProduct}>
                        <span></span>
                    </div>
                </div>

                <Button type={'main'} onClick={buyProduct}>
                    купити
                </Button>
            </div>

        </div>



    )
};
BuyProduct1.defaultProps = {
    nameProduct: 'nameProduct',
    countProducts: 0,
    current:0

};
// Make ESLint happy again: add validation to props
BuyProduct1.propTypes = {
    nameProduct: PropTypes.string,
    imgPath: PropTypes.string,
    plusProduct:PropTypes.func,
    minusProduct:PropTypes.func,
   // countProducts:PropTypes.number,
};








export default BuyProduct1;


