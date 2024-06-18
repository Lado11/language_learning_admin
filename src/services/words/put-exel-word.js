import { api } from "..";

export const exelWordUpdateService = (formData) => {
  return api.put("api/admin/words/xlsx", formData);
};