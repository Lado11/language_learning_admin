import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsIdService, getWordsService } from "../../../services";

const initialState = {
  getWordsIdLoading: false,
  getWordsIdResponse: null,
  getWordsIdError: null,
};

export const getIdWordsThunk = createAsyncThunk(
  "wordsId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getWordsIdService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWordsIdSlice = createSlice({
  name: "wordsIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIdWordsThunk.pending, (state) => {
      state.getWordsIdLoading = true;
    });
    builder.addCase(getIdWordsThunk.fulfilled, (state, { payload }) => {
      state.getWordsIdLoading = false;
      state.getWordsIdResponse = payload;
    });
    builder.addCase(getIdWordsThunk.rejected, (state, { payload }) => {
      state.getWordsIdLoading = false;
      state.getWordsIdError = payload;
    });
  },
});

export const wordsIdLoading = (state) => {
  return state.getWordsIdSlice.getWordsIdLoading;
};

export const wordsIdResponse = (state) => {
  return state.getWordsIdSlice.getWordsIdResponse;
};

export const wordsIdError = (state) => {
  return state.getWordsIdSlice.getWordsIdError;
};
