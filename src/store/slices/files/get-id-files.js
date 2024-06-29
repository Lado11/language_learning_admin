import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filesGetIdService } from "../../../services/files/files-services";

const initialState = {
    filesGetIdloading: false,
    filesGetIdBool: false,
    filesGetIdResponse: null,
    filesGetIdErrors: null,
};

export const filesGetIdThunk = createAsyncThunk(
  "filesGetId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await filesGetIdService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  filesGetIdSlice = createSlice({
  name: "filesGetId",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(filesGetIdThunk.pending, (state) => {
      state. filesGetIdloading = true;
    });
    builder.addCase(
        filesGetIdThunk.fulfilled,
      (state, { payload }) => {
        state.filesGetIdloading = false;
        state.filesGetIdResponse = payload;
        state.filesGetIdBool = true;
      }
    );
    builder.addCase(filesGetIdThunk.rejected, (state, { payload }) => {
      state.filesGetIdloading = false;
      state.filesGetIdErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getfilesGetIdloading = (state) => {
  return state.filesGetIdSlice.filesGetIdloading;
};
export const getfilesGetIdBool = (state) => {
  return state.filesGetIdSlice.filesGetIdBool;
};
export const getfilesGetIdResponse = (state) => {
  return state.filesGetIdSlice.filesGetIdResponse;
};
export const getfilesGetIdErrors = (state) => {
  return state.filesGetIdSlice.filesGetIdErrors;
};
