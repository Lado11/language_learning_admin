import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryUpdateService } from "../../../services/category/update-category-service";

const initialState = {
    categoryUpdateloading: false,
    categoryUpdateBool: false,
    categoryUpdateResponse: null,
    categoryUpdateErrors: null,
};

export const categoryUpdateThunk = createAsyncThunk(
  "categoryUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await categoryUpdateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoryUpdateSlice = createSlice({
  name: "categoryUpdate",
  initialState,
  reducers: {
    deleteCategoryUpdateBool: (state) => {
      state.categoryUpdateBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryUpdateThunk.pending, (state) => {
      state.categoryUpdateloading = true;
    });
    builder.addCase(categoryUpdateThunk.fulfilled, (state, { payload }) => {
      state.categoryUpdateloading = false;
      state.categoryUpdateResponse = payload;
      state.categoryUpdateBool = true;
    });
    builder.addCase(categoryUpdateThunk.rejected, (state, { payload }) => {
      state.categoryUpdateloading = false;
      state.categoryUpdateErrors = payload;
    });
  },
});


export const { deleteCategoryUpdateBool } = categoryUpdateSlice.actions;


export const getCategoryUpdateLoading = (state) => {
  return state.categoryUpdateSlice.categoryUpdateloading;
};
export const getCategoryUpdateBool = (state) => {
  return state.categoryUpdateSlice.categoryUpdateBool;
};
export const getCategoryUpdateData = (state) => {
  return state.categoryUpdateSlice.categoryUpdateResponse;
};
export const getCategoryUpdateError = (state) => {
  return state.categoryUpdateSlice.categoryUpdateErrors;
};
