import { api } from "..";

export const categoryUpdateService = (formData) => {
  return api.put("api/admin/words/category", formData);
};
