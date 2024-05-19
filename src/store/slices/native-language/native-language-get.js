import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageGetService } from "../../../services/native-language/native-language-get-service";

const initialState = {
  nativeGetloading: false,
  nativeGetBool: false,
  nativeGetResponse: null,
  nativeGetErrors: null,
};

export const nativeLanguageGetThunk = createAsyncThunk(
  "nativeGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await nativeLanguageGetService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageGetSlice = createSlice({
  name: "nativeGet",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(nativeLanguageGetThunk.pending, (state) => {
      state.nativeGetloading = true;
    });
    builder.addCase(nativeLanguageGetThunk.fulfilled, (state, { payload }) => {
      state.nativeGetloading = false;
      state.nativeGetResponse = payload;
      state.nativeGetBool = true;
    });
    builder.addCase(nativeLanguageGetThunk.rejected, (state, { payload }) => {
      state.nativeGetloading = false;
      state.nativeGetErrors = payload;
    });
  },
});


// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;


export const getNativeGetloading = (state) => {
  return state.getNativeSlice.nativeGetloading;
};
export const getNativeBool = (state) => {
  return state.getNativeSlice.nativeGetBool;
};
export const getNativeGetResponse = (state) => {
  return state.getNativeSlice.nativeGetResponse;
};
export const getNativeGetErrors = (state) => {
  return state.getNativeSlice.nativeGetErrors;
};
