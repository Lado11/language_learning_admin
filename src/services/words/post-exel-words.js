import { api } from "..";

export const exelWordCreateService = (formData) => {
  return api.post("api/admin/words/xlsx", formData);
};
