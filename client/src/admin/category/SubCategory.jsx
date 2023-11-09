import React, { useRef, useState, useEffect } from 'react';
import "../createNewProduct/NewProductForm.css";
import { createProductAsync } from '../../features/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { createSubCategoryTypeAsync, getSubCategoryTypeAsync } from '../../features/categorySlice';

const SubCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filteredCategoriesType, setFilteredCategoriesType] = useState([]);

    // getting all categories here
    const categories = useSelector((state) => state.category.categories);
    // console.log('categories', categories);

    // getting all category-types here
    const categoriesType = useSelector((state) => state.category.categoriesType);
    // console.log('categoriesType', categoriesType);

    // getting all subcategory-types here
    const subCategoryTypes = useSelector((state) => state.category.subCategoryTypes);
    console.log('subCategoryTypes', subCategoryTypes);

    const [formdata, setFormdata] = useState({
        category: '',
        categoryType: '',
        name: '',
    });

    useEffect(() => {
        setFilteredCategoriesType(categoriesType.filter(type => type.category === formdata.category));
    }, [formdata.category, categoriesType]);

    useEffect(() => {
        if (formdata.category && formdata.categoryType) {
            dispatch(getSubCategoryTypeAsync({ category: formdata.category, categoryType: formdata.categoryType }));
            console.log(formdata.category, formdata.categoryType);
        }
    }, [formdata.category, formdata.categoryType, dispatch]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormdata({
            ...formdata,
            category: selectedCategory,
            categoryType: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const handleCategoryTypeChange = (e) => {
        setFormdata({
            ...formdata,
            categoryType: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(createSubCategoryTypeAsync(formdata));
            console.log(formdata);
            // navigate("/adminmainpage");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        try {
            dispatch(deleteCategoryTypeAsync({ id: id }))
                .then(() => {
                    const categoryIds = categories.map((item) => item.id);
                    dispatch(getCategoryTypeAsync({ category: categoryIds }));
                })
            console.log(categories);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="NewProductForm py-4 shadow">
                <section className="container NewProductForm-cont py-3">
                    <h3 className='fs-1 text-center py-2'>Sub Category</h3>

                    <div className="row mx-0">
                        <div className="col-md-12">
                            <form method="post">

                                {/* FIRST ROW */}
                                <div className="row mx-0 my-3">
                                    <div className="col-md-4">
                                        <select
                                            className='newproduct-input'
                                            name="category"
                                            value={formdata.category}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className='newproduct-input'
                                            name="categoryType"
                                            value={formdata.categoryType}
                                            onChange={handleCategoryTypeChange}
                                        >
                                            <option value="">Select a category type</option>
                                            {filteredCategoriesType.length > 0 ? (
                                                filteredCategoriesType.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>
                                                    No category types available
                                                </option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="name"
                                            placeholder='Subcategory Name'
                                            value={formdata.name}
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
                                        <th scope="col">Category</th>
                                        <th scope="col">CategoryType</th>
                                        <th scope="col">Sub Category</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    {subCategoryTypes.map((subCategoryType) => (
                                        <tr key={subCategoryType.id}>
                                            <td>{subCategoryType.category}</td>
                                            <td>{subCategoryType.categoryType}</td>
                                            <td>{subCategoryType.name}</td>
                                            <td>
                                                <div className="action_buttons">
                                                    <i className="fa-solid fa-pen-to-square fs-4 px-2"></i>
                                                    <i className="fa-solid fa-trash fs-4 px-2" onClick={() => handleDelete(subCategoryType.id)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SubCategory

