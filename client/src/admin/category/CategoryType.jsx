import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryAsync, createCategoryTypeAsync, getCategoryTypeAsync, deleteCategoryTypeAsync } from '../../features/categorySlice';
import "../createNewProduct/NewProductForm.css";
import "./Category.css";

const CategoryType = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        category: '',
        image: '',
        name: '',
    });


    const handleItemClick = (itemId) => {
        navigate(`/updatecategorytype/${itemId}`);
        window.scrollTo(0, 0);
    };

    // CALL TO GET CATEGORIES HERE -->
    useEffect(() => {
        dispatch(getCategoryAsync());
    }, []);


    //GET CATEGORY   &&   CATEGORY - TYPE
    const categories = useSelector((state) => state.category.categories);
    const categoryTypes = useSelector((state) => state.category.categoriesType);
    // console.log('categoryTypes', categoryTypes);


    // HERE WE EXTRACT THE ID FROM CATEGORY AND GIVE TO CATEGORY-TYPE 
    useEffect(() => {
        const extractIds = () => {
            return categories.map((item) => item.id)
        }
        const categoryIds = extractIds(categories);
        dispatch(getCategoryTypeAsync({ category: categoryIds }))
    }, [dispatch])




    // This function is called when the selected category changes
    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setCategory({
            ...category,
            category: selectedCategoryId,
        });
        if (selectedCategoryId) {
            dispatch(getCategoryTypeAsync({ category: selectedCategoryId }));
        }
    };


    // HANDLE IMAGE CHANGE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    // THIS FUNCTION CONVERT IMAGE TO BASE64
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCategory({ ...category, image: reader.result });
        };
    };

    // HANDLE RESET IMAGE
    const resetImage = () => {
        setCategory({ ...category, image: '' });
        fileInputRef.current.value = '';
    };


    const handleInputChange = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const categoryTypeData = {
            category: category.category,
            image: category.image,
            name: category.name,
        };

        try {
            dispatch(createCategoryTypeAsync(categoryTypeData))
                .then(() => {
                    // here we refresh the list of category
                    const categoryIds = categories.map((item) => item.id);
                    dispatch(getCategoryTypeAsync({ category: categoryIds }));

                    setCategory({
                        category: '',
                        image: '',
                        name: '',
                    });

                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                })
        } catch (error) {
            console.log(error);
        }
    };

    // HANDLE DELETE
    const handleDelete = (id) => {
        try {
            dispatch(deleteCategoryTypeAsync({ id: id }))
                .then(() => {
                    const categoryIds = categories.map((item) => item.id);
                    dispatch(getCategoryTypeAsync({ category: categoryIds }));
                })
            // console.log(category);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="NewProductForm py-4 shadow">
                <section className="container NewProductForm-cont py-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/adminmainpage" className='text-decoration-none text-dark'>Admin Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/category" className='text-decoration-none text-dark'>Category</Link></li>
                            <li className="breadcrumb-item active text-dark" aria-current="page">Category Type</li>
                        </ol>
                    </nav>
                    <h3 className='fs-1 text-center py-2'>Category Type</h3>

                    <div className="row mx-0">
                        <div className="col-md-12">
                            <form method="post">
                                <div className="row mx-0 mb-2 d-flex justify-content-center align-item-center">
                                    {category.image ? (
                                        <div className="col-md-2 py-3 product-displayer-cont">
                                            <div className="product-displayer">
                                                <img
                                                    src={category.image}
                                                    alt="Selected"
                                                    width="200px"
                                                    height="300px"
                                                />
                                            </div>
                                            <button className="btn change-image-text" onClick={resetImage}>
                                                Change Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="col-md-12 text-center py-3 d-flex justify-content-center align-item-center">
                                            <label className="custum-file-upload ps-2" htmlFor="file">
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                                                </div>
                                                <div className="text">
                                                    <span>Click to upload image</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* FIRST ROW */}
                                <div className="my-3 categoryType-fields">
                                    <div className="right-input">
                                        <select
                                            className='newproduct-input py-2'
                                            name="category"
                                            value={category.category}
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
                                    <div className="left-input">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="name"
                                            placeholder='Category Type Name'
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
                        <div className="admin_order_list-body py-4 table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Category Name</th>
                                        <th scope="col">Category Type</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        Array.isArray(categoryTypes) &&
                                        categoryTypes
                                            .filter((type) => type.category === cat.id)
                                            .map((categoryType) => (
                                                <tr key={categoryType.id}>
                                                    <td className='py-2'>{cat.name}</td>
                                                    <td>
                                                        {categoryType.name}
                                                    </td>
                                                    <td>
                                                        <div className="action_buttons">
                                                            <i onClick={() => handleItemClick(categoryType.id)} className="fa-solid fa-pen-to-square fs-5 px-2"></i>
                                                            <i className="fa-solid fa-trash fs-5 px-2 mx-2" onClick={() => handleDelete(categoryType.id)}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    ))}
                                </tbody>
                            </table>


                            <div className="navigate-bar pt-2 d-flex justify-content-between align-item-center">
                                <Link to="/category" className="px-3 fs-5 text-decoration-none text-dark">&#8672; Go to Category</Link>
                                <Link to="/subcategory" className="px-3 fs-5 text-decoration-none text-dark">Go to Sub Categories &#8674;</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default CategoryType
