import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wordExelDeleteService } from "../../../services/words/delete-exel-words";

const initialState = {
  wordsExelDeleteLoading: false,
  wordsExelDeleteResponse: null,
  wordsExelDeleteError: null,
};

export const wordsExelDeleteThunk = createAsyncThunk(
  "wordsExelDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await wordExelDeleteService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wordsExelDeleteSlice = createSlice({
  name: "wordsExelDeleteSlice",
  initialState,
  reducers: {
    deleteWordsDelete: (state) => {
      state.wordsExelDeleteResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wordsExelDeleteThunk.pending, (state) => {
      state.wordsExelDeleteLoading = true;
    });
    builder.addCase(wordsExelDeleteThunk.fulfilled, (state, { payload }) => {
      state.wordsExelDeleteLoading = false;
      state.wordsExelDeleteResponse = payload;
    });
    builder.addCase(wordsExelDeleteThunk.rejected, (state, { payload }) => {
      state.wordsExelDeleteLoading = false;
      state.wordsExelDeleteError = payload;
    });
  },
});

export const { deleteWordsDelete } = wordsExelDeleteSlice.actions;


export const wordsExelDeleteLoading = (state) => {
  return state.wordsExelDeleteSlice.wordsExelDeleteLoading;
};

export const wordsExelDeleteResponse = (state) => {
  return state.wordsExelDeleteSlice.wordsExelDeleteResponse;
};

export const wordsExelDeleteError = (state) => {
  return state.wordsExelDeleteSlice.wordsExelDeleteError;
};
