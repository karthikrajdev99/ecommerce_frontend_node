/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = async() => {
    try{
        let data = await getProducts('sold')

            console.log(`the value of data is :  ${data}`);

            setProductsBySell(data);

    }catch(error){
        setError(error)
    }}

    const loadProductsByArrival = async() => {
    try {
        let data = await getProducts('createdAt')

            setProductsByArrival(data)

    } catch(error) {
        setError(error);
    }}

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    if(!productsByArrival) {
        return null
    }

    if(!productsBySell) {
        return null
    }

    return (
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival && productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell && productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
