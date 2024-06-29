import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filesDeleteService } from "../../../services/files/files-services";

const initialState = {
    filesDeleteloading: false,
    filesDeleteBool: false,
    filesDeleteResponse: null,
    filesDeleteErrors: null,
};

export const filesDeleteThunk = createAsyncThunk(
  "filesDelete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await filesDeleteService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  filesDeleteSlice = createSlice({
  name: "filesDelete",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(filesDeleteThunk.pending, (state) => {
      state. filesDeleteloading = true;
    });
    builder.addCase(
        filesDeleteThunk.fulfilled,
      (state, { payload }) => {
        state.filesDeleteloading = false;
        state.filesDeleteResponse = payload;
        state.filesDeleteBool = true;
      }
    );
    builder.addCase(filesDeleteThunk.rejected, (state, { payload }) => {
      state.filesDeleteloading = false;
      state.filesDeleteErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const Deletefilesloading = (state) => {
  return state.filesDeleteSlice.filesDeleteloading;
};
export const DeletefilesBool = (state) => {
  return state.filesDeleteSlice.filesDeleteBool;
};
export const DeletefilesResponse = (state) => {
  return state.filesDeleteSlice.filesDeleteResponse;
};
export const DeletefilesErrors = (state) => {
  return state.filesDeleteSlice.filesDeleteErrors;
};
