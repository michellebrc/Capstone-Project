import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";




export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false || localStorage.getItem("TOKEN") != null,
    },
    reducers:{
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },

});


export const { login, logout} = authSlice.actions;


export default authSlice.reducer;

export const loginThunk = ({email, password}) => async (dispatch) => {
    const response = await axios.post(`http://localhost:8000/auth/login`, {
        email,
        password
    });
    console.log("response", response);
    if (response.data) {
        localStorage.setItem("TOKEN", response.data.token);
        dispatch(login());
    }
}

export const logoutThunk = () => (dispatch) => {
    localStorage.removeItem("TOKEN");
    dispatch(logout());
}