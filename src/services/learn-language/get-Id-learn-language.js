import { api } from "..";

export const learnLanguageGetIdService = (data) => {
  return api.put(`api/admin/language/learn/${data}`);
};
