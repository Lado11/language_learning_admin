import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filesIdGetService } from "../../../services/files/files-services";

const initialState = {
    filesIdGetloading: false,
    filesIdGetBool: false,
    filesIdGetResponse: null,
    filesIdGetErrors: null,
};

export const filesIdGetThunk = createAsyncThunk(
  "filesIdGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await filesIdGetService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  filesIdGetSlice = createSlice({
  name: "filesIdGet",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(filesIdGetThunk.pending, (state) => {
      state. filesIdGetloading = true;
    });
    builder.addCase(
        filesIdGetThunk.fulfilled,
      (state, { payload }) => {
        state.filesIdGetloading = false;
        state.filesIdGetResponse = payload;
        state.filesIdGetBool = true;
      }
    );
    builder.addCase(filesIdGetThunk.rejected, (state, { payload }) => {
      state.filesIdGetloading = false;
      state.filesIdGetErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getfilesIdGetloading = (state) => {
  return state.filesIdGetSlice.filesIdGetloading;
};
export const getfilesIdGetBool = (state) => {
  return state.filesIdGetSlice.filesIdGetBool;
};
export const getfilesIdGetResponse = (state) => {
  return state.filesIdGetSlice.filesIdGetResponse;
};
export const getfilesIdGetErrors = (state) => {
  return state.filesIdGetSlice.filesIdGetErrors;
};
