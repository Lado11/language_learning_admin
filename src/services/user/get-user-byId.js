import { api } from "..";

export const userGetIdService = (data) => {
  return api.put(`api/admin/user/${data}`);
};
