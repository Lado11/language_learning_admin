import { api } from "..";

export const categoryDeleteService = (formData) => {
  return api.put("api/admin/words/category", formData);
};
