import { api } from "..";

export const lernLanguageDeleteService = (formData) => {
  return api.put("api/admin/language/learn", formData);
};
