import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  createSlice,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import {
  getImage,
  getImages,
  getVideo,
  getVideos,
  postImage,
  postVideo,
  editImage,
  editVideo,
  deleteImage,
  deleteVideo,
} from "../../services/gallery";
import type { Image, Video } from "../..//types/types";
import { DeleteParam } from "../../types/types";
import type { RootState } from "../index";
import { AxiosError } from "axios";

interface IGallery {
  images: Image[];
  videos: Video[];
  imageOne: Image;
  videoOne: Video;
  loading: "pending" | "idle" | "succeded" | "rejected";
  editModal: boolean;
  addModal: boolean;
  readMoreModal: boolean;
  readMoreText: string;
  galleryIdOne: string;
  count: number;
}

const initialState = {
  addModal: false,
  count: 0,
  editModal: false,
  galleryIdOne: "",
  imageOne: {
    _id: "",
    description: "",
    imagePublicId: "",
    imageUrl: "",
    title: "",
  },
  images: [],
  loading: "idle",
  readMoreModal: false,
  readMoreText: "",
  videoOne:  {
    _id: "",
    description: "",
    videoPublicId: "",
    videoUrl: "",
    title: "",
  },
  videos: [],
} as IGallery;

export const fetchImagesThunk = createAsyncThunk(
  "gallery/fetchImages",
  async (
    paginationData: { page: number; limit: number } = { limit: 4, page: 1 }
  ) => {
    const res = await getImages(paginationData);
    return res.data;
  }
);

export const fetchImageThunk = createAsyncThunk(
  "gallery/fetchImage",
  async (id: string) => {
    const res = await getImage(id);
    return res.data;
  }
);

export const fetchVideosThunk = createAsyncThunk(
  "gallery/fetchVideos",
  async (
    paginationData: { page: number; limit: number } = { limit: 4, page: 1 }
  ) => {
    const res = await getVideos(paginationData);
    return res.data;
  }
);

export const fetchVideoThunk = createAsyncThunk(
  "gallery/fetchVideo",
  async (id: string) => {
    const res = await getVideo(id);
    return res.data;
  }
);

export const postImageThunk = createAsyncThunk(
  "gallery/postImage",
  async (
    data: { formData: Image | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await postImage(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);

export const postVideoThunk = createAsyncThunk(
  "gallery/postVideo",
  async (
    data: { formData: Video | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await postVideo(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);

export const editImageThunk = createAsyncThunk(
  "gallery/editImage",
  async (
    data: { formData: Image | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await editImage(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);

export const editVideoThunk = createAsyncThunk(
  "gallery/editVideo",
  async (
    data: { formData: Video | {}; page: number; limit: number } = {
      formData: {},
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await editVideo(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);

export const deleteImageThunk = createAsyncThunk(
  "gallery/deleteImage",
  async (
    data: { formData: DeleteParam; page: number; limit: number } = {
      formData: { _id: "" },
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await deleteImage(data.formData, {
        page: data.page,
        limit: data.limit,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError)?.response?.data);
    }
  }
);

export const deleteVideoThunk = createAsyncThunk(
  "gallery/deleteVideo",
  async (
    data: { formData: DeleteParam; page: number; limit: number } = {
      formData: { _id: "" },
      limit: 4,
      page: 1,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await deleteVideo(data.formData, {
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

const gallerySlice = createSlice({
  initialState,
  name: "gallery",
  reducers: {
    setGalleryIdOne: (state, action): void => {
      state.galleryIdOne = action.payload;
    },
    toggleAddGalleryModal: (state): void => {
      state.addModal = !state.addModal;
      toggleScrollbar();
    },
    toggleEditGalleryModal: (state): void => {
      state.editModal = !state.editModal;
      toggleScrollbar();
    },
    toggleReadMoreGalleryModal: (state, action): void => {
      state.readMoreModal = !state.readMoreModal;
      state.readMoreText = action.payload,
      toggleScrollbar();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IGallery>) => {
    builder
      .addCase(fetchImagesThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.images = action.payload.images;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(fetchImagesThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(fetchImagesThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(fetchImageThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.imageOne = action.payload.image;
        state.loading = "success";
      })
      .addCase(fetchImageThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(fetchImageThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(postImageThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.images = action.payload.images;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(postImageThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(postImageThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(editImageThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.images = action.payload.images;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(editImageThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(editImageThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(deleteImageThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.images = action.payload.images;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(deleteImageThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(deleteImageThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })

      .addCase(fetchVideosThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.videos = action.payload.videos;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(fetchVideosThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(fetchVideosThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(fetchVideoThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.videoOne = action.payload.video;
        state.loading = "success";
      })
      .addCase(fetchVideoThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(fetchVideoThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(postVideoThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.videos = action.payload.videos;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(postVideoThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(postVideoThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(editVideoThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.videos = action.payload.videos;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(editVideoThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(editVideoThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      })
      .addCase(deleteVideoThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.videos = action.payload.videos;
        state.count = action.payload.count;
        state.loading = "success";
      })
      .addCase(deleteVideoThunk.pending, (state: any) => {
        // state.gallery = action;
        state.loading = "pending";
      })
      .addCase(deleteVideoThunk.rejected, (state: any) => {
        // state.gallery = action;
        state.loading = "rejected";
      });
  },
});

export const {
  setGalleryIdOne,
  toggleAddGalleryModal,
  toggleEditGalleryModal,
  toggleReadMoreGalleryModal
} = gallerySlice.actions;

export const selectAddModal = (state: RootState) => state.gallery.addModal;
export const selectEditModal = (state: RootState) => state.gallery.editModal;
export const selectReadMoreModal = (state: RootState) => state.gallery.readMoreModal;
export const selectReadMoreModalText = (state: RootState) => state.gallery.readMoreText;

export const selectImages = (state: RootState) => state.gallery.images;
export const selectVideos = (state: RootState) => state.gallery.videos;

export const selectImageOne = (state: RootState) => state.gallery.imageOne;
export const selectVideoOne = (state: RootState) => state.gallery.videoOne;

export const selectCount = (state: RootState) => state.gallery.count;

export const selectGalleryIdOne = (state: RootState) =>
  state.gallery.galleryIdOne;

export const loading = (state: RootState) => state.gallery.loading;

export default gallerySlice.reducer;
