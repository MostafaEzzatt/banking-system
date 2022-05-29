import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authState from "../../../type/reduxAuthState";

const initialState: authState = {
    user: {
        uid: "",
        username: "",
        phone: "",
        role: null,
    },
    isLoggedIn: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: authState, action: PayloadAction<authState>) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },

        logout: (state: authState) => {
            state.user = initialState.user;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
