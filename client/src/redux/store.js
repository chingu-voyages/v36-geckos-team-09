import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './slices/collectionsSlice';
import playReducer from './slices/playSlice';

export const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        play: playReducer,
    },
});
