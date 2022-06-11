import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface configsState {
    loadSnaps?: boolean;
}

const initialState: configsState = {
    loadSnaps: false,
};

export const configsSlice = createSlice({
    name: "configs",
    initialState,
    reducers: {
        loadSnapToggle: (
            state: configsState,
            action: PayloadAction<boolean>
        ) => {
            state.loadSnaps = action.payload;
        },
    },
});

export const { loadSnapToggle } = configsSlice.actions;

export default configsSlice.reducer;
