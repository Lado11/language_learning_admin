import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsUpdateService } from "../../../services";

const initialState = {
  wordsUpdateLoading: false,
  wordsUpdateResponse: null,
  wordsUpdateError: null,
};

export const wordsUpdateThunk = createAsyncThunk(
  "wordsUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getWordsUpdateService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wordsUpdateSlice = createSlice({
  name: "wordsUpdateSlice",
  initialState,
  reducers: {
    deleteWordUpdateResponse: (state) => {
      state.wordsUpdateResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wordsUpdateThunk.pending, (state) => {
      state.wordsUpdateLoading = true;
    });
    builder.addCase(wordsUpdateThunk.fulfilled, (state, { payload }) => {
      state.wordsUpdateLoading = false;
      state.wordsUpdateResponse = payload;
    });
    builder.addCase(wordsUpdateThunk.rejected, (state, { payload }) => {
      state.wordsUpdateLoading = false;
      state.wordsUpdateError = payload;
    });
  },
});
export const { deleteWordUpdateResponse  } = wordsUpdateSlice.actions;

export const wordsUpdateLoading = (state) => {
  return state.wordsUpdateSlice.wordsUpdateLoading;
};

export const wordsUpdateResponseData = (state) => {
  return state.wordsUpdateSlice.wordsUpdateResponse;
};

export const wordsUpdateError = (state) => {
  return state.wordsUpdateSlice.wordsUpdateError;
};
