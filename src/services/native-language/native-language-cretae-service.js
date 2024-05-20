import { api } from "..";

export const nativeLanguageCreateService = (formData) => {
  return api.post("api/admin/language/native", formData);
};
