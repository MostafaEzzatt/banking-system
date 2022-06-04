import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import accountState, { account } from "../../../type/reduxAccountsState";

const initialState: accountState = {
    accounts: [],
    isLoading: true,
};

export const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        add: (state: accountState, action: PayloadAction<account>) => {
            // check if this account exist in the array
            const isExist = state.accounts.some(
                (account) => account.id == action.payload.id
            );

            // if Not exist add to the array
            if (!isExist) {
                state.accounts = [action.payload, ...state.accounts];
            }
            // else just ignore it
        },
        update: (state: accountState, action: PayloadAction<account>) => {
            const accountIndex = state.accounts.findIndex(
                (account) => account.id == action.payload.id
            );

            if (accountIndex !== -1) {
                state.accounts[accountIndex] = action.payload;
            }
        },
        remove: (state: accountState, action: PayloadAction<account>) => {
            const newState = state.accounts.filter(
                (account) => account.id !== action.payload.id
            );

            state.accounts = newState;
        },
        finishLoading: (state: accountState) => {
            state.isLoading = false;
        },
        clearAccounts: (state: accountState) => {
            state.accounts = [];
            state.isLoading = true;
        },
    },
});

export const { add, update, finishLoading, remove, clearAccounts } =
    accountsSlice.actions;

export default accountsSlice.reducer;
