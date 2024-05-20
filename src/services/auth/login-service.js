import { api } from "..";

export const sendLoginInfo = (data) => {
  return api.post("api/admin/auth/login", {
    email: data.email,
    password: data.password,
  });
};
