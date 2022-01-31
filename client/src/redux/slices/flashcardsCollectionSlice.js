import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flashcardsCollection: [],
};

const name = 'flashcardsCollection';

export const flashcardsCollectionSlice = createSlice({
    name,
    initialState,
    reducers: {
        addNewFlashcard: (state, action) => {
            state.flashcardsCollection = [
                ...state.flashcardsCollection,
                action.payload,
            ];
        },
    },
});

export const { addNewFlashcard } = flashcardsCollectionSlice.actions;

export default flashcardsCollectionSlice.reducer;
