import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './slices/collectionsSlice';
import flashcardsCollectionReducer from './slices/flashcardsCollectionSlice';

export const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        flashcardsCollection: flashcardsCollectionReducer,
    },
});
