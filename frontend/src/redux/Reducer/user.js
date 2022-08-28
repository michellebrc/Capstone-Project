import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";




export const userSlice = createSlice({
    name: "user",
    initialState: {
        userData:[],
    },
    reducers:{
        getUser: (state, action) => {
            state.userData = action.payload;
        }

    },

});


export const { getUser } = userSlice.actions;


export default userSlice.reducer;

export const userThunk = () => async (dispatch) => {
    const token = localStorage.getItem("TOKEN");
    console.log(token);
    const response = await axios(`http://localhost:8000/user`, {
        headers: { Authorization: `Bearer ${token}`},
    })
}

