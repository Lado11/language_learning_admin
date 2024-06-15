import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWordsExelService } from "../../../services/words/delete-exel-words";

const initialState = {
    wordsExelGetLoading: false,
    wordsExelGetResponse: null,
    wordsExelGetError: null,
};

export const wordsExelGetThunk = createAsyncThunk(
    "wordsExelGet",
    async (data, { rejectWithValue }) => {
        try {
            const response = await getWordsExelService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const wordsExelGetSlice = createSlice({
    name: "wordsExelGetSlice",
    initialState,
    reducers: {
        GetWordsGetResponse: (state) => {
            state.wordsGetResponse = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(wordsExelGetThunk.pending, (state) => {
            state.wordsExelGetLoading = true;
        });
        builder.addCase(wordsExelGetThunk.fulfilled, (state, { payload }) => {
            state.wordsExelGetLoading = false;
            state.wordsExelGetResponse = payload;
        });
        builder.addCase(wordsExelGetThunk.rejected, (state, { payload }) => {
            state.wordsExelGetLoading = false;
            state.wordsExelGetError = payload;
        });
    },
});

export const { GetWordsGetResponse } = wordsExelGetSlice.actions;


export const wordsExelGetLoading = (state) => {
    return state.wordsExelGetSlice.wordsExelGetLoading;
};

export const wordsExelGetResponse = (state) => {
    return state.wordsExelGetSlice.wordsExelGetResponse;
};

export const wordsExelGetError = (state) => {
    return state.wordsExelGetSlice.wordsExelGetError;
};
