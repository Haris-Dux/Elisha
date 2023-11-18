import React, { useRef, useState, useEffect } from 'react';
import "../createNewProduct/NewProductForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { createSubCategoryTypeAsync, deleteSubCategoryTypeAsync, getSubCategoryTypeAsync } from '../../features/categorySlice';
import { Link, useNavigate } from 'react-router-dom';

const SubCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filteredCategoriesType, setFilteredCategoriesType] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const categories = useSelector((state) => state.category.categories);
    const categoriesType = useSelector((state) => state.category.categoriesType);
    // const subCategoryTypes = useSelector((state) => state.category.subCategoryTypes);


   

    const [formdata, setFormdata] = useState({
        category: '',
        categoryType: '',
        name: '',
    });

    const handleItemClick = (itemId) => {
        navigate(`/updatesubcategorytype/${itemId}`);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        setFilteredCategoriesType(categoriesType.filter(type => type.category === formdata.category));
    }, [formdata.category, categoriesType]);

    useEffect(() => {
        if (formdata.category && formdata.categoryType) {
            dispatch(getSubCategoryTypeAsync({ category: formdata.category, categoryType: formdata.categoryType }))
                .then((result) => {
                    setSubCategories(result.payload.subCategoryData);
                })
                .catch((error) => {
                    console.error('Error fetching subcategories:', error);
                });
        }
    }, [formdata.category, formdata.categoryType, dispatch]);


    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormdata({
            ...formdata,
            category: selectedCategory,
            categoryType: '',
        });
        // Clear subcategories when the category changes
        setSubCategories([]);
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
            dispatch(createSubCategoryTypeAsync(formdata))
                .then(() => {
                    dispatch(getSubCategoryTypeAsync({ category: formdata.category, categoryType: formdata.categoryType }))
                        .then((result) => {
                            setSubCategories(result.payload.subCategoryData);
                        })
                })
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        try {
            dispatch(deleteSubCategoryTypeAsync({ id: id }))
                .then(() => {
                    dispatch(getSubCategoryTypeAsync({ category: formdata.category, categoryType: formdata.categoryType }))
                        .then((result) => {
                            setSubCategories(result.payload.subCategoryData);
                        })
                        .catch((error) => {
                            console.error('Error fetching subcategories after deletion:', error);
                        });
                })
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="NewProductForm py-4 shadow">
                <section className="container NewProductForm-cont py-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/adminmainpage" className='text-decoration-none text-dark'>Admin Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/category" className='text-decoration-none text-dark'>Category</Link></li>
                            <li className="breadcrumb-item"><Link to="/categorytype" className='text-decoration-none text-dark'>Category Type</Link></li>
                            <li className="breadcrumb-item active text-dark" aria-current="page">Sub Category</li>
                        </ol>
                    </nav>
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
                                <tbody>
                                    {Array.isArray(subCategories) && subCategories.map((subCategory) => (
                                        <tr key={subCategory.id}>
                                            <td>
                                                {/* Map the category ID to its name */}
                                                {categories.find(cat => cat.id === subCategory.category)?.name || 'Unknown'}
                                            </td>
                                            <td>
                                                {/* Map the category type ID to its name */}
                                                {categoriesType.find(type => type.id === subCategory.categoryType)?.name || 'Unknown'}
                                            </td>
                                            <td>{subCategory.name}</td>
                                            <td>
                                                <div className="action_buttons">
                                                    <i onClick={() => handleItemClick(subCategory.id)} className="fa-solid fa-pen-to-square fs-5 px-2"></i>
                                                    <i className="fa-solid fa-trash fs-5 px-2" onClick={() => handleDelete(subCategory.id)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SubCategory;
