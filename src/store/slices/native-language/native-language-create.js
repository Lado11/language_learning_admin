import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageCreateService } from "../../../services/native-language/native-language-cretae-service";

const initialState = {
  nativeCreateloading: false,
  nativeCreateBool: false,
  nativeCreateResponse: null,
  nativeCreateErrors: null,
};

export const nativeLanguageCreateThunk = createAsyncThunk(
  "nativeCreate",
  async (formData, { rejectWithValue }) => {
    
    try {
      const response = await nativeLanguageCreateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nativeLanguageCreateSlice = createSlice({
  name: "nativeCreate",
  initialState,
  reducers: {
    deleteNativeCreateBool: (state) => {
      state.nativeCreateBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nativeLanguageCreateThunk.pending, (state) => {
      state.nativeCreateloading = true;
    });
    builder.addCase(nativeLanguageCreateThunk.fulfilled, (state, { payload }) => {
      state.nativeCreateloading = false;
      state.nativeCreateResponse = payload;
      state.nativeCreateBool = true;
    });
    builder.addCase(nativeLanguageCreateThunk.rejected, (state, { payload }) => {
      state.nativeCreateloading = false;
      state.nativeCreateErrors = payload;
    });
  },
});


export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;


export const getNativeCreateLoading = (state) => {
  return state.createNativeSlice.nativeCreateloading;
};
export const getNativeCreateBool = (state) => {
  return state.createNativeSlice.nativeCreateBool;
};
export const getNativeCreateData = (state) => {
  return state.createNativeSlice.nativeCreateResponse;
};
export const getNativeCreateError = (state) => {
  return state.createNativeSlice.nativeCreateErrors;
};
