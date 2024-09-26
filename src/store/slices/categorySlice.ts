import { AppInitialState } from "@/type/appType";
import { CategoryInitialState } from "@/type/categoryType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryInitialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCat: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
