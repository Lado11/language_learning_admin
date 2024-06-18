import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetIdWordsExelService } from "../../../services/words/delete-exel-words";

const initialState = {
    wordsExelGetIdLoading: false,
    wordsExelGetIdResponse: null,
    wordsExelGetIdError: null,
};

export const wordsExelGetIdThunk = createAsyncThunk(
    "wordsExelGetId",
    async (data, { rejectWithValue }) => {
        try {
            const response = await GetIdWordsExelService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const wordsExelGetIdSlice = createSlice({
    name: "wordsExelGetIdSlice",
    initialState,
    reducers: {
        GetIdWordsGetIdResponse: (state) => {
            state.wordsGetIdResponse = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(wordsExelGetIdThunk.pending, (state) => {
            state.wordsExelGetIdLoading = true;
        });
        builder.addCase(wordsExelGetIdThunk.fulfilled, (state, { payload }) => {
            state.wordsExelGetIdLoading = false;
            state.wordsExelGetIdResponse = payload;
        });
        builder.addCase(wordsExelGetIdThunk.rejected, (state, { payload }) => {
            state.wordsExelGetIdLoading = false;
            state.wordsExelGetIdError = payload;
        });
    },
});

export const { GetIdWordsGetIdResponse } = wordsExelGetIdSlice.actions;


export const wordsExelGetIdLoading = (state) => {
    return state.wordsExelGetIdSlice.wordsExelGetIdLoading;
};

export const wordsExelGetIdResponse = (state) => {
    return state.wordsExelGetIdSlice.wordsExelGetIdResponse;
};

export const wordsExelGetIdError = (state) => {
    return state.wordsExelGetIdSlice.wordsExelGetIdError;
};
