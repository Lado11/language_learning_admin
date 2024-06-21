import { api } from "..";

export const userGetAllService = (data) => {
  return api.get(`api/admin/user?limit=${data.limit}&skip=${data.skip}&search=${data.search}`);
};
