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
        changeCollectionName: (state, action) => {
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
        setSelectedCollectionId: (state, action) => {
            state.selectedCollectionId = action.payload;
        },
    },
});

export const {
    addNewCollection,
    deleteCollection,
    changeCollectionName,
    addNewFlashcard,
    deleteFlashcard,
    setSelectedCollectionId,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
