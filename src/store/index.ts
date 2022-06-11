import { configureStore } from "@reduxjs/toolkit";
import accountsSlice from "./features/accounts/accounsSlice";
import authSlice from "./features/auth/authSlice";
import logsSlice from "./features/logs/logsSlice";
import usersSlice from "./features/users/usersSlice";
import configsSlice from "./features/configs/configsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        accounts: accountsSlice,
        logs: logsSlice,
        users: usersSlice,
        configs: configsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
