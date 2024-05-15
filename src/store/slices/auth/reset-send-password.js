import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassword } from '../../../services/auth/reset-password-service';

const initialState = {
    loading: false,
    resetPasswordResponse: null,
    resetPasswordErrors: null,
};

export const resetPasswordThunk = createAsyncThunk(
    'resetPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await resetPassword(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(resetPasswordThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.resetPasswordResponse = payload;
        });
        builder.addCase(resetPasswordThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.resetPasswordErrors = payload;
        })
    }
})
