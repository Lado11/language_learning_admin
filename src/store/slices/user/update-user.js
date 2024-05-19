import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userUpdateService } from "../../../services/user/update-user";

const initialState = {
    userUpdateloading: false,
    userUpdateBool: false,
    userUpdateResponse: null,
    userUpdateErrors: null,
};

export const userUpdateThunk = createAsyncThunk(
    "userUpdate",
    async (data, { rejectWithValue }) => {
        try {
            const response = await userUpdateService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState,
    reducers: {
        deleteUserUpdateBool: (state) => {
            state.userUpdateBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userUpdateThunk.pending, (state) => {
            state.userDeleteloading = true;
        });
        builder.addCase(userUpdateThunk.fulfilled, (state, { payload }) => {
            state.userDeleteloading = false;
            state.userDeleteResponse = payload;
            state.userDeleteBool = true;
        });
        builder.addCase(userUpdateThunk.rejected, (state, { payload }) => {
            state.userDeleteloading = false;
            state.userDeleteErrors = payload;
        });
    },
});


export const { updateUserDeleteBool } = userUpdateSlice.actions;


export const getUserUpdateLoading = (state) => {
    return state.userUpdateSlice.userUpdateloading;
};
export const getUserUpdateBool = (state) => {
    return state.userUpdateSlice.userUpdateBool;
};
export const getUserUpdateData = (state) => {
    return state.userUpdateSlice.userUpdateResponse;
};
export const getUserUpdateError = (state) => {
    return state.userUpdateSlice.userUpdateErrors;
};
