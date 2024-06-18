import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { feedBackGetIdService } from "../../../services/feedBack/get-feedBack-service";

const initialState = {
    feedBackGetIdloading: false,
    feedBackGetIdBool: false,
    feedBackGetIdResponse: null,
    feedBackGetIdErrors: null,
};

export const feedBackGetIdThunk = createAsyncThunk(
  "feedBackGetId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await feedBackGetIdService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const feedBackGetIdSlice = createSlice({
  name: "feedBackGetIdSlice",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(feedBackGetIdThunk.pending, (state) => {
      state.feedBackGetIdloading = true;
    });
    builder.addCase(feedBackGetIdThunk.fulfilled, (state, { payload }) => {
      state.feedBackGetIdloading = false;
      state.feedBackGetIdResponse = payload;
      state.feedBackGetIdBool = true;
    });
    builder.addCase(feedBackGetIdThunk.rejected, (state, { payload }) => {
      state.feedBackGetIdloading = false;
      state.feedBackGetIdErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const GetIdFeedBackLoading = (state) => {
  return state.feedBackGetIdSlice.feedBackGetIdloading;
};
export const GetIdFeedBackBool = (state) => {
  return state.feedBackGetIdSlice.feedBackGetIdBool;
};
export const GetIdFeedBackResponse = (state) => {
  return state.feedBackGetIdSlice.feedBackGetIdResponse;
};
export const GetIdFeedBackErrors = (state) => {
  return state.feedBackGetIdSlice.feedBackGetIdErrors;
};
