import { api } from "..";

export const learnLanguageUpdateService = (formData) => {
  return api.put("api/admin/language/learn", formData);
};
