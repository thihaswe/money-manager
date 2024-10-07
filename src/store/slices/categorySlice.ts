import { prisma } from "@/lib/prisma";
import { AppInitialState } from "@/type/appType";
import { CategoryInitialState } from "@/type/categoryType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setInint } from "./appSlice";
import { Category } from "@prisma/client";

const initialState: CategoryInitialState = {
  categories: [],
  isLoading: true,
  error: null,
};

export const fetchCategoryThunk = createAsyncThunk(
  "category/fetchCategoryThunk",
  async (payload: string, thunkApi) => {
    try {
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category?userId=${payload}`,
        {
          method: "GET",
        }
      );
      const data: Category[] = await respone.json();
      thunkApi.dispatch(setCategories(data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCategories } = appSlice.actions;
export default appSlice.reducer;
