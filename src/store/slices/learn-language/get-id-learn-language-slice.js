import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageGetIdService } from "../../../services";

const initialState = {
  learnLanguageByIdLoading: false,
  learnLanguageByIdResponse: null,
  learnLanguageByIdError: null,
  learnUpdatedLanguages: [],
};

export const learnLanguageByIdThunk = createAsyncThunk(
  "learnLanguageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await learnLanguageGetIdService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const learnLanguageByIdSlice = createSlice({
  name: "learnLanguageById",
  initialState,
  reducers: {
    removeSelectedLanguagesItem: (state, action) => {
      state.learnUpdatedLanguages = state.learnUpdatedLanguages.filter(
        (item) => item._id !== action.payload
      );
    },
    getNewArr: (state, { payload }) => {
      if (payload) {
        state.learnUpdatedLanguages.push(payload);
      } else {
        state.learnUpdatedLanguages =
          state.learnLanguageByIdResponse?.data?.nativeLanguages;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(learnLanguageByIdThunk.pending, (state) => {
      state.learnLanguageByIdLoading = true;
    });
    builder.addCase(learnLanguageByIdThunk.fulfilled, (state, { payload }) => {
      state.learnLanguageByIdLoading = false;
      state.learnLanguageByIdResponse = payload;
    });
    builder.addCase(learnLanguageByIdThunk.rejected, (state, { payload }) => {
      state.learnLanguageByIdLoading = false;
      state.learnLanguageByIdError = payload;
    });
  },
});

export const { getNewArr,removeSelectedLanguagesItem } = learnLanguageByIdSlice.actions;

export const getLearnLanguageByIdLoading = (state) => {
  return state.learnLanguageByIdSlice.learnLanguageByIdLoading;
};

export const getLearnLanguageByIdResponse = (state) => {
  return state.learnLanguageByIdSlice.learnLanguageByIdResponse;
};

export const getLearnLanguageByIdError = (state) => {
  return state.learnLanguageByIdSlice.learnLanguageByIdError;
};

export const getUpdatedLanguages = (state) => {
  return state.learnLanguageByIdSlice.learnUpdatedLanguages;
};
