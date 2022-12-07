
// RTK Query is a powerful tool for fetching data from an API and managing the state of that data in your application.
// It is built on top of Redux Toolkit and uses the same core APIs, so you should already be familiar with the concepts of reducers, actions, and selectors.
// https://redux-toolkit.js.org/rtk-query/overview

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // baseUrl is the base URL for all requests
    endpoints: (builder) => { // endpoints, similar to redux reducers, is a function that accepts a builder object and returns an object of endpoint definitions
         return {
            getItems: builder.query<{items: Item[]}, void>({
                query: () => 'items',
            }),
        }
    },
});

export const { useGetItemsQuery } = itemApi;
