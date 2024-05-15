import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userGetIdService } from "../../../services/user/get-user-byId";

const initialState = {
    userGetByIdloading: false,
    userGetByIdBool: false,
    userGetByIdResponse: null,
    userGetByIdErrors: null,
};

export const userGetByIdThunk = createAsyncThunk(
    "userGetById",
    async (data, { rejectWithValue }) => {
        try {
            const response = await userGetIdService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userGetByIdSlice = createSlice({
    name: "userGetById",
    initialState,
    reducers: {
        deleteUserGetByIdBool: (state) => {
            state.userGetByIdBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userGetByIdThunk.pending, (state) => {
            state.userGetByIdloading = true;
        });
        builder.addCase(userGetByIdThunk.fulfilled, (state, { payload }) => {
            state.userGetByIdloading = false;
            state.userGetByIdResponse = payload;
            state.userGetByIdBool = true;
        });
        builder.addCase(userGetByIdThunk.rejected, (state, { payload }) => {
            state.userGetByIdloading = false;
            state.userGetByIdErrors = payload;
        });
    },
});


export const { deleteUserGetByIdBool } = userGetByIdSlice.actions;


export const getUserGetByIdLoading = (state) => {
    return state.userGetByIdSlice.userGetByIdloading;
};
export const getUserGetByIdBool = (state) => {
    return state.userGetByIdSlice.userGetByIdBool;
};
export const getUserGetByIdData = (state) => {
    return state.userGetByIdSlice.userGetByIdResponse;
};
export const getUserGetByIdError = (state) => {
    return state.userGetByIdSlice.userGetByIdErrors;
};
