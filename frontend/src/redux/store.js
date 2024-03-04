import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { nodeAPI } from "../services/nodeAPI";
import userReducer from "./employee";


export const store=configureStore( {
        reducer: {
                // Add the generated reducer as a specific top-level slice
                [ nodeAPI.reducerPath ]: nodeAPI.reducer,
                User: userReducer

        },

        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`.
        middleware: ( getDefaultMiddleware ) =>
                getDefaultMiddleware().concat( nodeAPI.middleware ),

} )

setupListeners( store.dispatch )