import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import usersState, { user } from "../../../type/reduxUsersState";

const initialState: usersState = {
    users: [],
    isLoading: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        add: (state: usersState, action: PayloadAction<user>) => {
            const isExist = state.users.some(
                (user) => user.uid == action.payload.uid
            );

            if (!isExist) {
                state.users = [action.payload, ...state.users];
            }
        },

        update: (state: usersState, action: PayloadAction<user>) => {
            const accountIndex = state.users.findIndex(
                (user) => user.uid == action.payload.uid
            );

            if (accountIndex !== -1) {
                state.users[accountIndex] = action.payload;
            }
        },

        remove: (state: usersState, action: PayloadAction<user>) => {
            const newState = state.users.filter(
                (user) => user.uid !== action.payload.uid
            );

            state.users = newState;
        },

        finishLoading: (state: usersState) => {
            state.isLoading = false;
        },

        clearUsers: (state: usersState) => {
            state.users = [];
            state.isLoading = null;
        },
    },
});

export const { add, update, remove, finishLoading, clearUsers } =
    authSlice.actions;

export default authSlice.reducer;
