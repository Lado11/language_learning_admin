import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageDeleteService } from "../../../services/learn-language/delete-learn-language-service";

const initialState = {
  learnLanguageDeleteLoading: false,
  learnLanguageDeleteResponse: null,
  learnLanguageDeleteError: null,
  learnBool:false
};

export const learnLanguageDeleteThunk = createAsyncThunk(
  "learnLanguageDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await learnLanguageDeleteService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const learnLanguageDeleteSlice = createSlice({
  name: "learnLanguageDelete",
  initialState,
  reducers: {
    deleteLearnBool: (state) => {
      state.learnBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(learnLanguageDeleteThunk.pending, (state) => {
      state.learnLanguageDeleteLoading = true;
    });
    builder.addCase(
      learnLanguageDeleteThunk.fulfilled,
      (state, { payload }) => {
        state.learnLanguageDeleteLoading = false;
        state.learnLanguageDeleteResponse = payload;
        state.learnBool = true
      }
    );
    builder.addCase(learnLanguageDeleteThunk.rejected, (state, { payload }) => {
      state.learnLanguageDeleteLoading = false;
      state.learnLanguageDeleteError = payload;
    });
  },
});


export const { deleteLearnBool  } = learnLanguageDeleteSlice.actions;

export const learnLangBool = (state) => {
  return state.learnLanguageDeleteSlice.learnBool;
};

export const learnLanguageDeleteLoading = (state) => {
  return state.learnLanguageDeleteSlice.learnLanguageDeleteLoading;
};

export const learnLanguageDeleteResponse = (state) => {
  return state.learnLanguageDeleteSlice.learnLanguageDeleteResponse;
};

export const learnLanguageDeleteError = (state) => {
  return state.learnLanguageDeleteSlice.learnLanguageDeleteErrors;
};
