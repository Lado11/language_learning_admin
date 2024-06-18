import { api } from "..";

export const userCreateService = (data) => {
  return api.post("api/admin/user", data);
};
