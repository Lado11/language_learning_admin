import { api } from "..";

export const resetPassword = (data) => {
  return api.post("api/admin/auth/recovery", {
    email: data.email,
    password: data.password,
    code:"112233"
  });
};
