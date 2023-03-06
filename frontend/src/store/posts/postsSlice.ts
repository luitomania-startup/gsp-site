import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  createSlice,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  getPost,
  getPosts,
  postPost,
  editPost,
  deletePost,
} from "../../services/post";
import type { Post, Video } from "../../types/types";
import { DeleteParam } from "../../types/types";
import type { RootState } from "../index";


interface IPosts {
  posts: Post[];
  postOne: Post;
  loading: "pending" | "idle" | "succeded" | "rejected";
  editModal: boolean;
  addModal: boolean;
  readMoreModal: boolean;
  readMoreText: string;
  postIdOne: string;
  count: number;
}

const initialState = {
  addModal: false,
  count: 0,
  editModal: false,
  postIdOne: "",
  postOne: {
    _id: "",
    description: "",
    postImagePublicId: "",
    postImageUrl: "",
    title: "",
    dateCreated: ""
  },
  posts: [],
  loading: "idle",
  readMoreModal: false,
  readMoreText: "",
} as IPosts;

export const fetchPostsThunk = createAsyncThunk(
  "post/fetchPosts",
  async (
    paginationData: { page: number; limit: number } = { limit: 4, page: 1 }
  ) => {
    const res = await getPosts(paginationData);
    return res.data;
  }
);

export const fetchPostThunk = createAsyncThunk(
  "post/fetchPost",
  async (id: string) => {
    const res = await getPost(id);
    return res.data;
  }
);





export const postPostThunk = createAsyncThunk(
  "post/postPost",
  async (
    data: { formData: Post | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await postPost(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);



export const editPostThunk = createAsyncThunk(
  "post/editPost",
  async (
    data: { formData: Post | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await editPost(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);


export const deletePostThunk = createAsyncThunk(
  "post/deletePost",
  async (
    data: { formData: DeleteParam; page: number; limit: number } = {
      formData: { _id: "" },
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await deletePost(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);


export const toggleScrollbar = () => {
  const element = document.getElementsByTagName("body")[0];

  if (element.classList.contains("overflow-hidden")) {
    element.classList.remove("overflow-hidden");
  } else element.classList.add("overflow-hidden");
};

const postSlice = createSlice({
  initialState,
  name: "post",
  reducers: {
    setPostIdOne: (state, action): void => {
      state.postIdOne = action.payload;
    },
    toggleAddPostModal: (state): void => {
      state.addModal = !state.addModal;
      toggleScrollbar();
    },
    toggleEditPostModal: (state): void => {
      state.editModal = !state.editModal;
      toggleScrollbar();
    },
    toggleReadMorePostModal: (state, action): void => {
      state.readMoreModal = !state.readMoreModal;
      state.readMoreText = action.payload,
      toggleScrollbar();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IPosts>) => {
    builder
      .addCase(fetchPostsThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.posts = action.payload.posts;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(fetchPostsThunk.pending, (state: any) => {
        // state.posts = action;
        state.loading = "pending";
      })
      .addCase(fetchPostsThunk.rejected, (state: any) => {
        // state.posts = action;
        state.loading = "rejected";
      })
      .addCase(fetchPostThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.postOne = action.payload.post;
        state.loading = "success";
      })
      .addCase(fetchPostThunk.pending, (state: any) => {
        // state.posts = action;
        state.loading = "pending";
      })
      .addCase(fetchPostThunk.rejected, (state: any) => {
        // state.posts = action;
        state.loading = "rejected";
      })
      .addCase(postPostThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.posts = action.payload.posts;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(postPostThunk.pending, (state: any) => {
        // state.posts = action;
        state.loading = "pending";
      })
      .addCase(postPostThunk.rejected, (state: any) => {
        // state.posts = action;
        state.loading = "rejected";
      })
      .addCase(editPostThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.posts = action.payload.posts;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(editPostThunk.pending, (state: any) => {
        // state.posts = action;
        state.loading = "pending";
      })
      .addCase(editPostThunk.rejected, (state: any) => {
        // state.posts = action;
        state.loading = "rejected";
      })
      .addCase(deletePostThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.posts = action.payload.posts;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(deletePostThunk.pending, (state: any) => {
        // state.posts = action;
        state.loading = "pending";
      })
      .addCase(deletePostThunk.rejected, (state: any) => {
        // state.posts = action;
        state.loading = "rejected";
      });
  },
});

export const {
  setPostIdOne,
  toggleAddPostModal,
  toggleEditPostModal,
  toggleReadMorePostModal
} = postSlice.actions;

export const selectAddModal = (state: RootState) => state.posts.addModal;
export const selectEditModal = (state: RootState) => state.posts.editModal;
export const selectReadMoreModal = (state: RootState) => state.posts.readMoreModal;
export const selectReadMoreModalText = (state: RootState) => state.posts.readMoreText;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectPostOne = (state: RootState) => state.posts.postOne;

export const selectCount = (state: RootState) => state.posts.count;

export const selectPostIdOne = (state: RootState) =>
  state.posts.postIdOne;

export const loading = (state: RootState) => state.posts.loading;

export default postSlice.reducer;
