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
    removeAllSelectedData: (state, action) => {
      state.learnLanguageUpdateSelectedLanguages =[]
       
    },
    removeSelectedLanguagesItem: (state, action) => {
      state.learnLanguageUpdateSelectedLanguages =
        state.learnLanguageUpdateSelectedLanguages.filter(
          (item) => item._id !== action.payload
        );
    },
    addLearnLanguageSelected: (state, { payload }) => {
      state.learnLanguageUpdateSelectedLanguages =
      state.learnLanguageByIdResponse.data.nativeLanguages;
    },
    addLearnLanguageSelectedLanguages: (state, { payload }) => {
      if (!payload) {
        state.learnLanguageUpdateSelectedLanguages =
          state.learnLanguageByIdResponse.data.nativeLanguages;
      } else {
        state.learnLanguageUpdateSelectedLanguages = state.learnLanguageUpdateSelectedLanguages?.filter(
          (item) => (item._id ? item?._id : item?.value) !== (payload._id ? payload._id  : payload.value )
        );
        state.learnLanguageUpdateSelectedLanguages = [...state.learnLanguageUpdateSelectedLanguages,payload]
        // state.learnLanguageUpdateSelectedLanguages?.push(payload);removeAllCreateSelectedLanguages
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
      state.learnLanguageUpdateSelectedLanguages =
      state.learnLanguageByIdResponse.data.nativeLanguages;
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
  removeAllSelectedData,
  addLearnLanguageSelected
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
