import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filesGetService } from "../../../services/files/files-services";

const initialState = {
    filesGetloading: false,
    filesGetBool: false,
    filesGetResponse: null,
    filesGetErrors: null,
};

export const filesGetThunk = createAsyncThunk(
  "filesGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await filesGetService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  filesGetSlice = createSlice({
  name: "filesGet",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(filesGetThunk.pending, (state) => {
      state. filesGetloading = true;
    });
    builder.addCase(
        filesGetThunk.fulfilled,
      (state, { payload }) => {
        state.filesGetloading = false;
        state.filesGetResponse = payload;
        state.filesGetBool = true;
      }
    );
    builder.addCase(filesGetThunk.rejected, (state, { payload }) => {
      state.filesGetloading = false;
      state.filesGetErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getfilesGetloading = (state) => {
  return state.filesGetSlice.filesGetloading;
};
export const getfilesGetBool = (state) => {
  return state.filesGetSlice.filesGetBool;
};
export const getfilesGetResponse = (state) => {
  return state.filesGetSlice.filesGetResponse;
};
export const getfilesGetErrors = (state) => {
  return state.filesGetSlice.filesGetErrors;
};
