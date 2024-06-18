import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsDeleteService } from "../../../services";

const initialState = {
  getWordsDeleteLoading: false,
  getWordsDeleteResponse: null,
  getWordsDeleteError: null,
};

export const getWordsDeleteThunk = createAsyncThunk(
  "getWordsDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getWordsDeleteService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWordsDeleteSlice = createSlice({
  name: "getWordsDeleteSlice",
  initialState,
  reducers: {
    deleteWordsDeleteResponse: (state) => {
      state.getWordsDeleteResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWordsDeleteThunk.pending, (state) => {
      state.getWordsDeleteLoading = true;
    });
    builder.addCase(getWordsDeleteThunk.fulfilled, (state, { payload }) => {
      state.getWordsDeleteLoading = false;
      state.getWordsDeleteResponse = payload;
    });
    builder.addCase(getWordsDeleteThunk.rejected, (state, { payload }) => {
      state.getWordsDeleteLoading = false;
      state.getWordsDeleteError = payload;
    });
  },
});

export const { deleteWordsDeleteResponse } = getWordsDeleteSlice.actions;


export const wordsDeleteLoading = (state) => {
  return state.getWordsDeleteSlice.getWordsDeleteLoading;
};

export const wordsDeleteResponse = (state) => {
  return state.getWordsDeleteSlice.getWordsDeleteResponse;
};

export const wordsDeleteError = (state) => {
  return state.getWordsDeleteSlice.getWordsDeleteError;
};
