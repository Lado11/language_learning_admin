import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exelWordUpdateService } from "../../../services/words/put-exel-word";

const initialState = {
    updateExelWordsLoading: false,
    updateExelWordsResponse: null,
    updateExelWordsError: null,
};

export const updateExelWordsThunk = createAsyncThunk(
  "updateExelWords",
  async (data, { rejectWithValue }) => {
    try {
      const response = await exelWordUpdateService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExelWordsSlice = createSlice({
  name: "updateWordsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateExelWordsThunk.pending, (state) => {
      state.updateExelWordsLoading = true;
    });
    builder.addCase(updateExelWordsThunk.fulfilled, (state, { payload }) => {
      state.updateExelWordsLoading = false;
      state.updateExelWordsResponse = payload;
    });
    builder.addCase(updateExelWordsThunk.rejected, (state, { payload }) => {
      state.updateExelWordsLoading = false;
      state.updateExelWordsError = payload;
    });
  },
});

export const updateExelWordsLoadingData = (state) => {
  return state.updateExelWordsSlice.updateExelWordsLoading;
};

export const updateExelWordsResponseData = (state) => {
  return state.updateExelWordsSlice.updateExelWordsResponse;
};

export const updateExelWordsErrorData = (state) => {
  return state.updateExelWordsSlice.updateExelWordsError;
};
