import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendLoginInfo } from "../../../services/auth/login-service";

const initialState = {
  loginLoading: false,
  loginResponse: null,
  loginErrors: null,
  loginMessage: "",
  token: "",
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
      state.token = "";
    },
    deleteErrorMessage: (state) => {
      state.loginErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, { payload }) => {
      state.loginLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loginLoading = false;
      state.loginResponse = payload;
      state.loginMessage = payload.data.message;
      state.token = payload.data.authToken;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.loginLoading = false;
      state.loginErrors = payload;
    });
  },
});

export const { deleteReduxToken, deleteErrorMessage } = loginSlice.actions;

export const getLoginLoading = (state) => {
  return state.loginSlice.loginLoading;
};
export const getLoginData = (state) => {
  return state.loginSlice.loginResponse;
};
export const getLoginError = (state) => {
  return state.loginSlice.loginErrors;
};

export const getLoginMessage = (state) => {
  return state.loginSlice.loginMessage;
};

export const getToken = (state) => {
  return state.loginSlice.token;
};
