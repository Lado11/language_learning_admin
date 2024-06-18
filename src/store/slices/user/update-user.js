import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userUpdateService } from "../../../services/user/update-user";

const initialState = {
    userUpdateloading: false,
    userUpdateBool: false,
    userUpdateResponse: null,
    userUpdateErrors: null,
    userMessage:null
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
        deleteUserUpdateResponse: (state) => {
            state.userUpdateResponse = null;
        },
        deleteUserUpdateBool: (state) => {
            state.userUpdateBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userUpdateThunk.pending, (state) => {
            state.userUpdateloading = true;
        });
        builder.addCase(userUpdateThunk.fulfilled, (state, { payload }) => {
            state.userUpdateloading = false;
            state.userUpdateResponse = payload;
            state.userUpdateBool = true;
            state.userMessage = payload?.message;
        });
        builder.addCase(userUpdateThunk.rejected, (state, { payload }) => {
            state.userUpdateloading = false;
            state.userUpdateErrors = payload;
        });
    },
});


export const { userUpdateBool ,deleteUserUpdateResponse} = userUpdateSlice.actions;


export const getUserUpdateLoading = (state) => {
    return state.userUpdateSliceStore.userUpdateloading;
};
export const getUserUpdateMessages = (state) => {
    return state.userUpdateSliceStore.userMessage;
};
export const getUserUpdateBool = (state) => {
    return state.userUpdateSliceStore.userUpdateBool;
};
export const getUserUpdateData = (state) => {
    return state.userUpdateSliceStore.userUpdateResponse;
};
export const getUserUpdateError = (state) => {
    return state.userUpdateSliceStore.userUpdateErrors;
};
