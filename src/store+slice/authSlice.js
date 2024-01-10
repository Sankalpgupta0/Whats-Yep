import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    count:0
}

const authSlice = createSlice({
    name: "AuthReducer",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        counter : (state) => {
            state.count++;
            console.log(state.count);
        }
    }
})

export const { login, logout, counter } = authSlice.actions;

export default authSlice.reducer;