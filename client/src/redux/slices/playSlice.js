import { createSlice } from '@reduxjs/toolkit';

const initialState = { selectedCollection: '' };

const name = 'play';

export const playSlice = createSlice({
    name,
    initialState,
    reducers: {
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
        },
        resetSelectedCollection: (state, action) => {
            state.selectedCollection = '';
        },
    },
});

export const { setSelectedCollection } = playSlice.actions;

export default playSlice.reducer;
