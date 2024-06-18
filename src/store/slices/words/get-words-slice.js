import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsService } from "../../../services";

const initialState = {
  getWordsLoading: false,
  getWordsResponse: null,
  getWordsError: null,
};

export const getWordsThunk = createAsyncThunk(
  "getWords",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getWordsService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWordsSlice = createSlice({
  name: "getWords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWordsThunk.pending, (state) => {
      state.getWordsLoading = true;
    });
    builder.addCase(getWordsThunk.fulfilled, (state, { payload }) => {
      state.getWordsLoading = false;
      state.getWordsResponse = payload;
    });
    builder.addCase(getWordsThunk.rejected, (state, { payload }) => {
      state.getWordsLoading = false;
      state.getWordsError = payload;
    });
  },
});

export const wordsLoadingData = (state) => {
  return state.getWordsSlice.getWordsLoading;
};

export const wordsResponseData = (state) => {
  return state.getWordsSlice.getWordsResponse;
};

export const wordsErrorData = (state) => {
  return state.getWordsSlice.getWordsError;
};
