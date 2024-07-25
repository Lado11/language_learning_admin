import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendEmailNotificationService } from "../../../services/notification";

const initialState = {
    sendEmailNotificationloading: false,
    sendEmailNotificationBool: false,
    sendEmailNotificationResponse: null,
    sendEmailNotificationErrors: null,
};

export const sendEmailNotification = createAsyncThunk(
  "sendEmailNotification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendEmailNotificationService(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmailNotificationSlice = createSlice({
  name: "sendEmailNotificationSlice",
  initialState,
  reducers: {
    deletesendEmailNotificationResponse: (state) => {
      state.sendEmailNotificationResponse = "";
    },
    deletesendEmailNotificationBool: (state) => {
      state.sendEmailNotificationBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase( sendEmailNotification.pending, (state) => {
      state.sendEmailNotificationloading = true;
    });
    builder.addCase(
        sendEmailNotification.fulfilled,
      (state, { payload }) => {
        state.sendEmailNotificationloading = false;
        state.sendEmailNotificationResponse = payload;
        state.sendEmailNotificationBool = true;
      }
    );
    builder.addCase(
        sendEmailNotification.rejected,
      (state, { payload }) => {
        state.sendEmailNotificationloading = false;
        state.sendEmailNotificationErrors = payload;
      }
    );
  },
});

export const { deletesendEmailNotificationResponse ,deletesendEmailNotificationBool } = sendEmailNotificationSlice.actions;

export const getsendEmailNotificationLoading = (state) => {
  return state.sendEmailNotification.sendEmailNotificationloading;
};
export const getsendEmailNotificationBool = (state) => {
  return state.sendEmailNotification.sendEmailNotificationBool;
};
export const getsendEmailNotificationData = (state) => {
  return state.sendEmailNotification.sendEmailNotificationResponse;
};
export const getsendEmailNotificationError = (state) => {
  return state.sendEmailNotification.sendEmailNotificationErrors;
};
