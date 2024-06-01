import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendEmail } from "../../../services";

const initialState = {
  sendEmailLoading: false,
  sendEmailResponse: null,
  sendEmailErrors: null,
  sendedEmail: "",
};

export const sendEmailThunk = createAsyncThunk(
  "sendEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendEmail(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState,
  reducers: {
    deleteSendEmailResponse: (state) => {
      state.sendEmailResponse = null;
    },
    saveSendedEmail: (state, { payload }) => {
      state.sendedEmail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendEmailThunk.pending, (state) => {
      state.sendEmailLoading = true;
    });
    builder.addCase(sendEmailThunk.fulfilled, (state, { payload }) => {
      state.sendEmailLoading = false;
      state.sendEmailResponse = payload;
    });
    builder.addCase(sendEmailThunk.rejected, (state, { payload }) => {
      state.sendEmailLoading = false;
      state.sendEmailErrors = payload;
    });
  },
});

export const { deleteSendEmailResponse, saveSendedEmail } =
  sendEmailSlice.actions;

export const sendEmailLoading = (state) => {
  return state.sendEmailSlice.sendEmailLoading;
};

export const sendEmailResponse = (state) => {
  return state.sendEmailSlice.sendEmailResponse;
};

export const sendEmailErrors = (state) => {
  return state.sendEmailSlice.sendEmailErrors;
};

export const savedEmail = (state) => {
  return state.sendEmailSlice.sendedEmail;
};
