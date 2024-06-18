import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nativeLanguageGetService } from "../../../services/native-language/native-language-get-service";
import { dashboardGetService } from "../../../services/dashboard/get-dashboard";

const initialState = {
    dashboardGetloading: false,
    dashboardGetBool: false,
    dashboardGetResponse: null,
    dashboardGetErrors: null,
};

export const dashboardGetThunk = createAsyncThunk(
  "dashboardGet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardGetService();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dashboardGetSlice = createSlice({
  name: "dashboardGetSlice",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(dashboardGetThunk.pending, (state) => {
      state.dashboardGetloading = true;
    });
    builder.addCase(dashboardGetThunk.fulfilled, (state, { payload }) => {
      state.dashboardGetloading = false;
      state.dashboardGetResponse = payload;
      state.dashboardGetBool = true;
    });
    builder.addCase(dashboardGetThunk.rejected, (state, { payload }) => {
      state.dashboardGetloading = false;
      state.dashboardGetErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getDashboardGetloading = (state) => {
  return state.dashboardGetSlice.dashboardGetloading;
};
export const getDashboardBool = (state) => {
  return state.dashboardGetSlice.dashboardGetBool;
};
export const getDashboardGetResponse = (state) => {
  return state.dashboardGetSlice.dashboardGetResponse;
};
export const getDashboardGetErrors = (state) => {
  return state.dashboardGetSlice.dashboardGetErrors;
};
