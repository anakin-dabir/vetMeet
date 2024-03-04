import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nodeAPI } from "../services/nodeAPI";
import userReducer from "./employee";

export const store = configureStore({
  reducer: {
    [nodeAPI.reducerPath]: nodeAPI.reducer,
    User: userReducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(nodeAPI.middleware),
});

setupListeners(store.dispatch);
