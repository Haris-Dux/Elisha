import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//API URL
const createOrderUrl = "http://localhost:3000/api/createOrder";
const updateOrderUrl = "http://localhost:3000/api/updateOrder";
const getAllOrdersForUserUrl = "http://localhost:3000/api/getAllOrdersForUser";
const getOrderDetailsUrl = "http://localhost:3000/api/getOrderDetails";
const getAllOrdersUrl = "http://localhost:3000/api/getAllOrders";



// createOrdertAsync
export const createOrderAsync = createAsyncThunk("products/createOrder", async (order) => {
    try {
        const response = await axios.post(createOrderUrl, order);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response);
    }
});


// getAllOrderForUserAsync
export const getAllOrderForUserAsync = createAsyncThunk("products/getUserOrder", async (userID) => {
    try {
        const response = await axios.post(getAllOrdersForUserUrl, userID);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response);
    }
});

// getAllOrderForAdminAsync
export const getAllOrderForAdminAsync = createAsyncThunk("products/getAdminOrder", async () => {
    try {
        const response = await axios.post(getAllOrdersUrl);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response);
    }
});

// updateOrdernAsync
export const updateOrderAsync = createAsyncThunk("products/updateOrder", async (data) => {
    try {
        const response = await axios.post(updateOrderUrl, data);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response);
    }
});

// const { id, status, address, phone } = data;




// INITIAL STATE
const initialState = {
    loading: false,
    createOrder: null,
    allOrderForUsers: null,
    allOrderForAdmin: null,
    currentOrder: null
};


const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        currentOrder: (state, action) => {
            state.createOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // createProductAsync
            .addCase(createOrderAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createOrder = action.payload;
            })

            // getAllOrderForUserAsync
            .addCase(getAllOrderForUserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllOrderForUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrderForUsers = action.payload.orderData;
            })

            // getAllOrderForAdminAsync
            .addCase(getAllOrderForAdminAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllOrderForAdminAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrderForAdmin = action.payload.orderData;
            })

            // getAllOrderForAdminAsync
            .addCase(updateOrderAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrderForAdmin = action.payload.orderData;
            })
    }
})

export const { currentOrder } = orderSlice.actions;

export default orderSlice.reducer;



