import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collectionToDisplay: [],
    collectionsTrigger: false,
};

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setCollectionToDisplay: (state, action) => {
            state.collectionToDisplay = action.payload;
        },
        setCollectionsTrigger: (state) => {
            state.collectionsTrigger = !state.collectionsTrigger;
        },
    },
});

export const { setCollectionToDisplay, setCollectionsTrigger } =
    collectionsSlice.actions;

export default collectionsSlice.reducer;
