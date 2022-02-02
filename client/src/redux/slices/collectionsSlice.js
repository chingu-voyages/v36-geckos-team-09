import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: {},
    selectedCollectionId: null,
};

const name = 'collections';

export const collectionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        addNewCollection: (state, action) => {
            const { id, name, date } = action.payload;

            state.collections[`${id}`] = {
                id,
                name,
                date,
                flashcards: [],
            };
        },
        addNewFlashcard: (state, action) => {
            const { collectionId, flashcard } = action.payload;

            state.collections[`${collectionId}`].flashcards = [
                ...state.collections[`${collectionId}`].flashcards,
                flashcard,
            ];
        },
        deleteFlashcard: (state, action) => {
            const { collectionId, newFlashcards } = action.payload;

            state.collections[`${collectionId}`].flashcards = newFlashcards;
        },
        setSelectedCollectionId: (state, action) => {
            state.selectedCollectionId = action.payload;
        },
    },
});

export const {
    addNewCollection,
    addNewFlashcard,
    deleteFlashcard,
    setSelectedCollectionId,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
