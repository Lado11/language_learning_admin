import { api } from "..";

export const nativeLanguageUpdateService = (formData) => {
  return api.put("api/admin/language/native", formData);
};
