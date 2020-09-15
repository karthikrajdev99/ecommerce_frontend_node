import { API } from "../config";
import axios from 'axios';

export const read = async( token) => {
try {
    let response = await axios({
        url: `${API}/user`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const update = async( token, user) => {
try {
    let response = await axios({
        url: `${API}/user`,
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(user)
    });
    return response.data;

} catch(err) {
    console.log(err);
}}

export const updateUser = (user, next) => {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    };

export const getPurchaseHistory = async( token) => {
try {
    let response = await axios({
        url: `${API}/orders/by/user`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;

} catch (err) {
    console.log(err);
}}
