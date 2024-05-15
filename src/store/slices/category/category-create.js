import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageCreateService } from "../../../services/native-language/native-language-cretae-service";
import { categoryCreateService } from "../../../services/category/category-create-service";

const initialState = {
    categoryCreateloading: false,
    categoryCreateBool: false,
    categoryCreateResponse: null,
    categoryCreateErrors: null,
};

export const categoryCreateThunk = createAsyncThunk(
  "categoryCreate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await categoryCreateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoryCreateSlice = createSlice({
  name: "categoryCreate",
  initialState,
  reducers: {
    deleteCategoryCreateBool: (state) => {
      state.categoryCreateBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryCreateThunk.pending, (state) => {
      state.categoryCreateloading = true;
    });
    builder.addCase(categoryCreateThunk.fulfilled, (state, { payload }) => {
      state.categoryCreateloading = false;
      state.categoryCreateResponse = payload;
      state.categoryCreateBool = true;
    });
    builder.addCase(categoryCreateThunk.rejected, (state, { payload }) => {
      state.categoryCreateloading = false;
      state.categoryCreateErrors = payload;
    });
  },
});


export const { deleteCategoryCreateBool } = categoryCreateSlice.actions;


export const getCategoryCreateLoading = (state) => {
  return state.categoryCreateSlice.categoryCreateloading;
};
export const getCategoryCreateBool = (state) => {
  return state.categoryCreateSlice.categoryCreateBool;
};
export const getCategoryCreateData = (state) => {
  return state.categoryCreateSlice.categoryCreateResponse;
};
export const getCategoryCreateError = (state) => {
  return state.categoryCreateSlice.categoryCreateErrors;
};
