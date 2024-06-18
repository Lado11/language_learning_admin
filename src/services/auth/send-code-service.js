import { api } from "..";

export const sendCode = (data) => {
  return api.post("api/admin/auth/recovery/check", {
    email: data?.email,
    code: data?.value,
  });
};
