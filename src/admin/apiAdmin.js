import { API } from '../config';
import axios from 'axios';

export const createCategory = async( token, category) => {
try {
    let response = await axios({
        url: `${API}/category/create`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(category)
    });
    return response.data;
        
} catch(err) {
    console.log(err);
}};



export const deleteCategory = async(categoryId, token) => {
    try {
        let response = await axios({
            url: `${API}/category/${categoryId}`,
            method: 'DELETE',
            headers: {
                // content type?
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },

        });
        return response.data;

    } catch(err) {
        console.log(err);
    }};

export const createProduct = async( token, product) => {
try {
    let response = await axios({
        url: `${API}/product/create`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(product)
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const getCategory = async(categoryId) => {
try {
    let response = await axios({
        url: `${API}/category/${categoryId}`,
        method: 'GET'
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const getCategories = async() => {
try {
    let response = await axios({
        url: `${API}/categories`,
        method: 'GET'
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const listOrders = async( token) => {
try {
    let response = await axios({
        url: `${API}/order/list`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const getStatusValues = async( token) => {
try {
    let response = await axios({
        url: `${API}/order/status-values`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const updateOrderStatus = async( token, orderId, status) => {
try {
    let response = await axios({
        url: `${API}/order/${orderId}/status`,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({ status, orderId })
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = async() => {
try {
    let response = await axios({
        url: `${API}/products?limit=undefined`,
        method: 'GET'
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const deleteProduct = async(productId, token) => {
try {
    let response = await axios({
        url: `${API}/product/${productId}`,
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const getProduct = async(productId) => {
try {
    let response = await axios({
        url: `${API}/product/${productId}`,
        method: 'GET'
    });
    return response.data;

} catch(err) { 
    console.log(err)
}};

