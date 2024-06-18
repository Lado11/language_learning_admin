import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsService } from "../../../services";
import { exelWordCreateService } from "../../../services/words/post-exel-words";

const initialState = {
    createExelWordsLoading: false,
    createExelWordsResponse: null,
    createExelWordsError: null,
};

export const createExelWordsThunk = createAsyncThunk(
  "craeteExelWords",
  async (data, { rejectWithValue }) => {
    try {
      const response = await exelWordCreateService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const craeteExelWordsSlice = createSlice({
  name: "craeteWordsSlice",
  initialState,
  reducers: {
    deleteAddWordExelResponse: (state) => {
      state.createExelWordsResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createExelWordsThunk.pending, (state) => {
      state.createExelWordsLoading = true;
    });
    builder.addCase(createExelWordsThunk.fulfilled, (state, { payload }) => {
      state.createExelWordsLoading = false;
      state.createExelWordsResponse = payload;
    });
    builder.addCase(createExelWordsThunk.rejected, (state, { payload }) => {
      state.createExelWordsLoading = false;
      state.createExelWordsError = payload;
    });
  },
});
export const { deleteAddWordExelResponse } = craeteExelWordsSlice.actions;

export const createExelWordsLoadingData = (state) => {
  return state.craeteExelWordsSlice.createExelWordsLoading;
};

export const createExelWordsResponseData = (state) => {
  return state.craeteExelWordsSlice.createExelWordsResponse;
};

export const createExelWordsErrorData = (state) => {
  return state.craeteExelWordsSlice.createExelWordsError;
};
