import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { docsApi } from "../services/docs";
import globalsReducer from "./globals/globalsSlice";
import membersReducer from "./members/membersSlice";
import feedReducer from "./feed/feedSlice";
import galleryReducer from "./gallery/gallerySlice";
import postsReducer from "./posts/postsSlice";
import adminReducer from "./admin/adminSlice";
import aboutUsReducer from "./aboutUs/aboutUsSlice";
import membershipFormReducer from "./membershipForm/membershipFormSlice";


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(docsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    globals: globalsReducer,
    members: membersReducer,
    feeds: feedReducer,
    [docsApi.reducerPath]: docsApi.reducer,
    gallery: galleryReducer,
    posts: postsReducer,
    admin: adminReducer,
    aboutUs: aboutUsReducer,
    membershipForm: membershipFormReducer
  },
});
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
