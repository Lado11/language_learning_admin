import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendPushNotificationService } from "../../../services/notification";

const initialState = {
    sendPushNotificationloading: false,
    sendPushNotificationBool: false,
    sendPushNotificationResponse: null,
    sendPushNotificationErrors: null,
};

export const sendPushNotification = createAsyncThunk(
  "sendPushNotification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendPushNotificationService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendPushNotificationSlice = createSlice({
  name: "sendPushNotificationSlice",
  initialState,
  reducers: {
    deletesendPushNotificationResponse: (state) => {
      state.sendPushNotificationResponse = "";
    },
    deletesendPushNotificationBool: (state) => {
      state.sendPushNotificationBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendPushNotification.pending, (state) => {
      state.sendPushNotificationloading = true;
    });
    builder.addCase(
        sendPushNotification.fulfilled,
      (state, { payload }) => {
        state.sendPushNotificationloading = false;
        state.sendPushNotificationResponse = payload;
        state.sendPushNotificationBool = true;
      }
    );
    builder.addCase(
        sendPushNotification.rejected,
      (state, { payload }) => {
        state.sendPushNotificationloading = false;
        state.sendPushNotificationErrors = payload;
      }
    );
  },
});

export const { deletesendPushNotificationResponse ,deletesendPushNotificationBool } = sendPushNotificationSlice.actions;

export const getsendPushNotificationLoading = (state) => {
  return state.sendPushNotificationSlice.sendPushNotificationloading;
};
export const getsendPushNotificationBool = (state) => {
  return state.sendPushNotificationSlice.sendPushNotificationBool;
};
export const getsendPushNotificationData = (state) => {
  return state.sendPushNotificationSlice.sendPushNotificationResponse;
};
export const getsendPushNotificationError = (state) => {
  return state.sendPushNotificationSlice.sendPushNotificationErrors;
};
