import { api } from "..";

export const userDeleteService = (id) => {
  return api.delete(`api/admin/user?id=${id}`);
};
