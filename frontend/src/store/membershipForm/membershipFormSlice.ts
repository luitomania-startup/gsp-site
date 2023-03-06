import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  createSlice,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  getMembershipForm,
  editMembershipForm,
  getMembershipSubmissions,
} from "../../services/membershipForm";
import type { MembershipForm } from "../../types/types";
import { DeleteParam } from "../../types/types";
import type { RootState } from "../index";

interface IMembershipForm {
  membershipForm: MembershipForm;
  loading: "pending" | "idle" | "succeded" | "rejected";
  editModal: boolean;
  submissions: Object[];
  readMoreModal: boolean;
  readMoreText: string;
}

const initialState = {
  editModal: false,
  membershipForm: [],
  loading: "idle",
  submissions: [],
  readMoreModal: false,
  readMoreText: "",
} as IMembershipForm;

export const fetchMembershipFormThunk = createAsyncThunk(
  "membershipForm/fetchMembershipForm",
  async () => {
    const res = await getMembershipForm();
    return res.data;
  }
);

export const fetchMembershipSubmissionThunk = createAsyncThunk(
  "membershipForm/fetchMembershipSubmissions",
  async () => {
    const res = await getMembershipSubmissions();
    return res.data;
  }
);

export const editMembershipFormThunk = createAsyncThunk(
  "membershipForm/editMembershipForm",
  async (formData: MembershipForm | {}, { rejectWithValue }) => {
    try {
      const res = await editMembershipForm(formData);
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

const membershipFormSlice = createSlice({
  initialState,
  name: "membershipForm",
  reducers: {
    toggleEditMembershipFormModal: (state): void => {
      state.editModal = !state.editModal;
      toggleScrollbar();
    },
    toggleReadMoreRegisterModal: (state, action): void => {
      state.readMoreModal = !state.readMoreModal;
      (state.readMoreText = action.payload), toggleScrollbar();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IMembershipForm>) => {
    builder
      .addCase(
        fetchMembershipFormThunk.fulfilled,
        (state: any, action: any) => {
          //// console.log(action.payload)
          state.membershipForm = action.payload.membershipForm;
          state.loading = "success";
        }
      )
      .addCase(fetchMembershipFormThunk.pending, (state: any) => {
        // state.membershipForm = action;
        state.loading = "pending";
      })
      .addCase(fetchMembershipFormThunk.rejected, (state: any) => {
        // state.membershipForm = action;
        state.loading = "rejected";
      })
      .addCase(
        fetchMembershipSubmissionThunk.fulfilled,
        (state: any, action: any) => {
          //// console.log(action.payload)
          state.submissions = action.payload.membershipSubmissions;
          state.loading = "success";
        }
      )
      .addCase(fetchMembershipSubmissionThunk.pending, (state: any) => {
        // state.membershipForm = action;
        state.loading = "pending";
      })
      .addCase(fetchMembershipSubmissionThunk.rejected, (state: any) => {
        // state.membershipForm = action;
        state.loading = "rejected";
      })
      .addCase(editMembershipFormThunk.fulfilled, (state: any, action: any) => {
        //// console.log(action.payload)

        state.membershipForm = action.payload.membershipForm;
        state.loading = "success";
      })
      .addCase(editMembershipFormThunk.pending, (state: any) => {
        // state.membershipForm = action;
        state.loading = "pending";
      })
      .addCase(editMembershipFormThunk.rejected, (state: any) => {
        // state.membershipForm = action;
        state.loading = "rejected";
      });
  },
});

export const { toggleEditMembershipFormModal, toggleReadMoreRegisterModal } =
  membershipFormSlice.actions;

export const selectEditModal = (state: RootState) =>
  state.membershipForm.editModal;

export const selectMembershipForm = (state: RootState) =>
  state.membershipForm.membershipForm;
export const selectMembershipSubmissions = (state: RootState) =>
  state.membershipForm.submissions;

export const loading = (state: RootState) => state.membershipForm.loading;
export const selectReadMoreModal = (state: RootState) => state.membershipForm.readMoreModal;
export const selectReadMoreModalText = (state: RootState) => state.membershipForm.readMoreText;
export default membershipFormSlice.reducer;
