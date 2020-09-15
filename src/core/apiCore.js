import { API } from "../config";
import queryString from "query-string";
import axios from 'axios';

export const getProducts = async(sortBy) => {
try {
    let response = await axios({
        url: `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
        method: "GET"
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const getCategories = async() => {
try {
    let response = await axios({
        url: `${API}/categories`,
        method: "GET"
    });

    return response.data;

} catch(err){
    console.log(err);
}}

export const getFilteredProducts = async(skip, limit, filters = {}) => {
try {
    const data = {
        limit,
        skip,
        filters
    };
    let response = await axios({
        url: `${API}/products/by/search`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const list = async(params) => {
try {
    const query = queryString.stringify(params);
    console.log("query", query);
    let response = await axios({
        url: `${API}/products/search?${query}`,
        method: "GET"
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const read = async(productId) => {
try {
    let response = await axios({
        url: `${API}/product/${productId}`,
        method: "GET"
    });
    return response.data;

} catch(err){
    console.log(err);
}}

export const listRelated = async(productId) => {
try {
    let response = await axios({
        url: `${API}/products/related/${productId}`,
        method: "GET"
    });
    return response.data;

} catch(err) {
    console.log(err);
}}


export const processPayment = async( token, paymentData) => {
try {
    let response = await axios({
        url: `${API}/stripe/payment`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(paymentData)
    });
    console.log(`This is the result: ${response.data}`);
    console.log(`This is the result: ${response.status}`);
    return response.data;

} catch(err) {
    console.log(err);
}}

export const createOrder = async( token, createOrderData) => {
try {
    let response = await axios({
        url: `${API}/order/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({ order: createOrderData })
    });
    return response.data;

} catch(err) {
    console.log(err);
}}
