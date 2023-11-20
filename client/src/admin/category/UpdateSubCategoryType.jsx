import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../createNewProduct/NewProductForm.css';
import {
    getCategoryAsync,
    getCategoryTypeAsync,
    getSubCategoryTypeAsync,
    updateSubCategoryTypeAsync,
} from '../../features/categorySlice';


const UpdateSubCategoryType = () => {
    const { id: subCategoryId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector((state) => state.category.categories);
    const categoryTypes = useSelector((state) => state.category.categoriesType);
    const subCategories = useSelector((state) => state.category.subcategoriesType);

    const [category, setCategory] = useState({
        id: '',
        name: '',
        category: '',
        categoryType: '',
    });

    // Fetch categories
    useEffect(() => {
        dispatch(getCategoryAsync());
    }, [dispatch]);


    useEffect(() => {
        const categoryIds = categories.map((item) => item.id);
        dispatch(getCategoryTypeAsync({ category: categoryIds }));
    }, [dispatch, categories]);


    useEffect(() => {
        if (Array.isArray(subCategories) && subCategories.length > 0) {
            const subCategoryById = subCategories.find((item) => item.id === subCategoryId);
            if (subCategoryById) {
                setCategory({
                    ...subCategoryById,
                });
                dispatch(getCategoryTypeAsync({ category: subCategoryById.category }));
            }
        }
    }, [subCategoryId, subCategories]);




    const handleCategoryChange = (selectedOption) => {
        setCategory({ ...category, category: selectedOption.value });
        // Fetch category types based on the selected category
        dispatch(getCategoryTypeAsync({ category: selectedOption.value }));
    };

    const handleCategoryTypeChange = (selectedOption) => {
        setCategory({ ...category, categoryType: selectedOption.value });
    };

    // HANDLE INPUT CHANGE
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    // HANDLE UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateSubCategoryTypeAsync(category))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="NewProductForm py-4">
                <div className="container NewProductForm-cont py-3">
                    <h3 className="fs-1 text-center py-2">Update Sub Category</h3>

                    <div className="row mx-0 pt-5">
                        <div className="col-md-12">
                            <form method="post">
                                <div className="d-flex justify-content-center my-3">
                                    <div className="mx-3 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className="newproduct-input select"
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
                                    <div className="mx-2 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className="newproduct-input select"
                                            name="categoryType"
                                            value={category.categoryType}
                                            onChange={(e) => handleCategoryTypeChange({ value: e.target.value })}
                                        >
                                            <option>-- Select Category Type --</option>
                                            {Array.isArray(categoryTypes) && categoryTypes.length > 0 ? (
                                                categoryTypes.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>-- No Category Types available --</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-4 mx-3">
                                        <input
                                            className="newproduct-input"
                                            type="text"
                                            name="name"
                                            placeholder="Sub Category Name"
                                            value={category.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="update-btns-bar pt-4 my-3 d-flex flex-row justify-content-center">
                                    <button type="submit" onClick={handleUpdate} className="add-product-submit-btn shadow mx-3">
                                        Update Sub Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateSubCategoryType;
