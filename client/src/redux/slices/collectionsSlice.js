import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collectionsTrigger: false,
};

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setCollectionsTrigger: (state) => {
            state.collectionsTrigger = !state.collectionsTrigger;
        },
    },
});

export const { setCollectionsTrigger } = collectionsSlice.actions;

export default collectionsSlice.reducer;
