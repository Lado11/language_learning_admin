import { api } from "..";

export const sendPushNotificationService = (data) => {
  return api.post("api/admin/notifications/push", data);
};

export const sendEmailNotificationService = (data) => {
    return api.post("api/admin/notifications/email", data);
  };
  
