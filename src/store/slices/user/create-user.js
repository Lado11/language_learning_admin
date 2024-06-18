import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userCreateService } from "../../../services/user/create-user";

const initialState = {
    userCreateloading: false,
    userCreateBool: false,
    userCreateResponse: null,
    userCreateErrors: null,
};

export const userCreateThunk = createAsyncThunk(
    "userCreate",
    async (data, { rejectWithValue }) => {
        try {
            const response = await userCreateService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userCreateSlice = createSlice({
    name: "userCreate",
    initialState,
    reducers: {
        deleteUserCreateResponse: (state) => {
            state.userCreateResponse = "";
          },
        deleteUserCreateBool: (state) => {
            state.userCreateBool = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userCreateThunk.pending, (state) => {
            state.userCreateloading = true;
        });
        builder.addCase(userCreateThunk.fulfilled, (state, { payload }) => {
            state.userCreateloading = false;
            state.userCreateResponse = payload;
            state.userCreateBool = true;
        });
        builder.addCase(userCreateThunk.rejected, (state, { payload }) => {
            state.userCreateloading = false;
            state.userCreateErrors = payload;
        });
    },
});


export const { deleteUserCreateBool,deleteUserCreateResponse } = userCreateSlice.actions;


export const getUserCreateLoading = (state) => {
    return state.userCreateSlice.userCreateloading;
};
export const getUserCreateBool = (state) => {
    return state.userCreateSlice.userCreateBool;
};
export const getUserCreateData = (state) => {
    return state.userCreateSlice.userCreateResponse;
};
export const getUserCreateError = (state) => {
    return state.userCreateSlice.userCreateErrors;
};
