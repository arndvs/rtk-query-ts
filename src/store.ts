import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import counterReducer from './components/counter/counter-slice';

// AppThunk Imports
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';

// RTK Query Import
import { itemApi } from './services/api-service';

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
  ) =>
    configureStore({
      // redux devtools extension is only available in development mode
      devTools: process.env.NODE_ENV === 'development',
      // combine all the individual reducers into a single object
      reducer: {
        // Add the generated reducer as a specific top-level slice
        [itemApi.reducerPath]: itemApi.reducer,
        counter: counterReducer,
    },
    // Add the generated middleware to the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemApi.middleware),
});


export const store = createStore();

// Export the type of the store dispatch actions into the redux store
export type AppDispatch = typeof store.dispatch;

// Export the type of the store state. ReturnType is a TypeScript utility type that transforms
// the type definition of a function into the type of its return value so RootState contains
// the type definition that matches all the data in the redux store
export type RootState = ReturnType<typeof store.getState>;

// Export the AppThunk type for use in slices
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
