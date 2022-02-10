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
            const { id, name } = action.payload;

            state.collections[id] = {
                id,
                name,
                flashcards: [],
            };
        },
        deleteCollection: (state, action) => {
            state.collections = action.payload;
        },
        editCollectionName: (state, action) => {
            state.collections = action.payload;
        },
        addNewFlashcard: (state, action) => {
            const { collectionId, flashcard } = action.payload;

            state.collections[collectionId].flashcards = [
                ...state.collections[collectionId].flashcards,
                flashcard,
            ];
        },
        deleteFlashcard: (state, action) => {
            const { collectionId, newFlashcards } = action.payload;

            state.collections[collectionId].flashcards = newFlashcards;
        },
        editFlashcard: (state, action) => {
            const { collectionId, index, newFlashcardValues } = action.payload;

            state.collections[collectionId].flashcards = [
                ...state.collections[collectionId].flashcards.slice(0, index),
                { ...newFlashcardValues },
                ...state.collections[collectionId].flashcards.slice(index + 1),
            ];
        },
        setSelectedCollectionId: (state, action) => {
            state.selectedCollectionId = action.payload;
        },
    },
});

export const {
    addNewCollection,
    deleteCollection,
    editCollectionName,
    addNewFlashcard,
    deleteFlashcard,
    setSelectedCollectionId,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
