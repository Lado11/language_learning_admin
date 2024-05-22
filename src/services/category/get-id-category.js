
import { api } from "..";

export const categoryGetIdService = (id) => {
  return api.get(`api/admin/words/category/${id}`);
};
