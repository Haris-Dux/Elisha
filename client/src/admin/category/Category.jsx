import React, { useEffect, useRef, useState } from 'react';
import "../createNewProduct/NewProductForm.css";
import "./Category.css";
import { createProductAsync } from '../../features/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { createCategoryAsync, deleteCategoryAsync, getCategoryAsync } from '../../features/categorySlice';


const Category = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getCategoryAsync());
    // }, []);

    const categories = useSelector((state) => state.category.categories);
    console.log('Main categories', categories);

    const [category, setCategory] = useState({
        name: '',
    });

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
                                                    <i className="fa-solid fa-pen-to-square fs-5 px-2 mx-2"></i>
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
                </section>
            </div>
        </>
    );
}

export default Category

