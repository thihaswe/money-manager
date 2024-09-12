import { AppInitialState } from "@/type/appType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppInitialState = {
  appInit: false,
  isLoading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;
export default appSlice.reducer;
