import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInitialState } from "@/type/userType";
import { stat } from "fs";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: UserInitialState = {
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.isLoading = !state.isLoading;
    },
    decrement: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { increment, decrement } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
