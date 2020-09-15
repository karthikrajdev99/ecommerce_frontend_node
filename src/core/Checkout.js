import React, { useState } from 'react';
import { processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        
        error: '',
        address: ''
    });


    const authenticator = isAuthenticated() && isAuthenticated().token;



    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
        <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = async(token) => {
    try {
        setData({ loading: true });

        console.log(typeof getTotal(products));
        const Data = getTotal(products);
        console.log(typeof Data); 
        const body = { amount: Data,
                            email:process.env.REACT_APP_STRIPE_EMAIL,
                            token: token
                            };
        console.log(body);

        let response = await processPayment( authenticator, body);

            console.log(response);


        const OrderData = {
                            products: products,
                            transaction_id: response.id,
                            amount: response.amount,
                            address: deliveryAddress
                        };


        let order = await createOrder( authenticator, OrderData)
        
            emptyCart(() => { 
                setRun(!run); // run useEffect in parent Cart
                console.log('payment success and empty cart');
                setData({
                loading: false,
                success: true
                    });
                });
            return order.data
        
            }
            catch(error) {
                console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            }}
        
    

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            { products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    <StripeCheckout 
                    stripeKey={process.env.REACT_APP_STRIPE_KEY} token={buy} amount={getTotal(products)*100} name="Buy Product" email={process.env.REACT_APP_STRIPE_EMAIL}>
                    </StripeCheckout>

                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
    }



export default Checkout;
