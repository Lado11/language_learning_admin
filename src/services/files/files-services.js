import { api } from "..";

export const filesGetIdService = (id) => {
  return api.get(`api/admin/files/${id}`);
};
