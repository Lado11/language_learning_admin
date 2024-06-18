import { api } from "..";

export const categoryDeleteService = (id) => {
  return api.delete(`api/admin/words/category?id=${id}`);
};
