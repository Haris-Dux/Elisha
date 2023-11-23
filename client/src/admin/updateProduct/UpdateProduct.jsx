import React, { useRef, useState, useEffect } from 'react';
import "../createNewProduct/NewProductForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductAsync, getProductByIdAsync, updateProductAsync } from '../../features/ProductSlice';
import { getCategoryTypeAsync, getSubCategoryTypeAsync } from '../../features/categorySlice';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [subCategories, setSubCategories] = useState([]);

    const selectedProduct = useSelector((state) => state.product.getProductById);

    const [product, setProduct] = useState({
        name: '',
        image: null,
        itemCode: '',
        fabric: '',
        description: '',
        availableQuantity: '',
        category: '',
        categoryType: '',
        subCategory: '',
        topSales: false,
        discount: false,
        newArrival: false,
        price: '',
        size: [],
        productDetail: '',
    });

    console.log('product', product);

    useEffect(() => {
        dispatch(getProductByIdAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProduct({
                id: selectedProduct.id,
                name: selectedProduct.name,
                image: selectedProduct.image,
                itemCode: selectedProduct.itemCode,
                fabric: selectedProduct.fabric,
                description: selectedProduct.description,
                availableQuantity: selectedProduct.availableQuantity,
                category: selectedProduct.category,
                categoryType: selectedProduct.categoryType,
                subCategory: selectedProduct.subCategory,
                topSales: selectedProduct.topSales,
                discount: selectedProduct.discount,
                newArrival: selectedProduct.newArrival,
                price: selectedProduct.price,
                size: selectedProduct.size,
                productDetail: selectedProduct.productDetail,
            });
        }
    }, [selectedProduct]);

    const categories = useSelector((state) => state.category.categories);
    const categoriesType = useSelector((state) => state.category.categoriesType);


    
    useEffect(() => {
        const categoryIds = categories.map((item) => item.id);
        dispatch(getCategoryTypeAsync({ category: categoryIds }));
    }, [dispatch, categories]);




    useEffect(() => {
        if (product.category && product.categoryType) {
            dispatch(
                getSubCategoryTypeAsync({
                    category: product.category,
                    categoryType: product.categoryType,
                })
            )
                .then((result) => {
                    setSubCategories(result.payload.subCategoryData);
                })
                .catch((error) => {
                    console.error('Error fetching subcategories:', error);
                });
        }
    }, [dispatch, product.category, product.categoryType]);

    const categoryTypeOptions = categoriesType.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const subCategoryOptions = subCategories.map((item) => ({
        value: item.id,
        label: item.name,
    }));


    // Function to find the categoryType name based on id
    const getCategoryTypeName = (categoryId) => {
        const categoryType = categoriesType.find((item) => item.id === categoryId);
        return categoryType ? categoryType.name : 'N/A'; // Display 'N/A' if not found
    };

    // Function to find the subCategory name based on id
    const getSubCategoryName = (subCategoryId) => {
        const subCategory = subCategories.find((item) => item.id === subCategoryId);
        return subCategory ? subCategory.name : 'N/A'; // Display 'N/A' if not found
    };

    const handleCategoryChange = (selectedOption) => {
        setProduct({ ...product, category: selectedOption.value, categoryType: '', subCategory: '' });
        dispatch(getCategoryTypeAsync({ category: selectedOption.value }));
    };

    const handleCategoryTypeChange = (selectedOption) => {
        setProduct({ ...product, categoryType: selectedOption.value, subCategory: '' });
    };

    const handleSubCategoryChange = (selectedOption) => {
        setProduct({ ...product, subCategory: selectedOption.value });
    };

    const handleSizeChange = (e) => {
        const sizeValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                size: [...prevProduct.size, sizeValue],
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                size: prevProduct.size.filter((size) => size !== sizeValue),
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProduct({ ...product, image: reader.result });
        };
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setProduct({
            ...product,
            [name]: newValue,
        });
    };

    const resetImage = () => {
        setProduct({ ...product, image: '' });
        fileInputRef.current.value = '';
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (product.image instanceof Object) {
            const base64Image = null;
            setProduct((prev) => ({
                ...prev,
                image: base64Image,
            }));
            console.log(product);
            dispatch(updateProductAsync({ ...product, image: base64Image }));
        } else {
            dispatch(updateProductAsync(product));
            console.log(product);
        }
    };

    const handleDelete = () => {
        try {
            dispatch(deleteProductAsync({ id: product.id }))
                .then((response) => {
                    console.log('response', response);
                    toast.success('Product Deleted successfully');
                    navigate("/adminmainpage");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Error Deleting product');
                });
        } catch (error) {
            console.error(error);
            toast.error('Error updating product');
        }
    };
    return (
        <>
            <section className="NewProductForm py-4">
                <div className="container NewProductForm-cont py-3">
                    <h3 className='fs-1 text-center py-2'>Update Product</h3>

                    <div className="row mx-0">
                        <div className="col-md-12">
                            <form method="post">

                                {/* IMAGE DISPLAYER */}
                                <div className="row mx-0 mb-2">
                                    {product.image ? (
                                        <div className="py-3 product-displayer-cont">
                                            <div className="product-displayer">
                                                <img
                                                    src={product.image.secure_url || product.image}
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
                                <div className="row mx-0 my-3">
                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="name"
                                            placeholder='Item Name'
                                            value={product.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="itemCode"
                                            placeholder='Item Code'
                                            value={product.itemCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="fabric"
                                            placeholder='Item Fabric'
                                            value={product.fabric}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* SECOND ROW */}
                                <div className="row mx-0 my-3">
                                    <div className="col-md-8">
                                        <input
                                            className='newproduct-input'
                                            type="text"
                                            name="description"
                                            placeholder='Item desc'
                                            value={product.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            className='newproduct-input'
                                            type="number"
                                            name="availableQuantity"
                                            placeholder='Item Quantity'
                                            value={product.availableQuantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* THIRD ROW */}
                                <div className="row mx-0 my-3">
                                    <div className="mt-1 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className='newproduct-input select'
                                            name="category"
                                            value={product.category}
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
                                    <div className="mt-1 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className='newproduct-input select'
                                            name="categoryType"
                                            value={product.categoryType}
                                            onChange={(e) => handleCategoryTypeChange({ value: e.target.value })}
                                        >
                                            <option>-- Select Category Type --</option>
                                            {categoryTypeOptions.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Display the categoryType name */}
                                        {/* <div>{getCategoryTypeName(product.categoryType)}</div> */}
                                    </div>
                                    <div className="mt-1 col-xs-12 col-sm-6 col-md-4">
                                        <select
                                            className='newproduct-input select'
                                            name="subCategory"
                                            value={product.subCategory}
                                            onChange={(e) => handleSubCategoryChange({ value: e.target.value })}
                                        >
                                            <option>-- Select Sub Category --</option>
                                            {subCategoryOptions.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Display the subCategory name */}
                                        {/* <div>{getSubCategoryName(product.subCategory)}</div> */}
                                    </div>
                                </div>

                                {/* FORTH ROW */}
                                <div className="row mx-0 my-3">
                                    <div className="col-md-4">
                                        {/* FORTH ROW ---> LEFT SIDE */}
                                        <div className="row">
                                            <div className="col-md-12 mt-4">
                                                <label className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="topSales"
                                                        checked={product.topSales}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="checkbox-text fs-5">Top Sales</span>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="discount"
                                                        checked={product.discount}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="checkbox-text fs-5">Discount</span>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="newArrival"
                                                        checked={product.newArrival}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="checkbox-text fs-5">New Arrivals</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* FORTH ROW ---> RIGHT SIDE */}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    className='newproduct-input'
                                                    type="number"
                                                    name="price"
                                                    placeholder='Item Price'
                                                    value={product.price}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            {/* SIZES - BAR */}
                                            <div className="col-md-6 sizes-bar">
                                                <label htmlFor="" className='fs-5 me-3'>SIZES</label>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault1"
                                                        value="XS"
                                                        checked={product.size.includes("XS")}
                                                        onChange={handleSizeChange} />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault1">
                                                        XS
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault2"
                                                        value="S"
                                                        checked={product.size.includes("S")}
                                                        onChange={handleSizeChange} />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault2">
                                                        S
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault3"
                                                        value="M"
                                                        checked={product.size.includes("M")}
                                                        onChange={handleSizeChange} />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault3">
                                                        M
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault4"
                                                        value="L"
                                                        checked={product.size.includes("L")}
                                                        onChange={handleSizeChange} />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault4">
                                                        L
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault5"
                                                        value="XL"
                                                        checked={product.size.includes("XL")}
                                                        onChange={handleSizeChange} />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault5">
                                                        XL
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <textarea
                                                    className='newproduct-input'
                                                    name="productDetail"
                                                    rows="5"
                                                    placeholder='Item Detail'
                                                    value={product.productDetail}
                                                    onChange={handleInputChange}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="update-btns-bar pt-4 my-3 d-flex flex-row justify-content-center">
                                    <button type="submit" onClick={handleUpdate} className='add-product-submit-btn shadow mx-3'>Update Product</button>
                                    <span className='add-product-submit-btn shadow mx-3' style={{ cursor: "pointer" }} onClick={handleDelete}>Delete Product</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}

export default UpdateProduct;



