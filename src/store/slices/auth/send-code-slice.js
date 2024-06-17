import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendCode } from "../../../services";

const initialState = {
  sendCodeLoading: false,
  sendCodeResponse: null,
  sendCodeError: null,
  code: "",
};

export const sendCodeThunk = createAsyncThunk(
  "sendCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendCode(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendCodeSlice = createSlice({
  name: "sendCode",
  initialState,
  reducers: {
    deletResponse: (state, { payload }) => {
      state.sendCodeResponse = null;
    },
    saveCode: (state, { payload }) => {
      state.code = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCodeThunk.pending, (state) => {
      state.sendCodeLoading = true;
    });
    builder.addCase(sendCodeThunk.fulfilled, (state, { payload }) => {
      state.sendCodeLoading = false;
      state.sendCodeResponse = payload;
    });
    builder.addCase(sendCodeThunk.rejected, (state, { payload }) => {
      state.sendCodeLoading = false;
      state.sendCodeError = payload;
    });
  },
});

export const { saveCode,deletResponse } = sendCodeSlice.actions;

export const sendCodeLoadingData = (state) => {
  return state.sendCodeSlice.sendCodeLoading;
};

export const sendCodeResponseData = (state) => {
  return state.sendCodeSlice.sendCodeResponse;
};

export const sendCodeErrorData = (state) => {
  return state.sendCodeSlice.sendCodeError;
};

export const savedCode = (state) => {
  return state.sendCodeSlice.code;
};
