import { api } from "..";

export const userGetIdService = (data) => {
  return api.get(`api/admin/user/${data}`);
};
