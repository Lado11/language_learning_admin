import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageCreateService } from "../../../services/native-language/native-language-create-service";

const initialState = {
  isLoading: false,
  isSuccess: false,
  response: null,
  errors: null,
};

export const createNativeLanguage = createAsyncThunk(
  "nativeLanguage/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await nativeLanguageCreateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageCreateSlice = createSlice({
  name: "nativeLanguageCreate",
  initialState,
  reducers: {
    clearNativeCreateResponse: (state) => {
      state.response = null;
    },
    clearNativeCreateSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNativeLanguage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNativeLanguage.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.response = payload;
      state.isSuccess = true;
    });
    builder.addCase(createNativeLanguage.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    });
  },
});

export const { clearNativeCreateSuccess, clearNativeCreateResponse } = nativeLanguageCreateSlice.actions;

export const selectNativeCreateLoading = (state) => state.nativeLanguageCreate.isLoading;
export const selectNativeCreateSuccess = (state) => state.nativeLanguageCreate.isSuccess;
export const selectNativeCreateResponse = (state) => state.nativeLanguageCreate.response;
export const selectNativeCreateError = (state) => state.nativeLanguageCreate.errors;

export default nativeLanguageCreateSlice.reducer;
