import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageGetIdService } from "../../../services/native-language/getId-native-language";

const initialState = {
  nativeGetIdloading: false,
  nativeGetIdBool: false,
  nativeGetIdResponse: null,
  nativeGetIdErrors: null,
};

export const nativeLanguageGetIdThunk = createAsyncThunk(
  "nativeGetId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await nativeLanguageGetIdService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageGetIdSlice = createSlice({
  name: "nativeGetId",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(nativeLanguageGetIdThunk.pending, (state) => {
      state.nativeGetIdloading = true;
    });
    builder.addCase(
      nativeLanguageGetIdThunk.fulfilled,
      (state, { payload }) => {
        state.nativeGetIdloading = false;
        state.nativeGetIdResponse = payload;
        state.nativeGetIdBool = true;
      }
    );
    builder.addCase(nativeLanguageGetIdThunk.rejected, (state, { payload }) => {
      state.nativeGetIdloading = false;
      state.nativeGetIdErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getNativeGetIdloading = (state) => {
  return state.getIdNativeSlice.nativeGetIdloading;
};
export const getNativeGetIdBool = (state) => {
  return state.getIdNativeSlice.nativeGetIdBool;
};
export const getNativeGetIdResponse = (state) => {
  return state.getIdNativeSlice.nativeGetIdResponse;
};
export const getNativeGetIdErrors = (state) => {
  return state.getIdNativeSlice.nativeGetIdErrors;
};
