import { api } from "..";

export const userUpdateService = (data) => {
  return api.put("api/admin/user", data);
};
