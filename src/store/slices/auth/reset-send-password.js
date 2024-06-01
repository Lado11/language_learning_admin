import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../../../services/auth/reset-password-service";

const initialState = {
  resetPasswordLoading: false,
  resetPasswordResponse: null,
  resetPasswordErrors: null,
};

export const resetPasswordThunk = createAsyncThunk(
  "resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    deleteResponse: (state, ) => {
      state.resetPasswordResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.resetPasswordLoading = true;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
      state.resetPasswordLoading = false;
      state.resetPasswordResponse = payload;
    });
    builder.addCase(resetPasswordThunk.rejected, (state, { payload }) => {
      state.resetPasswordLoading = false;
      state.resetPasswordErrors = payload;
    });
  },
});


export const { deleteResponse } = resetPasswordSlice.actions;

export const resetPasswordLoading = (state) => {
  return state.resetPasswordSlice.resetPasswordLoading;
};

export const resetPasswordResponse = (state) => {
  return state.resetPasswordSlice.resetPasswordResponse;
};

export const resetPasswordError = (state) => {
  return state.resetPasswordSlice.resetPasswordError;
};
