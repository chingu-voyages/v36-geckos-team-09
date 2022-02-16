import { createSlice } from '@reduxjs/toolkit';

const initialState = { collections: [] };

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;
