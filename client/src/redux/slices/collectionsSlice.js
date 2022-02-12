import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: {},
    selectedCollectionId: null,
    selectedCollectionName: null,
    stateCollections: [],
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
        setSelectedCollectionName: (state, action) => {
            state.selectedCollectionName = action.payload;
        },
        addStateCollection: (state, action) => {
            state.stateCollections = [action.payload];
        },
        resetStateCollections: (state) => {
            state.stateCollections = [];
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
    setSelectedCollectionName,
    addStateCollection,
    resetStateCollections,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
