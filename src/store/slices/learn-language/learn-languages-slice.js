import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageGetService } from "../../../services/learn-language/get-learn-languages-service";

const initialState = {
  getLearningLanguagesLoading: false,
  getLearningLanguagesResponse: null,
  getLearningLanguagesError: null,
};

export const learningLanguagesThunk = createAsyncThunk(
  "getLearningLanguages",
  async (_, { rejectWithValues }) => {
    try {
      const response = await learnLanguageGetService();
      return response.data;
    } catch (error) {
      return rejectWithValues(error.message);
    }
  }
);

export const learningLanguagesSlice = createSlice({
  name: "getLearningLanguages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(learningLanguagesThunk.pending, (state) => {
      state.getLearningLanguagesLoading = true;
    });
    builder.addCase(learningLanguagesThunk.fulfilled, (state, { payload }) => {
      state.getLearningLanguagesLoading = false;
      state.getLearningLanguagesResponse = payload;
    });
    builder.addCase(learningLanguagesThunk.rejected, (state, { payload }) => {
      state.getLearningLanguagesLoading = false;
      state.getLearningLanguagesError = payload;
    });
  },
});

export const learningLanguages = (state) => {
  return state.learningLanguagesSlice.getLearningLanguagesResponse;
};
