import { createSlice } from '@reduxjs/toolkit';

const initialState = { stateCollections: [], selectedCollectionName: null };

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        addStateCollection: (state, action) => {
            state.stateCollections = [action.payload];
        },
        resetStateCollections: (state) => {
            state.stateCollections = [];
        },
        setSelectedCollectionName: (state, action) => {
            state.selectedCollectionName = action.payload;
        },
    },
});

export const {
    setSelectedCollectionName,
    addStateCollection,
    resetStateCollections,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
