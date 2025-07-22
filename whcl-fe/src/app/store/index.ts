import { combineReducers } from "redux";
import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./reducers/app";

const reducers = combineReducers({
  app: appSlice.reducer,
});

const store = {
  reducer: reducers,
  devTools: process.env.NODE_ENV === "production" ? false : true,
} as ConfigureStoreOptions;

export default configureStore(store);
