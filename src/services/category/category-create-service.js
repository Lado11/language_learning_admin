import { api } from "..";

export const categoryCreateService = (formData) => {
  return api.post("api/admin/words/category", formData);
};
