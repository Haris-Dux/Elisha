import React, { useEffect, useRef, useState } from 'react';
import "../createNewProduct/NewProductForm.css";
import "./Category.css";
import { createProductAsync } from '../../features/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { createCategoryAsync, deleteCategoryAsync, getCategoryAsync, updateCategoryAsync } from '../../features/categorySlice';


const Category = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [category, setCategory] = useState({
        name: '',
    });

    //  Track the selected category for update
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // Open the modal with the selected category name
    const handleUpdateClick = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setCategory({
            name: categoryName,
        });
    };

    // Update the category name in the modal
    const handleModalInputChange = (event) => {
        setCategory({
            ...category,
            name: event.target.value,
        });
    };

    // Dispatch the updateProductAsync thunk with the updated category information
    const handleUpdateCategory = () => {
        try {
            // Dispatch the updateProductAsync thunk with the updated category information
            dispatch(updateCategoryAsync({
                id: selectedCategoryId,
                name: category.name,
            })).then(() => {
                // Fetch the updated category list after the update
                dispatch(getCategoryAsync());
                // Close the modal
                setSelectedCategoryId(null);
                setCategory({ name: '' });
            });
        } catch (error) {
            console.log(error);
        }
    };









    // handle Input Change
    const handleInputChange = (event) => {
        setCategory({
            ...category,
            name: event.target.value,
        });
    };

    // handle Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(createCategoryAsync(category))
                .then(() => {
                    dispatch(getCategoryAsync());
                    setCategory({ name: '' });
                })
            console.log(category);
        } catch (error) {
            console.log(error);
        }
    };

    // handle delete
    const handleDelete = (id) => {
        try {
            dispatch(deleteCategoryAsync({ id: id }))
                .then(() => {
                    dispatch(getCategoryAsync());
                })
            console.log(category);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="NewProductForm pt-4 shadow">
                <section className="container NewProductForm-cont py-2">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/adminmainpage" className='text-decoration-none text-dark'>Admin Home</Link></li>
                            <li className="breadcrumb-item active text-dark" aria-current="page">Category</li>
                        </ol>
                    </nav>
                    <h3 className='fs-1 text-center py-2'>Category</h3>
                    <div className="row mx-0">
                        <div className="col-md-12">
                            <form method="post">
                                {/* FIRST ROW */}
                                <div className="my-3 d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="category"
                                            placeholder='Enter Catrgory Name'
                                            value={category.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>


                                <div className="row mx-0">
                                    <div className="col-md-12 text-center py-3 d-flex justify-content-center align-item-center">
                                        <button type="submit" onClick={handleSubmit} className='add-product-submit-btn shadow'>Add Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="admin_order_list py-2">
                    <div className="container">
                        <div className="admin_order_list-body py-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className='py-2 fs-5' scope="col">Category Name</th>
                                        <th className='py-2 fs-5' scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className='py-2'>{category.name}</td>
                                            <td>
                                                <div className="action_buttons">
                                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onClick={() => handleUpdateClick(category.id, category.name)}>
                                                        <i className="fa-solid fa-pen-to-square fs-5 px-2"></i>
                                                    </button>
                                                    <i className="fa-solid fa-trash fs-5 px-2 mx-2" onClick={() => handleDelete(category.id)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="navigate-bar pt-2 d-flex justify-content-between align-item-center">
                                <Link to="/adminmainpage" className="px-3 fs-5 text-decoration-none text-dark">&#8672; Go to Dashboard</Link>
                                <Link to="/categorytype" className="px-3 fs-5 text-decoration-none text-dark"> Go to Categories Type &#8674;</Link>
                            </div>
                        </div>
                    </div>
                    {/* MODAL */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Category Name</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label fs-5">Category Name:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-modal"
                                                id="recipient-name"
                                                value={category.name}
                                                onChange={handleModalInputChange}
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>Update</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Category

