import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageCreateService } from "../../../services/learn-language/create-learn-language-service";

const initialState = {
  createLearnLanguageLoading: false,
  createLearnLanguageResponse: null,
  createLearnLanguageError: null,
};

export const createLearnLanguageThunk = createAsyncThunk(
  "createLearnLanguage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await learnLanguageCreateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLearnLanguageSlice = createSlice({
  name: "createLearnLanguage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createLearnLanguageThunk.pending, (state) => {
      state.nativeCreateloading = true;
    });
    builder.addCase(
      createLearnLanguageThunk.fulfilled,
      (state, { payload }) => {
        state.nativeCreateloading = false;
        state.nativeCreateResponse = payload;
        state.nativeCreateBool = true;
      }
    );
    builder.addCase(createLearnLanguageThunk.rejected, (state, { payload }) => {
      state.nativeCreateloading = false;
      state.nativeCreateErrors = payload;
    });
  },
});

export const learnLanguageCreateLoading = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageLoading;
};

export const learnLanguageCreateResponse = (state) => {
  return state.createLearnLanguageSlice.learnLanguageCreateResponse;
};

export const learnLanguageCreateError = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageError;
};
