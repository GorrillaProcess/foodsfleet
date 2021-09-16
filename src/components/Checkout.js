import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions';
import Error from './Error';
import Loading from './Loading';
import Success from './Success';


export default function Checkout({subtotal}) {
    const orderstate = useSelector(state => state.placeOrderReducer)
    const {loading,error,success} = orderstate
    const dispatch = useDispatch()
    function tokenHandler(token){
        console.log(token);
        dispatch(placeOrder(token,subtotal))
    }
    return (
        <div>
            {loading && (<Loading/>)}
            {error && (<Error error="Something went wrong"/>)}
            {success && (<Success success="Your order placed successfully"/>)}
            <StripeCheckout
            amount={subtotal*100}  
            shippingAddress
            token={tokenHandler} 
            stripeKey='pk_test_51J7UA6AIRhRuNmBjXIzi83FNOdkDbxK4CRfnrWbCgbr2tpCGhfuHYg23J9vprOb26eWgodSwjPsbs8qVb7h1wG3Y00gVORc06v'
            currency='BGN'          
            >
                <button className="btn">Pay Now</button>
            </StripeCheckout>
        </div>
    )
}
