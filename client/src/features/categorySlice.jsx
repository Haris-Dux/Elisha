import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


//API URL
const createCategoryUrl = "http://localhost:3000/api/createCategory";
const updateCategoryUrl = "http://localhost:3000/api/updateCategory";    // This api is not added currently
const deleteCategoryUrl = "http://localhost:3000/api/deleteCategory";
const getAllCategoriesUrl = "http://localhost:3000/api/getAllCategories";

// CATEGORIES-TYPE API
const createCategoryTypeUrl = "http://localhost:3000/api/createCategoryType";
const updateCategoryTypeUrl = "http://localhost:3000/api/updateCategoryType";
const deleteCategoryTypeUrl = "http://localhost:3000/api/deleteCategoryType";
const getAllCategoryTypesUrl = "http://localhost:3000/api/getAllCategoryTypes";

// SUB-CATEGORIES TYPE API
const createSubCategoryUrl = "http://localhost:3000/api/createSubCategory";
const updateSubCategoryUrl = "http://localhost:3000/api/updateSubCategory";
const deleteSubCategoryUrl = "http://localhost:3000/api/deleteSubCategory";
const getAllSubCategoriesUrl = "http://localhost:3000/api/getAllSubCategories";





//CREATE ASYNC THUNK
export const createCategoryAsync = createAsyncThunk("category/create", async (category) => {
    try {
        const response = await axios.post(createCategoryUrl, category);
        toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

//Get ASYNC THUNK
export const getCategoryAsync = createAsyncThunk("category/get", async () => {
    try {
        const response = await axios.post(getAllCategoriesUrl);
        // toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

//Get ASYNC THUNK
export const deleteCategoryAsync = createAsyncThunk("category/delete", async (id) => {
    try {
        const response = await axios.post(deleteCategoryUrl, id);
        // console.log('id', id);
        toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


// CATEGORIES-TYPE API THUNK
export const createCategoryTypeAsync = createAsyncThunk("categoryType/create", async (categoryTypeData) => {
    try {
        const response = await axios.post(createCategoryTypeUrl, categoryTypeData);
        console.log('categoryTypeData', categoryTypeData);
        toast.success(response.data.msg);
        // console.log('response.data', response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


//Get ASYNC THUNK
export const getCategoryTypeAsync = createAsyncThunk("categoryType/get", async (category) => {
    try {
        const response = await axios.post(getAllCategoryTypesUrl, category);
        // toast.success(response.data.msg);
        // console.log('response.data', response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


//Get ASYNC THUNK
export const deleteCategoryTypeAsync = createAsyncThunk("categoryType/delete", async (id) => {
    try {
        const response = await axios.post(deleteCategoryTypeUrl, id);
        console.log('id', id);
        toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});



// INITIAL STATE
const initialState = {
    createCategory: null,
    categories: [],
    categoriesType: [],
};


const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // createuserAsync
            .addCase(createCategoryAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createCategory = action.payload;
            })

            // getCategoryAsync
            .addCase(getCategoryAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categoryData;
            })

            // deleteCategoryAsync
            .addCase(deleteCategoryAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })

            // ------------ CATEGORIES-TYPE API ------------  

            // createCategoryAsync
            .addCase(createCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesType = action.payload;
            })

            // getCategoryTypeAsync
            .addCase(getCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesType = action.payload.categoryTypesData;
            })

            // deleteCategoryAsync
            .addCase(deleteCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesType = state.categoriesType.filter(category => category.id !== action.payload);
            })
    }
})


// export const { clearUser } = categorySlice.actions;

export default categorySlice.reducer;
