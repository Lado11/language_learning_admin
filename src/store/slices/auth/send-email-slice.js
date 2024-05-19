import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendEmail } from '../../../services/auth/send-email-service';

const initialState = {
    loading: false,
    sendEmailResponse: null,
    sendEmailErrors: null,
};

export const sendEmailThunk = createAsyncThunk(
    'sendEmail',
    async (data, { rejectWithValue }) => {
        try {
            const response = await sendEmail(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendEmailSlice = createSlice({
    name: 'sendEmail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendEmailThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendEmailThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.sendEmailResponse = payload;
        });
        builder.addCase(sendEmailThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.sendEmailErrors = payload;
        })
    }
})
