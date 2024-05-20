import { api } from "..";

export const nativeLanguageDeleteService = (id) => {
  return api.delete(`api/admin/language/native?id=${id}`);
};
