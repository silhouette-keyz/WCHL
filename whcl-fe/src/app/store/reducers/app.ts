import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../helpers/local-storage.helper";

const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApp: (state, { payload }) => {
      setItem("app", payload);
    },
  },
});

export const { setApp } = appSlice.actions;

export default appSlice.reducer;
