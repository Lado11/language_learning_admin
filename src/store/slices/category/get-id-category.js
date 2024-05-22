import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryGetIdService } from "../../../services/category/get-id-category";

const initialState = {
    categoryGetIdloading: false,
    categoryGetIdBool: false,
    categoryGetIdResponse: null,
    categoryGetIdErrors: null,
};

export const categoryGetIdThunk = createAsyncThunk(
  "categoryGetId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await categoryGetIdService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  categoryGetIdSlice = createSlice({
  name: " categoryGetId",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryGetIdThunk.pending, (state) => {
      state. categoryGetIdloading = true;
    });
    builder.addCase(
        categoryGetIdThunk.fulfilled,
      (state, { payload }) => {
        state.categoryGetIdloading = false;
        state.categoryGetIdResponse = payload;
        state.categoryGetIdBool = true;
      }
    );
    builder.addCase(categoryGetIdThunk.rejected, (state, { payload }) => {
      state.categoryGetIdloading = false;
      state.categoryGetIdErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getCategoryGetIdloading = (state) => {
  return state.categoryGetIdSlice.categoryGetIdloading;
};
export const getCategoryGetIdBool = (state) => {
  return state.categoryGetIdSlice.categoryGetIdBool;
};
export const getCategoryGetIdResponse = (state) => {
  return state.categoryGetIdSlice.categoryGetIdResponse;
};
export const getCategoryGetIdErrors = (state) => {
  return state.categoryGetIdSlice.categoryGetIdErrors;
};
