import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { voiceGetIdService } from "../../../services/files/files-services";

const initialState = {
    voiceGetIdloading: false,
    voiceGetIdBool: false,
    voiceGetIdResponse: null,
    voiceGetIdErrors: null,
};

export const voiceGetIdThunk = createAsyncThunk(
  "voiceGetId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await voiceGetIdService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const  voiceGetIdSlice = createSlice({
  name: "voiceGetId",
  initialState,
  reducers: {
    // deleteNativeCreateBool: (state) => {
    //   state.nativeCreateBool = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(voiceGetIdThunk.pending, (state) => {
      state. voiceGetIdloading = true;
    });
    builder.addCase(
        voiceGetIdThunk.fulfilled,
      (state, { payload }) => {
        state.voiceGetIdloading = false;
        state.voiceGetIdResponse = payload;
        state.voiceGetIdBool = true;
      }
    );
    builder.addCase(voiceGetIdThunk.rejected, (state, { payload }) => {
      state.voiceGetIdloading = false;
      state.voiceGetIdErrors = payload;
    });
  },
});

// export const { deleteNativeCreateBool } = nativeLanguageCreateSlice.actions;

export const getvoiceGetIdloading = (state) => {
  return state.voiceGetIdSlice.voiceGetIdloading;
};
export const getvoiceGetIdBool = (state) => {
  return state.voiceGetIdSlice.voiceGetIdBool;
};
export const getvoiceGetIdResponse = (state) => {
  return state.voiceGetIdSlice.voiceGetIdResponse;
};
export const getvoiceGetIdErrors = (state) => {
  return state.voiceGetIdSlice.voiceGetIdErrors;
};
