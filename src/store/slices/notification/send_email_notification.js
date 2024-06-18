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
      state. sendEmailNotificationloading = true;
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

export const { deletesendPushNotificationResponse ,deletesendPushNotificationBool } = sendEmailNotificationSlice.actions;

export const getsendPushNotificationLoading = (state) => {
  return state.sendEmailNotificationSlice.sendEmailNotificationloading;
};
export const getsendPushNotificationBool = (state) => {
  return state.sendEmailNotificationSlice.sendEmailNotificationBool;
};
export const getsendPushNotificationData = (state) => {
  return state.sendEmailNotificationSlice.sendEmailNotificationResponse;
};
export const getsendPushNotificationError = (state) => {
  return state.sendEmailNotificationSlice.sendEmailNotificationErrors;
};
