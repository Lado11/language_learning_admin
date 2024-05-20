import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryGetService } from "../../../services/category/get-category-service";

const initialState = {
  categoryGetloading: false,
  categoryGetBool: false,
  categoryGetResponse: null,
  categoryGetErrors: null,
};

export const categoryGetThunk = createAsyncThunk(
  "categoryGet",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await categoryGetService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoryGetSlice = createSlice({
  name: "categoryGet",
  initialState,
  reducers: {
    deleteCategoryGetBool: (state) => {
      state.categoryGetBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryGetThunk.pending, (state) => {
      state.categoryGetloading = true;
    });
    builder.addCase(categoryGetThunk.fulfilled, (state, { payload }) => {
      state.categoryGetloading = false;
      state.categoryGetResponse = payload;
      state.categoryGetBool = true;
    });
    builder.addCase(categoryGetThunk.rejected, (state, { payload }) => {
      state.categoryGetloading = false;
      state.categoryGetErrors = payload;
    });
  },
});

export const { deleteGetBool } = categoryGetSlice.actions;

export const getCategoryGetLoading = (state) => {
  return state.categoryGetSlice.categoryGetloading;
};
export const getCategoryGetBool = (state) => {
  return state.categoryGetSlice.categoryGetBool;
};
export const getCategoryGetData = (state) => {
  return state.categoryGetSlice.categoryGetResponse;
};
export const getCategoryGetError = (state) => {
  return state.categoryGetSlice.categoryGetErrors;
};
