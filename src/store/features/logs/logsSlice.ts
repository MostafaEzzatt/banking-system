import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logsState, { log } from "../../../type/reduxLogsState";

const initialState: logsState = {
    logs: [],
    isLoading: true,
};

export const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        add: (state: logsState, action: PayloadAction<log>) => {
            // check if this account exist in the array
            const isExist = state.logs.some(
                (log) => log.id == action.payload.id
            );

            // if Not exist add to the array
            if (!isExist) {
                state.logs = [action.payload, ...state.logs];
            }
            // else just ignore it
        },
        update: (state: logsState, action: PayloadAction<log>) => {
            const accountIndex = state.logs.findIndex(
                (log) => log.id == action.payload.id
            );

            if (accountIndex !== -1) {
                state.logs[accountIndex] = action.payload;
            }
        },
        remove: (state: logsState, action: PayloadAction<log>) => {
            const newState = state.logs.filter(
                (log) => log.id !== action.payload.id
            );

            state.logs = newState;
        },
        finishLoading: (state: logsState) => {
            state.isLoading = false;
        },
        clearLogs: (state: logsState) => {
            state.logs = [];
            state.isLoading = true;
        },
    },
});

export const { add, update, finishLoading, remove, clearLogs } =
    logsSlice.actions;

export default logsSlice.reducer;
