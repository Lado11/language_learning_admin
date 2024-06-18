import { api } from "..";

export const learnLanguageDeleteService = (id) => {
  return api.delete(`api/admin/language/learn?id=${id}`);
};
