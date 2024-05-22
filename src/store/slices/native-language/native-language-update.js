import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageUpdateService } from "../../../services/native-language/native-language-update-service";

const initialState = {
  nativeUpdateloading: false,
  nativeUpdateBool: false,
  nativeUpdateResponse: null,
  nativeUpdateErrors: null,
};

export const nativeLanguageUpdateThunk = createAsyncThunk(
  "nativeUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await nativeLanguageUpdateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageUpdateSlice = createSlice({
  name: "nativeUpdate",
  initialState,
  reducers: {
    deleteNativeUpdateBool: (state) => {
      state.nativeUpdateBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nativeLanguageUpdateThunk.pending, (state) => {
      state.nativeUpdateloading = true;
    });
    builder.addCase(
      nativeLanguageUpdateThunk.fulfilled,
      (state, { payload }) => {
        state.nativeUpdateloading = false;
        state.nativeUpdateResponse = payload;
        state.nativeUpdateBool = true;
      }
    );
    builder.addCase(
      nativeLanguageUpdateThunk.rejected,
      (state, { payload }) => {
        state.nativeUpdateloading = false;
        state.nativeUpdateErrors = payload;
      }
    );
  },
});

export const { deleteNativeUpdateBool } = nativeLanguageUpdateSlice.actions;

export const getNativeUpdateLoading = (state) => {
  return state.nativeLanguageUpdateSlice.nativeUpdateloading;
};
export const getNativeUpdateBool = (state) => {
  return state.nativeLanguageUpdateSlice.nativeUpdateBool;
};
export const getNativeUpdateData = (state) => {
  return state.nativeLanguageUpdateSlice.nativeUpdateResponse;
};
export const getNativeUpdateError = (state) => {
  return state.nativeLanguageUpdateSlice.nativeUpdateErrors;
};
