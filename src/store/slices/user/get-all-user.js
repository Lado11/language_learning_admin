import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userGetAllService } from "../../../services/user/get-all-user";

const initialState = {
    userGetAllloading: false,
    userGetAllBool: false,
    userGetAllResponse: null,
    userGetAllErrors: null,
};

export const userGetAllThunk = createAsyncThunk(
    "userGetAll",
    async (data, { rejectWithValue }) => {
        try {
            const response = await userGetAllService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userGetAllSlice = createSlice({
    name: "userGetAll",
    initialState,
    reducers: {
        deleteUserGetAllBool: (state) => {
            state.userGetAllBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userGetAllThunk.pending, (state) => {
            state.userGetAllloading = true;
        });
        builder.addCase(userGetAllThunk.fulfilled, (state, { payload }) => {
            state.userGetAllloading = false;
            state.userGetAllResponse = payload;
            state.userGetAllBool = true;
        });
        builder.addCase(userGetAllThunk.rejected, (state, { payload }) => {
            state.userGetAllloading = false;
            state.userGetAllErrors = payload;
        });
    },
});


export const { deleteUserGetAllBool } = userGetAllSlice.actions;


export const getUserGetAllLoading = (state) => {
    return state.userGetAllSlice.userGetAllloading;
};
export const getUserGetAllBool = (state) => {
    return state.userGetAllSlice.userGetAllBool;
};
export const getUserGetAllData = (state) => {
    return state.userGetAllSlice.userGetAllResponse;
};
export const getUserGetAllError = (state) => {
    return state.userGetAllSlice.userGetAllErrors;
};
