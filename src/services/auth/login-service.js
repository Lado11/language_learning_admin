import { api } from "..";

export const sendLoginInfo = (data) => {
  console.log(data,"login data")
  return api.post("api/admin/auth/login", {
    email: data.username,
    password: data.password,
  });
};
