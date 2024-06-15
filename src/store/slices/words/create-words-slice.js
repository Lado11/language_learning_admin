import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createWordsService } from "../../../services/words/create-words-service";

const initialState = {
    createWordsLoading: false,
    createWordsResponse: null,
    createWordsError: null,
};

export const createWordsThunk = createAsyncThunk(
  "createWords",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createWordsService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createWordsSlice = createSlice({
  name: "createWordsSlice",
  initialState,
  reducers: {
    deleteWordCreateResponse: (state) => {
      state.createWordsResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWordsThunk.pending, (state) => {
      state.createWordsLoading = true;
    });
    builder.addCase(createWordsThunk.fulfilled, (state, { payload }) => {
      state.createWordsLoading = false;
      state.createWordsResponse = payload;
    });
    builder.addCase(createWordsThunk.rejected, (state, { payload }) => {
      state.createWordsLoading = false;
      state.createWordsError = payload;
    });
  },
});

export const { deleteWordCreateResponse  } = createWordsSlice.actions;


export const createWordsLoadingData = (state) => {
  return state.createWordsSlice.createWordsLoading;
};

export const createWordsResponseData = (state) => {
  return state.createWordsSlice.createWordsResponse;
};

export const createWordsErrorData = (state) => {
  return state.createWordsSlice.createWordsError;
};
