import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryDeleteService } from "../../../services/category/delete-category-service";

const initialState = {
  categoryCreateloading: false,
  categoryCreateBool: false,
  categoryCreateResponse: null,
  categoryCreateErrors: null,
};

export const categoryDeleteThunk = createAsyncThunk(
  "categoryCreate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryDeleteService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoryDeleteSlice = createSlice({
  name: "categoryDelete",
  initialState,
  reducers: {
    deleteCategoryDeleteBool: (state) => {
      state.categoryDeleteBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryDeleteThunk.pending, (state) => {
      state.categoryDeleteloading = true;
    });
    builder.addCase(categoryDeleteThunk.fulfilled, (state, { payload }) => {
      state.categoryDeleteloading = false;
      state.categoryDeleteResponse = payload;
      state.categoryDeleteBool = true;
    });
    builder.addCase(categoryDeleteThunk.rejected, (state, { payload }) => {
      state.categoryDeleteloading = false;
      state.categoryDeleteErrors = payload;
    });
  },
});

export const { deleteCategoryDeleteBool } = categoryDeleteSlice.actions;

export const getCategoryDeleteLoading = (state) => {
  return state.categoryDeleteSlice.categoryDeleteloading;
};
export const getCategoryDeleteBool = (state) => {
  return state.categoryDeleteSlice.categoryDeleteBool;
};
export const getCategoryDeleteData = (state) => {
  return state.categoryDeleteSlice.categoryDeleteResponse;
};
export const getCategoryDeleteError = (state) => {
  return state.categoryDeleteSlice.categoryDeleteErrors;
};
