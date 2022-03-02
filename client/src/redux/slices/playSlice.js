import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCollection: '',
    collectionToDisplay: [],
    flashcardIndex: 0,
    isNextButtonDisabled: true,
};

const name = 'play';

export const playSlice = createSlice({
    name,
    initialState,
    reducers: {
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
        },
        resetSelectedCollection: (state) => {
            state.selectedCollection = '';
        },
        setCollectionToDisplay: (state, action) => {
            state.collectionToDisplay = action.payload;
        },
        incrementFlashcardIndex: (state) => {
            state.flashcardIndex += 1;
        },
        resetFlashcardIndex: (state) => {
            state.flashcardIndex = 0;
        },
        setIsNextButtonDisabled: (state, action) => {
            state.isNextButtonDisabled = action.payload;
        },
    },
});

export const {
    setSelectedCollection,
    resetSelectedCollection,
    setCollectionToDisplay,
    incrementFlashcardIndex,
    resetFlashcardIndex,
    setIsNextButtonDisabled,
} = playSlice.actions;

export default playSlice.reducer;
