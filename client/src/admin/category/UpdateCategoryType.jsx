import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "../createNewProduct/NewProductForm.css";
import { getCategoryAsync, getCategoryTypeAsync, updateCategoryTypeAsync } from '../../features/categorySlice';

const UpdateCategoryType = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const categories = useSelector((state) => state.category.categories);
    const categoriesType = useSelector((state) => state.category.categoriesType);

    useEffect(() => {
        dispatch(getCategoryAsync());
    }, [dispatch]);

    const [category, setCategory] = useState({
        id: '',
        name: '',
        image: '',
        category: '',
    });

    useEffect(() => {
        dispatch(getCategoryTypeAsync({ category: id }));
    }, [dispatch, id]);

    useEffect(() => {
        const categoryTypeById = Array.isArray(categoriesType) ? categoriesType.find((item) => item.id === id) : null;

        if (categoryTypeById) {
            setCategory({
                ...categoryTypeById,
            });
        }
    }, [id, categoriesType]);


    const handleCategoryChange = (selectedOption) => {
        setCategory({ ...category, category: selectedOption.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCategory({ ...category, image: reader.result });
        };
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const resetImage = () => {
        setCategory({ ...category, image: '' });
        fileInputRef.current.value = '';
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (category.image instanceof Object) {
                const base64Image = null;
                setCategory((prev) => ({
                    ...prev,
                    image: base64Image,
                }));
                console.log(category);
                dispatch(updateCategoryTypeAsync({ ...category, image: base64Image }));
            } else {
                dispatch(updateCategoryTypeAsync(category))
                console.log(category);
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <section className="NewProductForm py-4">
                <div className="container NewProductForm-cont py-3">
                    <h3 className='fs-1 text-center py-2'>Update Category Type</h3>

                    <div className="row mx-0">
                        <div className="col-md-12">
                            <form method="post">

                                {/* IMAGE DISPLAYER */}
                                <div className="row mx-0 mb-2">
                                    {category.image ? (
                                        <div className="py-3 product-displayer-cont">
                                            <div className="product-displayer">
                                                <img
                                                    src={category.image.secure_url || category.image}
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
                                <div className="d-flex justify-content-center my-3">
                                    <div className="mt-1 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className='newproduct-input select'
                                            name="category"
                                            value={category.category}
                                            onChange={(e) => handleCategoryChange({ value: e.target.value })}
                                        >
                                            <option>-- Select Category --</option>
                                            {categories.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 mx-3">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="name"
                                            placeholder='Category Type Name'
                                            value={category.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="update-btns-bar pt-4 my-3 d-flex flex-row justify-content-center">
                                    <button type="submit" onClick={handleUpdate} className='add-product-submit-btn shadow mx-3'>Update Category</button>
                                    {/* <span className='add-product-submit-btn shadow mx-3' style={{ cursor: "pointer" }} onClick={handleDelete}>Delete Product</span> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}

export default UpdateCategoryType;
