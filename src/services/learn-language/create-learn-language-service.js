import { api } from "..";

export const learnLanguageCreateService = (formData) => {
  return api.post("api/admin/language/learn", formData);
};
