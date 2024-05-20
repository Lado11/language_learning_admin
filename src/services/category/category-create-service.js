import { api } from "..";

export const categoryCreateService = (formData) => {
  return api.put("api/admin/words/category", formData);
};
