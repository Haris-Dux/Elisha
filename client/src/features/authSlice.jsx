import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


//API URL
const signupUrl = "http://localhost:3000/api/signup";
const getUserUrl = "http://localhost:3000/api/getUser";
const loginUrl = "http://localhost:3000/api/login";
const logoutUrl = "http://localhost:3000/api/logout";
const updateUserUrl = "http://localhost:3000/api/updateUser";
const forgotPasswordUrl = "http://localhost:3000/api/forgotPassword";
const resetPasswordUrl = "http://localhost:3000/api/resetPassword";
const validateTokenUrl = "http://localhost:3000/api/validateToken";



//CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk("user/create", async (formDataToSend) => {
    try {
        const response = await axios.post(signupUrl, formDataToSend);
        //toast.success(response.data.msg);

        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

//GET ASYNC THUNK
export const getuserAsync = createAsyncThunk("user/get", async (id) => {
    try {
        const response = await axios.post(getUserUrl, id);
        //toast.success(response.data.msg);
        console.log('response', response);
        return response.data;

    } catch (error) {
        console.log('error', error);
        toast.error(error.response.data.msg);
    }
});


// lOGIN ASYNC THUNK 
export const loginuserAsync = createAsyncThunk("user/login", async (logData) => {
    try {
        const response = await axios.post(loginUrl, logData);
        const token = response.data.accessToken;
        // console.log(response.data.accessToken);
        Cookies.set(
            "token", token
        )
        console.log(response.data);
        return response;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


// UPDATE ASYNC THUNK 
export const updateuserAsync = createAsyncThunk("user/update", async (userData) => {
    try {
        const response = await axios.post(updateUserUrl, userData);
        // console.log(response.data.accessToken);
        console.log(response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
        return rejectWithValue(error.response.data.msg);
    }
});



// lOGOUT ASYNC THUNK 
export const logoutuserAsync = createAsyncThunk("user/logout", async () => {
    try {
        const response = await axios.post(logoutUrl);
        console.log(response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});



// FORGET ASYNC THUNK 
export const forgetuserAsync = createAsyncThunk("user/forget", async (email) => {
    try {
        const response = await axios.post(forgotPasswordUrl, email);
        console.log(response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// RESET PASSWORD ASYNC THUNK 

export const resetpasswordAsync = createAsyncThunk("user/resetPassword", async (newPassword, confirmPassword, resetToken) => {
    try {
        const response = await axios.post(resetPasswordUrl, newPassword, confirmPassword, resetToken);
        //toast.success(response.data.msg)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.message)
        // toast.error(error.response.data.msg);
    }
});


// Token Validation Async Thunk
export const validateTokenAsync = createAsyncThunk("user/validateToken", async (accessToken) => {
    try {
        const response = await axios.post(validateTokenUrl, accessToken);
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
});


const savedUser = JSON.parse(localStorage.getItem("user"));

// INITIAL STATE
const initialState = {
    createUser: null,
    user: savedUser || null,
    isAuthenticated: false,
    loading: false,
    logoutUser: null,
    clearUser: null,
    forgetPasswordEmail: null,
    resetPassword: null,
    validateToken: null
};



const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("token");
        },
    },
    extraReducers: (builder) => {
        builder

            // createuserAsync
            .addCase(createuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })

            // getuserAsync
            .addCase(getuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })

            // loginuserAsync
            .addCase(loginuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.userData;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload.data.userData))
            })

            // logoutuserAsync
            .addCase(logoutuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.logoutUser = action.payload;
                state.user = null; // Clear user state
                state.isAuthenticated = false;
                localStorage.removeItem('user');
                Cookies.remove('token');
            })

            // updateuserAsync
            .addCase(updateuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            // forgetPassowrduserAsync
            .addCase(forgetuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(forgetuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.forgetPasswordEmail = action.payload;
                state.forgetPasswordEmail = null;
            })
            // resetpasswordAsync
            .addCase(resetpasswordAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(resetpasswordAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPassword = action.payload;

            })

            // validateTokenAsync
            .addCase(validateTokenAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(validateTokenAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.validateToken = action.payload;
            })
    }

})


export const { clearUser } = authSlice.actions;

export default authSlice.reducer;