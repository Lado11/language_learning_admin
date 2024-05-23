import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageCreateService } from "../../../services/learn-language/create-learn-language-service";

const initialState = {
  createLearnLanguageLoading: false,
  createLearnLanguageResponse: null,
  createLearnLanguageError: null,
  createLearnLanguageSuccess: false,
  selectedLanguages: [],
};

export const createLearnLanguageThunk = createAsyncThunk(
  "createLearnLanguage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await learnLanguageCreateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLearnLanguageSlice = createSlice({
  name: "createLearnLanguage",
  initialState,
  reducers: {
    deleteLerningCreateResponse: (state) => {
      state.createLearnLanguageResponse = "";
    },
    addLanguages: (state, { payload }) => {
      state.selectedLanguages.push(payload);
    },
    removeLanguagesItem: (state, action) => {
      state.selectedLanguages = state.selectedLanguages.filter(
        (item) => item.key !== action.payload
      );
    },
    removeAllLanguages: (state) => {
      state.selectedLanguages = [];
    },
    changeLearnLanguageCreateSuccess: (state) => {
      state.createLearnLanguageSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createLearnLanguageThunk.pending, (state) => {
      state.createLearnLanguageLoading = true;
    });
    builder.addCase(
      createLearnLanguageThunk.fulfilled,
      (state, { payload }) => {
        state.createLearnLanguageSuccess = true;
        state.createLearnLanguageLoading = false;
        state.createLearnLanguageResponse = payload;
      }
    );
    builder.addCase(createLearnLanguageThunk.rejected, (state, { payload }) => {
      state.createLearnLanguageLoading = false;
      state.createLearnLanguageError = payload;
    });
  },
});

export const {
  addLanguages,
  removeLanguagesItem,
  changeLearnLanguageCreateSuccess,
  removeAllLanguages,
  deleteLerningCreateResponse,
} = createLearnLanguageSlice.actions;

export const learnLanguageCreateLoading = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageLoading;
};

export const learnLanguageCreateResponse = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageResponse;
};

export const learnLanguageCreateError = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageError;
};

export const learnLanguageSelectedLanguages = (state) => {
  return state.createLearnLanguageSlice.selectedLanguages;
};

export const learnLanguagesCreateSuccess = (state) => {
  return state.createLearnLanguageSlice.createLearnLanguageSuccess;
};
