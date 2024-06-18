import { api } from "..";

export const categoryGetService = (data) => {
  return api.get(`api/admin/words/category?skip=${data.skip}&limit=${data.limit}`);
};
