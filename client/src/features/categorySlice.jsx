import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


//API URL
const createCategoryUrl = "http://localhost:3000/api/createCategory";
const updateCategoryUrl = "http://localhost:3000/api/updateCategory";
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

//GET ASYNC THUNK
export const getCategoryAsync = createAsyncThunk("category/get", async () => {
    try {
        const response = await axios.post(getAllCategoriesUrl);
        // toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

//DELETE ASYNC THUNK
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

// UPDATE ASYNC THUNK
export const updateCategoryAsync = createAsyncThunk("category/update", async (data) => {
    try {
        const response = await axios.post(updateCategoryUrl, data);
        toast.success(error.response.data.msg);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
    }
});



// ------------ CATEGORIES-TYPE API THUNK ------------ //

// CREATE ASYNC THUNK
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

// GET ASYNC THUNK
export const getCategoryTypeAsync = createAsyncThunk("categoryType/get", async (category) => {
    try {
        const response = await axios.post(getAllCategoryTypesUrl, category);
        // toast.success(response.data.msg);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        //toast.error(error.response.data.msg);
    }
});

// UPDATE ASYNC THUNK
export const updateCategoryTypeAsync = createAsyncThunk("categoryType/update", async (data) => {
    try {
        const response = await axios.post(updateCategoryTypeUrl, data);
        toast.success(response.data.msg);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
        throw error; // Re-throw the error to mark the async thunk as rejected
    }
}
);

// Delete CATEGORIES ASYNC THUNK
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


// ------------ SUB - CATEGORIES API THUNK ------------ //

// CREATE ASYNC THUNK
export const createSubCategoryTypeAsync = createAsyncThunk("SubcategoryType/create", async (subcategoryTypeData) => {
    try {
        const response = await axios.post(createSubCategoryUrl, subcategoryTypeData);
        toast.success(response.data.msg);
        console.log('response.data', response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// GET ASYNC THUNK
export const getSubCategoryTypeAsync = createAsyncThunk("SubcategoryType/get", async (category) => {
    try {
        const response = await axios.post(getAllSubCategoriesUrl, category);
        // toast.success(response.data.msg);
        console.log('response.data', response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


// UPDATE ASYNC THUNK
export const updateSubCategoryTypeAsync = createAsyncThunk("SubcategoryType/update", async (data) => {
    try {
        const response = await axios.post(updateSubCategoryUrl, data);
        toast.success(response.data.msg);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
        throw error;
    }
});

// Delete ASYNC THUNK
export const deleteSubCategoryTypeAsync = createAsyncThunk("SubcategoryType/delete", async (id) => {
    try {
        const response = await axios.post(deleteSubCategoryUrl, id);
        toast.success(response.data.msg);
        console.log('response.data', response.data);
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
    subcategoriesType: [],
    updatedCategory: null
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

            // UpdateProductAsync
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.loading = true;
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
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

            // UpdateCategoryAsync
            .addCase(updateCategoryTypeAsync.rejected, (state, action) => {
                state.loading = true;
            })
            .addCase(updateCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesType = action.payload;
            })

            // deleteCategoryAsync
            .addCase(deleteCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesType = state.categoriesType.filter(category => category.id !== action.payload);
            })


            // ------------ SUB-CATEGORIES-TYPE API ------------  
            // createSubCategoryAsync
            .addCase(createSubCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createSubCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategoriesType = action.payload;
            })

            // getSubCategoryAsync
            .addCase(getSubCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSubCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategoriesType = action.payload.subCategoryData;
            })

            // UpdateCategoryAsync
            .addCase(updateSubCategoryTypeAsync.rejected, (state, action) => {
                state.loading = true;
            })
            .addCase(updateSubCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategoriesType = action.payload;
            })

            // deleteSubCategoryAsync
            .addCase(deleteSubCategoryTypeAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteSubCategoryTypeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategoriesType = state.subcategoriesType.filter(category => category.id !== action.payload);
            })
    }
})


// export const { clearUser } = categorySlice.actions;

export default categorySlice.reducer;
