import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  createSlice,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getAboutUs, editAboutUs } from "../../services/aboutUs";
import type { AboutUs } from "../../types/types";
import { DeleteParam } from "../../types/types";
import type { RootState } from "../index";

interface IAboutUs {
  aboutUs: AboutUs;
  loading: "pending" | "idle" | "succeded" | "rejected";
  editModal: boolean;
}

const initialState = {
  editModal: false,
  aboutUs: {
    _id: "",
    aboutUsImageUrl: "",
    aboutUsImagePublicId: "",
    description: ""
  },
  loading: "idle",
} as IAboutUs;

export const fetchAboutUsThunk = createAsyncThunk(
  "aboutUs/fetchAboutUs",
  async () => {
    const res = await getAboutUs();
    return res.data;
  }
);

export const editAboutUsThunk = createAsyncThunk(
  "aboutUs/editAboutUs",
  async (formData: AboutUs | {}, { rejectWithValue }) => {
    try {
      const res = await editAboutUs(formData);
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

const aboutUsSlice = createSlice({
  initialState,
  name: "aboutUs",
  reducers: {
    toggleEditAboutUsModal: (state): void => {
      state.editModal = !state.editModal;
      toggleScrollbar();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IAboutUs>) => {
    builder
      .addCase(fetchAboutUsThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)
        state.aboutUs = action.payload.aboutUs;
        state.loading = "success";
      })
      .addCase(fetchAboutUsThunk.pending, (state: any) => {
        // state.aboutUs = action;
        state.loading = "pending";
      })
      .addCase(fetchAboutUsThunk.rejected, (state: any) => {
        // state.aboutUs = action;
        state.loading = "rejected";
      })
      
      .addCase(editAboutUsThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.aboutUs = action.payload.aboutUs;
        state.loading = "success";
      })
      .addCase(editAboutUsThunk.pending, (state: any) => {
        // state.aboutUs = action;
        state.loading = "pending";
      })
      .addCase(editAboutUsThunk.rejected, (state: any) => {
        // state.aboutUs = action;
        state.loading = "rejected";
      });
  },
});

export const {
  toggleEditAboutUsModal,
} = aboutUsSlice.actions;

export const selectEditModal = (state: RootState) => state.aboutUs.editModal;


export const selectAboutUs = (state: RootState) => state.aboutUs.aboutUs;


export const loading = (state: RootState) => state.aboutUs.loading;

export default aboutUsSlice.reducer;
