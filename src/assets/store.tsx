import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { registerAPI } from "../features/Register/registerAPI";
import { loginAPI } from "../features/login/loginAPI";


// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers here
const rootReducer = combineReducers({
[loginAPI.reducerPath]: loginAPI.reducer,
[registerAPI.reducerPath]: registerAPI.reducer

 
  
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
    //   loginAPI.middleware,
    registerAPI.middleware,loginAPI.middleware
     
    ), // Move this inside
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Define types for state and dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
