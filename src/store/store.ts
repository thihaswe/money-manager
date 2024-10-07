import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/store/slices/appSlice";
import userReducer from "@/store/slices/userSlice";
import categoryReducer from "@/store/slices/categorySlice";

// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
