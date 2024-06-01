import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { learnLanguageGetIdService } from "../../../services";

const initialState = {
  learnLanguageByIdLoading: false,
  learnLanguageByIdResponse: null,
  learnLanguageByIdError: null,
  learnLanguageUpdateSelectedLanguages: [],
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
      state.learnLanguageUpdateSelectedLanguages =
        state.learnLanguageUpdateSelectedLanguages.filter(
          (item) => item._id !== action.payload
        );
    },
    addLearnLanguageSelectedLanguages: (state, { payload }) => {
      if (payload) {
        state.learnLanguageUpdateSelectedLanguages = state.learnLanguageUpdateSelectedLanguages?.filter(
          (item) => item._id !==payload._id 
        );
        state.learnLanguageUpdateSelectedLanguages.push(payload);
      } else {
        state.learnLanguageUpdateSelectedLanguages =
          state.learnLanguageByIdResponse?.data?.nativeLanguages;
      }
    },
    removeUpdateLanguagesItem: (state, action) => {
      state.learnUpdatedLanguages = state.learnUpdatedLanguages.filter(
        (item) => item._id !== action.payload
      );
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

export const {
  addLearnLanguageSelectedLanguages,
  removeSelectedLanguagesItem,
} = learnLanguageByIdSlice.actions;

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
  return state.learnLanguageByIdSlice.learnLanguageUpdateSelectedLanguages;
};
