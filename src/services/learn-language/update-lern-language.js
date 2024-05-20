import { api } from "..";

export const lernLanguageUpdateService = (formData) => {
  return api.put("api/admin/language/learn", formData);
};
