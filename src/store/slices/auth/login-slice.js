import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendLoginInfo } from "../../../services/auth/login-service";

const initialState = {
  loading: false,
  loginResponse: null,
  loginErrors: null,
};

export const loginThunk = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendLoginInfo(data);
      localStorage.setItem("token", response.data.data.authToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    deleteReduxToken: (state) => {
      state.loginResponse.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.loginResponse = payload;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.loading = false;
      state.loginErrors = payload;
    });
  },
});

export const { deleteReduxToken } = loginSlice.actions;

export const getLoginLoading = (state) => {
  return state.loginSlice.loading;
};
export const getLoginData = (state) => {
  return state.loginSlice.loginResponse;
};
export const getLoginError = (state) => {
  return state.loginSlice.loginErrors;
};
