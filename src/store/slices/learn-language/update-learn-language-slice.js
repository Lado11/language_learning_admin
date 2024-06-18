import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageUpdateService } from "../../../services";

const initialState = {
  learnLanguageUpdateLoading: false,
  learnLanguageUpdateResponse: null,
  learnLanguageUpdateError: null,
  learnLanguageBool: false,
};

export const learnLanguageUpdateThunk = createAsyncThunk(
  "updateLearnLanguage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await learnLanguageUpdateService(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const learnLanguageUpdateSlice = createSlice({
  name: "updateLearnLanguage",
  initialState,
  reducers: {
    deleteLearnUpdateResponse: (state) => {
      state.learnLanguageUpdateResponse = null;
    },
    deleteLearnUpdateBool: (state) => {
      state.learnLanguageBool = false;
    },
    removeUpdateLanguagesItem: (state, action) => {
      state.selectedLanguages = state.selectedLanguages.filter(
        (item) => item._id !== action.payload
      );
    },
  
  },
  extraReducers: (builder) => {
    builder.addCase(learnLanguageUpdateThunk.pending, (state) => {
      state.learnLanguageUpdateLoading = true;
    });
    builder.addCase(
      learnLanguageUpdateThunk.fulfilled,
      (state, { payload }) => {
        state.learnLanguageUpdateLoading = false;
        state.learnLanguageUpdateResponse = payload;
        state.learnLanguageBool = true;
      }
    );
    builder.addCase(learnLanguageUpdateThunk.rejected, (state, { payload }) => {
      state.learnLanguageUpdateLoading = false;
      state.learnLanguageUpdateError = payload;
    });
  },
});

export const { deleteLearnUpdateBool,removeUpdateLanguagesItem,deleteLearnUpdateResponse } = learnLanguageUpdateSlice.actions;

export const getUpdatedLearnLanguageBool = (state) => {
  return state.learnLanguageUpdateSlice.learnLanguageBool;
};

export const getUpdatedLearnLanguageLoading = (state) => {
  return state.learnLanguageUpdateSlice.learnLanguageUpdateLoading;
};

export const getUpdatedLearnLanguageResponse = (state) => {
  return state.learnLanguageUpdateSlice.learnLanguageUpdateResponse;
};

export const getUpdatedLearnLanguageError = (state) => {
  return state.learnLanguageUpdateSlice.learnLanguageUpdateError;
};
