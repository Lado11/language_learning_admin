import { api } from "..";

export const learnLanguageGetIdService = (id) => {
  return api.get(`api/admin/language/learn/${id}`);
};
