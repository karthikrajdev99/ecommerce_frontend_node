import { API } from '../config';
import axios from 'axios';

export const signup = async(user) => {
try {
    let response = await axios({
        url: `${API}/signup`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(user)
    });
    return response.data;
        
} catch(err) {
    console.log(err);
}}

export const signin = async(user) => {
try {
    let response = await axios({
        url: `${API}/signin`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(user)
    });
    return response.data;
        
} catch(err) {
    console.log(err);
}}

export const authenticate = (data, next) => {

        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    
};

export const signout = async(user) => {
try {

        let response = await axios({
            url: `${API}/signout`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(user)
        });

        localStorage.removeItem('jwt');

        return response.data;
            
} catch(err) {
    console.log(err);
}}

export const isAuthenticated = () => {

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
