import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(localStorage.getItem("cart"));
    }
    else {
        return [];
    }
}

// const fetchFromLocalStorage = () => {
//     const cart = localStorage.getItem("cart");
//     if (cart) {
//         try {
//             return JSON.parse(cart);
//         } catch (error) {
//             console.error("Error parsing JSON from local storage:", error);
//         }
//     }
//     return [];
// };


// storeInLocalStorage
const storeInLocalStorage = (data) => {
    localStorage.setItem("cart", JSON.stringify(data));

}

//API URL
const productsUrl = "http://localhost:3000/api/createProduct";
const getAllProductsUrl = "http://localhost:3000/api/getAllProducts";
const updateProductUrl = "http://localhost:3000/api/updateProduct";
const deleteProductUrl = "http://localhost:3000/api/deleteProduct";
const getProductUrl = "http://localhost:3000/api/getProduct";


// Create an async thunk to fetch data
export const getProductByIdAsync = createAsyncThunk("product/productById", async (id) => {
    try {
        const response = await axios.post(getProductUrl, { id });
        //  console.log(response.data);
        return response.data;
    } catch (error) {
        //console.log(error);
        throw error;
    }
});


// createProductAsync
export const createProductAsync = createAsyncThunk("products/createProduct", async (product) => {
    try {
        const response = await axios.post(productsUrl, product);
        // console.log(response.data);
        toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.msg);
    }
});

// getProductAsync
export const getProductAsync = createAsyncThunk("products/getProduct", async () => {
    try {
        const response = await axios.post(getAllProductsUrl);
        // console.log( response.data);
        //toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        console.log(error.response.data.msg);
        // toast.error(error.response.data.msg);
    }
});


// updateProductAsync
export const updateProductAsync = createAsyncThunk("products/updateProduct", async (product) => {
    try {
        const response = await axios.post(updateProductUrl, product);
        //console.log(product);
        toast.success(error.response.data.msg);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
    }
});

// deleteProductAsync
export const deleteProductAsync = createAsyncThunk("products/deleteProduct", async (id) => {
    try {
        const response = await axios.post(deleteProductUrl, id);
        toast.success(error.response.data.msg);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.msg);
    }
});




// INITIAL STATE
const initialState = {
    loading: false,
    createProduct: null,
    products: fetchFromLocalStorage(),
    updatedProduct: null,
    getProductById: null
};



const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createProductAsync
            .addCase(createProductAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createProduct = action.payload;
            })
            // ShowProductAsync
            .addCase(getProductAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.productData.products;
                storeInLocalStorage(state.products);
            })

            // UpdateProductAsync
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            // deleteProductAsync
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.msg;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(getProductByIdAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getProductByIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.getProductById = action.payload.productData;
            })

    }
})


// export const { clearUser } = authSlice.actions;

export default ProductSlice.reducer;