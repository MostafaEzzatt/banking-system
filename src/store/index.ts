import { configureStore } from "@reduxjs/toolkit";
import accountsSlice from "./features/accounts/accounsSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
    reducer: { auth: authSlice, accounts: accountsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
