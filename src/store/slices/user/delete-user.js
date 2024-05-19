import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userDeleteService } from "../../../services/user/delete-user";

const initialState = {
    userDeleteloading: false,
    userDeleteBool: false,
    userDeleteResponse: null,
    userDeleteErrors: null,
};

export const userDeleteThunk = createAsyncThunk(
    "userDelete",
    async (data, { rejectWithValue }) => {
        try {
            const response = await userDeleteService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState,
    reducers: {
        deleteUserDeleteBool: (state) => {
            state.userDeleteBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userDeleteThunk.pending, (state) => {
            state.userDeleteloading = true;
        });
        builder.addCase(userDeleteThunk.fulfilled, (state, { payload }) => {
            state.userDeleteloading = false;
            state.userDeleteResponse = payload;
            state.userDeleteBool = true;
        });
        builder.addCase(userDeleteThunk.rejected, (state, { payload }) => {
            state.userDeleteloading = false;
            state.userDeleteErrors = payload;
        });
    },
});


export const { deleteUserDeleteBool } = userDeleteSlice.actions;


export const getUserDeleteLoading = (state) => {
    return state.userDeleteSlice.userDeleteloading;
};
export const getUserDeleteBool = (state) => {
    return state.userDeleteSlice.userDeleteBool;
};
export const getUserDeleteData = (state) => {
    return state.userDeleteSlice.userDeleteResponse;
};
export const getUserDeleteError = (state) => {
    return state.userDeleteSlice.userDeleteErrors;
};
