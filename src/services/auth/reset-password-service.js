import { api } from "..";

export const resetPassword = (data) => {
  return api.post("api/admin/auth/login", {
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
};
