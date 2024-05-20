import { api } from "..";

export const lernLanguageGetIdService = (data) => {
  return api.put(`api/admin/language/learn/${data}`);
};
