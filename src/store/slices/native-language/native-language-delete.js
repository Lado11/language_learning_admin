import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageDeleteService } from "../../../services/native-language/native-language-delete-service";

const initialState = {
  nativeDeleteloading: false,
  nativeDeleteBool: false,
  nativeDeleteResponse: null,
  nativeDeleteErrors: null,
};

export const nativeLanguageDeleteThunk = createAsyncThunk(
  "nativeDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await nativeLanguageDeleteService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageDeleteSlice = createSlice({
  name: "nativeDelete",
  initialState,
  reducers: {
    deleteNativeDeleteBool: (state) => {
      state.nativeDeleteBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nativeLanguageDeleteThunk.pending, (state) => {
      state.nativeDeleteloading = true;
    });
    builder.addCase(
      nativeLanguageDeleteThunk.fulfilled,
      (state, { payload }) => {
        state.nativeDeleteloading = false;
        state.nativeDeleteResponse = payload;
        state.nativeDeleteBool = true;
      }
    );
    builder.addCase(
      nativeLanguageDeleteThunk.rejected,
      (state, { payload }) => {
        state.nativeDeleteloading = false;
        state.nativeDeleteErrors = payload;
      }
    );
  },
});

export const { deleteNativeDeleteBool } = nativeLanguageDeleteSlice.actions;

export const getNativeDeleteloading = (state) => {
  return state.nativeLanguageDeleteSlice.nativeDeleteloading;
};
export const getNativeDeleteBool = (state) => {
  return state.nativeLanguageDeleteSlice.nativeDeleteBool;
};
export const getNativeDeleteResponse = (state) => {
  return state.nativeLanguageDeleteSlice.nativeDeleteResponse;
};
export const getNativeDeleteErrors = (state) => {
  return state.nativeLanguageDeleteSlice.nativeDeleteErrors;
};
