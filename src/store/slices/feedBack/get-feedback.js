import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { feedBackGetService } from "../../../services/feedBack/get-feedBack-service";

const initialState = {
    feedBackGetloading: false,
    feedBackGetBool: false,
    feedBackGetResponse: null,
    feedBackGetErrors: null,
};

export const feedBackGetThunk = createAsyncThunk(
  "feedBackGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await feedBackGetService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const feedBackGetSlice = createSlice({
  name: "feedBackGetSlice",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(feedBackGetThunk.pending, (state) => {
      state.feedBackGetloading = true;
    });
    builder.addCase(feedBackGetThunk.fulfilled, (state, { payload }) => {
      state.feedBackGetloading = false;
      state.feedBackGetResponse = payload;
      state.feedBackGetBool = true;
    });
    builder.addCase(feedBackGetThunk.rejected, (state, { payload }) => {
      state.feedBackGetloading = false;
      state.feedBackGetErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getFeedBackLoading = (state) => {
  return state.feedBackGetSlice.feedBackGetloading;
};
export const getFeedBackBool = (state) => {
  return state.feedBackGetSlice.feedBackGetBool;
};
export const getFeedBackResponse = (state) => {
  return state.feedBackGetSlice.feedBackGetResponse;
};
export const getFeedBackErrors = (state) => {
  return state.feedBackGetSlice.feedBackGetErrors;
};
