import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: [],
};

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        addNewCollection: (state, action) => {
            state.collections = [action.payload, ...state.collections];
        },
    },
});

export const { addNewCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
