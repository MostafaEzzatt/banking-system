import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authState, { user } from "../../../type/reduxAuthState";

const initialState: authState = {
    user: {
        uid: "",
        username: "",
        phone: "",
        role: null,
        active: false,
        created_at: "",
        modified_at: "",
    },
    isLoggedIn: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: authState, action: PayloadAction<user>) => {
            // state.user = action.payload.user
            state.user = action.payload;
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
