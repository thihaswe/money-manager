import { AppInitialState } from "@/type/appType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppInitialState = {
  appInit: true,
  isLoading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInint: (state, action) => {
      state.appInit = action.payload;
    },
  },
});

export const { setInint } = appSlice.actions;
export default appSlice.reducer;
