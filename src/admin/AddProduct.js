/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const [file, setFile] = useState("");

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        sold: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        sold,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = async() => {
    try {
        let data = await getCategories()
        setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
    } catch(error) {
        setValues({ ...values, error: error });
    }}

    useEffect(() => {
        init();
    }, []);


    const submitPhoto = async (event) => {
    try {
        event.preventDefault();
        const selectedFile = event.target.files && event.target.files[0];
        const fileSizeLimit = 1000000; // 1mb
    
        if (selectedFile && selectedFile.size > fileSizeLimit) {
            setValues({ ...values, error: `${selectedFile.name}: File size too large`});
            } else {
            setFile(selectedFile);
            }
            console.log(selectedFile);

            formData.append('file', selectedFile)
            formData.append("resource_type", "image");
            formData.append("upload_preset", "ivqhad88");
            formData.append("cloud_name", "dcsfqnqrb");
            console.log(`${formData}`)
            let tor = await axios.post(
                "https://api.cloudinary.com/v1_1/dcsfqnqrb/image/upload",
                formData
                    );
            const imageurl = tor.data.url
            console.log(formData)
            console.log(`${imageurl}`)
            formData.set('photo', imageurl);
            setValues({ ...values, photo: imageurl});
    } catch(error) {
        console.log(error);
    }};


    const handleChange = name => event => {

        const value = name === 'photo'&&'file' ? !event.target.value : event.target.value

        console.log(value);
        formData.set(name, value);
        console.log(formData);
        setValues({ ...values, [name]: value });
        console.log(formData);
        console.log(values);
    };

    const clickSubmit = event => {
    try {
        event.preventDefault();
        console.log(formData);
        setValues({ ...values, error: '', loading: true });
        let data = createProduct( token, values)
        console.log(formData);


        setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    sold:'',
                    loading: false,
                    createdProduct: data.name
                });

            }
            catch (error) {
                setValues({ ...values, error: error });
            
            }
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" name="photo" accept="image/*" onChange={submitPhoto}/>
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option >Please select</option>
                    {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <div className="form-group">
                <label className="text-muted">Sold</label>
                <input onChange={handleChange('sold')} type="number" className="form-control" value={sold} />
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
