import { configureStore } from '@reduxjs/toolkit';
import { itemApi } from './services/api-service';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [itemApi.reducerPath]: itemApi.reducer,
    },
    // Add the generated middleware to the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemApi.middleware),
});
