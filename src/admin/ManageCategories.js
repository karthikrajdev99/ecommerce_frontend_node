import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getCategories, deleteCategory } from "./apiAdmin";

const ManageCategories = () => {
    const [Categories, setCategories] = useState([]);

    const { token } = isAuthenticated();

    const loadCategories = async() => {
    try {
        let data = await getCategories()
        setCategories(data);
        
    } catch(error) {
        console.log(error);
    }}

    const destroy = async(categoryId) => {
    try {
        let data = await deleteCategory(categoryId, token)
        
        loadCategories();
        return data
        
    } catch(error) {
        console.log(error);
    }}

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Layout
            title="Manage Categories"
            description="Perform CRUD on Categories"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {Categories.length} Categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {Categories && Categories.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                
                                <button
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories;
