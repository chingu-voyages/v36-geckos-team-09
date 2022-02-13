import { createSlice } from '@reduxjs/toolkit';

const initialState = { selectedCollectionName: null };

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setSelectedCollectionName: (state, action) => {
            state.selectedCollectionName = action.payload;
        },
    },
});

export const { setSelectedCollectionName } = collectionsSlice.actions;

export default collectionsSlice.reducer;
