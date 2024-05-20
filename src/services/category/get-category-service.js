import { api } from "..";

export const categoryGetService = (formData) => {
  return api.put("api/admin/words/category", formData);
};
